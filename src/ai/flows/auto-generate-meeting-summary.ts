'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically generating meeting summaries.
 *
 * The flow takes a meeting transcript as input and returns a structured summary with key discussion
 * points, action items, decisions, and speaker attributions.
 *
 * @interface AutoGenerateMeetingSummaryInput - Defines the input schema for the flow (meeting transcript).
 * @interface AutoGenerateMeetingSummaryOutput - Defines the output schema for the flow (structured meeting summary).
 * @function autoGenerateMeetingSummary - The main function to trigger the meeting summary generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoGenerateMeetingSummaryInputSchema = z.object({
  transcript: z
    .string()
    .describe('The full transcript of the meeting to be summarized.'),
  agenda: z.string().optional().describe('The agenda of the meeting.'),
  attendees: z.array(z.string()).optional().describe('List of attendees.'),
});
export type AutoGenerateMeetingSummaryInput = z.infer<
  typeof AutoGenerateMeetingSummaryInputSchema
>;

const AutoGenerateMeetingSummaryOutputSchema = z.object({
  date: z.string().describe('The date of the meeting.'),
  time: z.string().describe('The time of the meeting.'),
  platform: z.string().describe('The platform used for the meeting.'),
  organizer: z.string().describe('The organizer of the meeting.'),
  attendees: z.array(z.string()).describe('The attendees of the meeting.'),
  agenda: z.string().optional().describe('The agenda of the meeting.'),
  mainPoints: z.array(z.string()).describe('Key discussion points with timestamps.'),
  decisions: z.array(z.string()).describe('Decisions made during the meeting.'),
  actionItems: z
    .array(
      z.object({
        assignee: z.string(),
        dueDate: z.string(),
        item: z.string(),
      })
    )
    .describe('Action items with assignee and due date.'),
  speakerAttributions: z
    .array(z.object({speaker: z.string(), quote: z.string()}))
    .describe('Speaker attributions with short quotes.'),
  nextMeeting: z.string().optional().describe('Details for the next meeting, if any.'),
  documentLink: z.string().optional().describe('Link to the full meeting document.'),
  summary: z.string().describe('A concise summary of the meeting.'),
});
export type AutoGenerateMeetingSummaryOutput = z.infer<
  typeof AutoGenerateMeetingSummaryOutputSchema
>;

const meetingSummaryPrompt = ai.definePrompt({
  name: 'meetingSummaryPrompt',
  input: {schema: AutoGenerateMeetingSummaryInputSchema},
  output: {schema: AutoGenerateMeetingSummaryOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing meeting transcripts.

  Given the following meeting transcript, generate a structured summary that
  includes the key discussion points, decisions made, action items, and speaker
  attributions.

  Meeting Transcript:
  {{transcript}}

  {% if agenda %}Agenda: {{agenda}}{% endif %}
  {% if attendees %}Attendees: {{attendees}}{% endif %}

  Format the summary as follows:

  Date: [Date of meeting]
  Time: [Time of meeting]
  Platform: [Meeting platform used]
  Organizer: [Meeting organizer]
  Attendees: [List of meeting attendees]
  {% if agenda %}Agenda: [Meeting agenda]{% endif %}
  Main Points:
  - [Key discussion point 1 with timestamp]
  - [Key discussion point 2 with timestamp]
  Decisions:
  - [Decision 1]
  - [Decision 2]
  Action Items:
  - Assignee: [Assignee 1], Due Date: [Due Date 1], Item: [Action Item 1]
  - Assignee: [Assignee 2], Due Date: [Due Date 2], Item: [Action Item 2]
  Speaker Attributions:
  - Speaker: [Speaker 1], Quote: [Short quote from speaker 1]
  - Speaker: [Speaker 2], Quote: [Short quote from speaker 2]
  Next Meeting: [Details for the next meeting, if any]
  Document Link: [Link to the full meeting document]
  Summary: [Concise summary of the meeting]`,
});

/**
 * Flow for generating meeting summaries from transcripts.
 * @param input The input containing the meeting transcript.
 * @returns A promise resolving to the generated meeting summary.
 */
const autoGenerateMeetingSummaryFlow = ai.defineFlow(
  {
    name: 'autoGenerateMeetingSummaryFlow',
    inputSchema: AutoGenerateMeetingSummaryInputSchema,
    outputSchema: AutoGenerateMeetingSummaryOutputSchema,
  },
  async input => {
    const {output} = await meetingSummaryPrompt(input);
    return output!;
  }
);

/**
 * Generates a meeting summary from a provided transcript.
 * @param input The input data for generating the meeting summary.
 * @returns A promise resolving to the generated meeting summary.
 */
export async function autoGenerateMeetingSummary(
  input: AutoGenerateMeetingSummaryInput
): Promise<AutoGenerateMeetingSummaryOutput> {
  return autoGenerateMeetingSummaryFlow(input);
}
