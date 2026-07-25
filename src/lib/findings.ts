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

export type FindingWithUrl = FindingRow & { photo_url: string; thumb_url?: string };

export async function listFindings(): Promise<FindingWithUrl[]> {
  return (await listFindingsFn()) as FindingWithUrl[];
}

export async function getFindingForDate(date: Date): Promise<FindingWithUrl | null> {
  return (await getFindingForDateFn({ data: { date: isoDate(date) } })) as FindingWithUrl | null;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function compressImage(
  file: File,
  maxDim = 1600,
  quality = 0.85,
): Promise<{ blob: Blob; ext: string; type: string }> {
  if (!file.type.startsWith("image/") || typeof createImageBitmap === "undefined") {
    return {
      blob: file,
      ext: file.name.split(".").pop()?.toLowerCase() || "jpg",
      type: file.type || "image/jpeg",
    };
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no ctx");
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        "image/jpeg",
        quality,
      ),
    );
    return { blob, ext: "jpg", type: "image/jpeg" };
  } catch {
    return {
      blob: file,
      ext: file.name.split(".").pop()?.toLowerCase() || "jpg",
      type: file.type || "image/jpeg",
    };
  }
}

export async function saveFinding(input: {
  file: File;
  questId: string;
  questTitle: string;
  questCategory: QuestCategory;
  caption?: string;
}): Promise<FindingWithUrl> {
  const { blob, ext, type } = await compressImage(input.file);
  const photoBase64 = await blobToBase64(blob);
  return (await saveFindingFn({
    data: {
      questId: input.questId,
      questTitle: input.questTitle,
      questCategory: input.questCategory,
      caption: input.caption ?? null,
      photoBase64,
      contentType: type,
      ext,
    },
  })) as FindingWithUrl;
}
