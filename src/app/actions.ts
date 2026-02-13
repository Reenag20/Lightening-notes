
"use server";

import { autoSuggestNoteTags, type AutoSuggestNoteTagsInput } from "@/ai/flows/auto-suggest-note-tags-flow";

export async function getSuggestedTagsAction(noteContent: string) {
  if (!noteContent.trim()) {
    return { tags: [] };
  }
  try {
    const input: AutoSuggestNoteTagsInput = { noteContent };
    const result = await autoSuggestNoteTags(input);
    return result;
  } catch (error) {
    console.error("Error getting suggested tags:", error);
    // In a real app, you might want to return an error object
    return { tags: [], error: "Failed to get suggestions." };
  }
}
