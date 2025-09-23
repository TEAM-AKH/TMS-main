'use server';
/**
 * @fileOverview Extracts action items with assignee and due date from a meeting transcript.
 *
 * - extractActionItems - A function that extracts action items from meeting transcripts.
 * - ExtractActionItemsInput - The input type for the extractActionItems function.
 * - ExtractActionItemsOutput - The return type for the extractActionItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractActionItemsInputSchema = z.object({
  meetingTranscript: z
    .string()
    .describe('The transcript of the meeting to extract action items from.'),
});
export type ExtractActionItemsInput = z.infer<typeof ExtractActionItemsInputSchema>;

const ExtractActionItemsOutputSchema = z.array(z.object({
  actionItem: z.string().describe('The action item extracted from the transcript.'),
  assignee: z.string().describe('The person responsible for the action item.'),
  dueDate: z.string().describe('The date by which the action item should be completed.'),
})).describe('An array of action items extracted from the meeting transcript, including assignee and due date.');
export type ExtractActionItemsOutput = z.infer<typeof ExtractActionItemsOutputSchema>;

export async function extractActionItems(input: ExtractActionItemsInput): Promise<ExtractActionItemsOutput> {
  return extractActionItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractActionItemsPrompt',
  input: {schema: ExtractActionItemsInputSchema},
  output: {schema: ExtractActionItemsOutputSchema},
  prompt: `You are an AI assistant tasked with extracting action items from meeting transcripts.

  Given the following meeting transcript, identify all action items, the person responsible for each action item, and the date by which the action item should be completed.

  Meeting Transcript:
  {{meetingTranscript}}

  Present the output as a JSON array of objects, where each object has the following keys:
  - actionItem: The action item extracted from the transcript.
  - assignee: The person responsible for the action item.
  - dueDate: The date by which the action item should be completed.

  If no assignee or due date are present in the transcript, use 'TBD' as a placeholder.
  `,
});

const extractActionItemsFlow = ai.defineFlow(
  {
    name: 'extractActionItemsFlow',
    inputSchema: ExtractActionItemsInputSchema,
    outputSchema: ExtractActionItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
