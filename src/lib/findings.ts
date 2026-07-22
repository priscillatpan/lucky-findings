import { isoDate, type QuestCategory } from "@/data/quests";
import {
  listFindingsFn,
  getFindingForDateFn,
  saveFindingFn,
} from "./findings.functions";

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

export async function listFindings(): Promise<FindingWithUrl[]> {
  return (await listFindingsFn()) as FindingWithUrl[];
}

export async function getFindingForDate(date: Date): Promise<FindingWithUrl | null> {
  return (await getFindingForDateFn({ data: { date: isoDate(date) } })) as FindingWithUrl | null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function saveFinding(input: {
  file: File;
  questId: string;
  questTitle: string;
  questCategory: QuestCategory;
  caption?: string;
}): Promise<FindingWithUrl> {
  const photoBase64 = await fileToBase64(input.file);
  const ext = input.file.name.split(".").pop()?.toLowerCase() || "jpg";
  return (await saveFindingFn({
    data: {
      questId: input.questId,
      questTitle: input.questTitle,
      questCategory: input.questCategory,
      caption: input.caption ?? null,
      photoBase64,
      contentType: input.file.type || "image/jpeg",
      ext,
    },
  })) as FindingWithUrl;
}
