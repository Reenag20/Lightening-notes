'use server';
/**
 * @fileOverview A Genkit flow for automatically suggesting tags for a note based on its content.
 *
 * - autoSuggestNoteTags - A function that suggests relevant tags for a given note content.
 * - AutoSuggestNoteTagsInput - The input type for the autoSuggestNoteTags function.
 * - AutoSuggestNoteTagsOutput - The return type for the autoSuggestNoteTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoSuggestNoteTagsInputSchema = z.object({
  noteContent: z
    .string()
    .describe('The full content of the note for which to suggest tags.'),
});
export type AutoSuggestNoteTagsInput = z.infer<
  typeof AutoSuggestNoteTagsInputSchema
>;

const AutoSuggestNoteTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags.'),
});
export type AutoSuggestNoteTagsOutput = z.infer<
  typeof AutoSuggestNoteTagsOutputSchema
>;

export async function autoSuggestNoteTags(
  input: AutoSuggestNoteTagsInput
): Promise<AutoSuggestNoteTagsOutput> {
  return autoSuggestNoteTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoSuggestNoteTagsPrompt',
  input: {schema: AutoSuggestNoteTagsInputSchema},
  output: {schema: AutoSuggestNoteTagsOutputSchema},
  prompt: `You are an AI assistant specialized in organizing notes. Your task is to analyze the provided note content and suggest a list of relevant, concise, and descriptive tags.

Rules:
- Tags should be short, preferably single words or short phrases.
- Focus on key topics, entities, or concepts mentioned in the note.
- Avoid generic tags like 'note', 'document', or 'information' unless specifically relevant.
- Provide a maximum of 5 tags.
- The output must be a JSON object with a single key 'tags' which is an array of strings.

Note Content:
---
{{{noteContent}}}
---

Suggested Tags:`,
});

const autoSuggestNoteTagsFlow = ai.defineFlow(
  {
    name: 'autoSuggestNoteTagsFlow',
    inputSchema: AutoSuggestNoteTagsInputSchema,
    outputSchema: AutoSuggestNoteTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
