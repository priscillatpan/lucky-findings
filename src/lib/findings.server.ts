import type { QuestCategory } from "@/data/quests";

export const BUCKET = "findings";

export function ownerId() {
  const id = process.env.OWNER_USER_ID;
  if (!id) throw new Error("OWNER_USER_ID is not set");
  return id;
}

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

export async function signPhoto(
  admin: Awaited<ReturnType<typeof getAdmin>>,
  path: string,
): Promise<string> {
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60);
  if (error || !data) return "";
  return data.signedUrl;
}

export async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}
