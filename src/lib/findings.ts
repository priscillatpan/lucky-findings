import { supabase } from "@/integrations/supabase/client";
import { isoDate, type QuestCategory } from "@/data/quests";

export type FindingRow = {
  id: string;
  user_id: string;
  quest_id: string;
  quest_title: string;
  quest_category: QuestCategory;
  photo_path: string;
  caption: string | null;
  completed_on: string;
  created_at: string;
};

export type FindingWithUrl = FindingRow & { photo_url: string };

const BUCKET = "findings";

async function signPhoto(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60);
  if (error || !data) return "";
  return data.signedUrl;
}

export async function listFindings(): Promise<FindingWithUrl[]> {
  const { data, error } = await supabase
    .from("findings")
    .select("*")
    .order("completed_on", { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as FindingRow[];
  return Promise.all(
    rows.map(async (r) => ({ ...r, photo_url: await signPhoto(r.photo_path) })),
  );
}

export async function getFindingForDate(date: Date): Promise<FindingWithUrl | null> {
  const { data, error } = await supabase
    .from("findings")
    .select("*")
    .eq("completed_on", isoDate(date))
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = data as FindingRow;
  return { ...row, photo_url: await signPhoto(row.photo_path) };
}

export async function saveFinding(input: {
  file: File;
  questId: string;
  questTitle: string;
  questCategory: QuestCategory;
  caption?: string;
}): Promise<FindingWithUrl> {
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) throw new Error("Not signed in");

  const today = isoDate(new Date());
  const ext = input.file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${user.id}/${today}-${Date.now()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, input.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: input.file.type || "image/jpeg",
    });
  if (upErr) throw upErr;

  const { data, error } = await supabase
    .from("findings")
    .upsert(
      {
        user_id: user.id,
        quest_id: input.questId,
        quest_title: input.questTitle,
        quest_category: input.questCategory,
        photo_path: path,
        caption: input.caption ?? null,
        completed_on: today,
      },
      { onConflict: "user_id,completed_on" },
    )
    .select("*")
    .single();
  if (error) throw error;
  const row = data as FindingRow;
  return { ...row, photo_url: await signPhoto(row.photo_path) };
}
