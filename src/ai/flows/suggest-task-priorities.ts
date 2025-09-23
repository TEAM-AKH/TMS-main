// src/ai/flows/suggest-task-priorities.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting task priorities and due dates based on project timelines and employee availability.
 *
 * - suggestTaskPriorities - A function that suggests task priorities and due dates.
 * - SuggestTaskPrioritiesInput - The input type for the suggestTaskPriorities function.
 * - SuggestTaskPrioritiesOutput - The output type for the suggestTaskPriorities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskPrioritiesInputSchema = z.object({
  taskDescription: z.string().describe('A description of the task.'),
  projectTimeline: z.string().describe('The timeline of the project.'),
  employeeAvailability: z.string().describe('The availability of the employee.'),
  pastTaskAssignments: z.string().describe('Past task assignments and timelines.'),
});
export type SuggestTaskPrioritiesInput = z.infer<typeof SuggestTaskPrioritiesInputSchema>;

const SuggestTaskPrioritiesOutputSchema = z.object({
  priority: z.string().describe('The suggested priority of the task (High, Medium, Low).'),
  dueDate: z.string().describe('The suggested due date for the task (YYYY-MM-DD).'),
  reasoning: z.string().describe('The reasoning behind the suggested priority and due date.'),
});
export type SuggestTaskPrioritiesOutput = z.infer<typeof SuggestTaskPrioritiesOutputSchema>;

export async function suggestTaskPriorities(input: SuggestTaskPrioritiesInput): Promise<SuggestTaskPrioritiesOutput> {
  return suggestTaskPrioritiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPrioritiesPrompt',
  input: {schema: SuggestTaskPrioritiesInputSchema},
  output: {schema: SuggestTaskPrioritiesOutputSchema},
  prompt: `You are an AI assistant helping project managers to prioritize tasks.
  Given the following information, suggest a priority (High, Medium, or Low) and a due date (YYYY-MM-DD) for the task.
  Also, provide a brief reasoning for your suggestion.

  Task Description: {{{taskDescription}}}
  Project Timeline: {{{projectTimeline}}}
  Employee Availability: {{{employeeAvailability}}}
  Past Task Assignments: {{{pastTaskAssignments}}}

  Respond with the priority, due date, and reasoning in a structured format.
`,
});

const suggestTaskPrioritiesFlow = ai.defineFlow(
  {
    name: 'suggestTaskPrioritiesFlow',
    inputSchema: SuggestTaskPrioritiesInputSchema,
    outputSchema: SuggestTaskPrioritiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
