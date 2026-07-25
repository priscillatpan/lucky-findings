import { createServerFn } from "@tanstack/react-start";

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
    rows.map(async (r) => ({
      ...r,
      photo_url: await signPhoto(admin, r.photo_path, { width: 800, height: 800, resize: "contain", quality: 75 }),
      thumb_url: await signPhoto(admin, r.photo_path, { width: 160, height: 160, resize: "cover", quality: 60 }),
    })),
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
    return { ...row, photo_url: await signPhoto(admin, row.photo_path, { width: 800, height: 800, resize: "contain", quality: 80 }) };
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
      completedOn: string;
    }) => {
      if (!data?.questId || !data?.questTitle || !data?.questCategory) throw new Error("Missing quest");
      if (!data?.photoBase64) throw new Error("Missing photo");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.completedOn ?? "")) throw new Error("Bad date");
      if (data.photoBase64.length > 12_000_000) throw new Error("Photo too large");
      return data;
    },
  )
  .handler(async ({ data }) => {
    const { ownerId, getAdmin, BUCKET, signPhoto } = await import("./findings.server");
    const admin = await getAdmin();

    const safeExt = (data.ext || "jpg").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
    const path = `${ownerId()}/${data.completedOn}-${Date.now()}.${safeExt}`;
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
          completed_on: data.completedOn,
        },
        { onConflict: "user_id,completed_on" },
      )
      .select("*")
      .single();
    if (error) throw error;
    return { ...row, photo_url: await signPhoto(admin, row.photo_path) };
  });

export const deleteFindingForDateFn = createServerFn({ method: "POST" })
  .inputValidator((data: { date: string }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data?.date ?? "")) throw new Error("Bad date");
    return { date: data.date };
  })
  .handler(async ({ data }) => {
    const { ownerId, getAdmin, BUCKET } = await import("./findings.server");
    const admin = await getAdmin();
    const { data: row, error } = await admin
      .from("findings")
      .select("id, photo_path")
      .eq("user_id", ownerId())
      .eq("completed_on", data.date)
      .maybeSingle();
    if (error) throw error;
    if (!row) return { ok: true };
    if (row.photo_path) {
      await admin.storage.from(BUCKET).remove([row.photo_path]);
    }
    const { error: delErr } = await admin.from("findings").delete().eq("id", row.id);
    if (delErr) throw delErr;
    return { ok: true };
  });
