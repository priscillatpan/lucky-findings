import { createServerFn } from "@tanstack/react-start";

function isoToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export const listFindingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { ownerId, getAdmin, signPhoto } = await import("./findings.server");
  const admin = await getAdmin();
  const { data, error } = await admin
    .from("findings")
    .select("*")
    .eq("user_id", ownerId())
    .order("completed_on", { ascending: false });
  if (error) throw error;
  const rows = data ?? [];
  return Promise.all(
    rows.map(async (r) => ({ ...r, photo_url: await signPhoto(admin, r.photo_path) })),
  );
});

export const getFindingForDateFn = createServerFn({ method: "GET" })
  .inputValidator((data: { date: string }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data?.date ?? "")) throw new Error("Bad date");
    return { date: data.date };
  })
  .handler(async ({ data }) => {
    const { ownerId, getAdmin, signPhoto } = await import("./findings.server");
    const admin = await getAdmin();
    const { data: row, error } = await admin
      .from("findings")
      .select("*")
      .eq("user_id", ownerId())
      .eq("completed_on", data.date)
      .maybeSingle();
    if (error) throw error;
    if (!row) return null;
    return { ...row, photo_url: await signPhoto(admin, row.photo_path) };
  });

export const saveFindingFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      questId: string;
      questTitle: string;
      questCategory: string;
      caption?: string | null;
      photoBase64: string;
      contentType: string;
      ext: string;
    }) => {
      if (!data?.questId || !data?.questTitle || !data?.questCategory) throw new Error("Missing quest");
      if (!data?.photoBase64) throw new Error("Missing photo");
      if (data.photoBase64.length > 12_000_000) throw new Error("Photo too large");
      return data;
    },
  )
  .handler(async ({ data }) => {
    const { ownerId, getAdmin, BUCKET, signPhoto } = await import("./findings.server");
    const admin = await getAdmin();

    const today = isoToday();
    const safeExt = (data.ext || "jpg").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
    const path = `${ownerId()}/${today}-${Date.now()}.${safeExt}`;
    const bytes = Buffer.from(data.photoBase64, "base64");

    const { error: upErr } = await admin.storage
      .from(BUCKET)
      .upload(path, bytes, {
        cacheControl: "3600",
        upsert: false,
        contentType: data.contentType || "image/jpeg",
      });
    if (upErr) throw upErr;

    const { data: row, error } = await admin
      .from("findings")
      .upsert(
        {
          user_id: ownerId(),
          quest_id: data.questId,
          quest_title: data.questTitle,
          quest_category: data.questCategory,
          photo_path: path,
          caption: data.caption ?? null,
          completed_on: today,
        },
        { onConflict: "user_id,completed_on" },
      )
      .select("*")
      .single();
    if (error) throw error;
    return { ...row, photo_url: await signPhoto(admin, row.photo_path) };
  });
