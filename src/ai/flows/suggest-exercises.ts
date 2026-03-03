'use server';
/**
 * @fileOverview A Genkit flow for suggesting personalized exercises to students based on their academic performance.
 *
 * - suggestExercises - A function that handles the exercise suggestion process.
 * - SuggestExercisesInput - The input type for the suggestExercises function.
 * - SuggestExercisesOutput - The return type for the suggestExercises function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestExercisesInputSchema = z.object({
  studentId: z.string().describe('The unique identifier of the student.'),
  grades: z.array(
    z.object({
      courseName: z.string().describe('The name of the course.'),
      topic: z.string().describe('The specific topic within the course.'),
      score: z
        .number()
        .min(0)
        .max(100)
        .describe('The score received in the topic (0-100).'),
      maxScore: z
        .number()
        .min(0)
        .max(100)
        .describe('The maximum possible score for the topic.'),
    })
  ).describe('An array of the student\'s grades for various topics.'),
  learningGoals: z.string().optional().describe('Any specific learning goals or areas the student wants to focus on.'),
});
export type SuggestExercisesInput = z.infer<typeof SuggestExercisesInputSchema>;

const SuggestExercisesOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      subject: z.string().describe('The subject or course for the exercise.'),
      topic: z.string().describe('The specific topic for the exercise.'),
      exerciseTitle: z.string().describe('A title for the suggested exercise.'),
      description: z.string().describe('A brief description of the exercise.'),
      difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The suggested difficulty level.'),
      reasoning: z.string().describe('The AI\'s reasoning for suggesting this exercise based on the student\'s performance.'),
    })
  ).describe('An array of personalized exercise suggestions.'),
});
export type SuggestExercisesOutput = z.infer<typeof SuggestExercisesOutputSchema>;

export async function suggestExercises(input: SuggestExercisesInput): Promise<SuggestExercisesOutput> {
  return suggestExercisesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestExercisesPrompt',
  input: { schema: SuggestExercisesInputSchema },
  output: { schema: SuggestExercisesOutputSchema },
  prompt: `You are an AI tutor designed to provide personalized exercise suggestions to students.
Your goal is to analyze the student's academic performance data and suggest exercises that will help them improve in areas where they are weakest or to reinforce their strengths.

Here is the student's performance data:
Student ID: {{{studentId}}}

Academic Performance:
{{#each grades}}
- Course: {{{courseName}}}, Topic: {{{topic}}}, Score: {{{score}}}/{{{maxScore}}}
{{/each}}

{{#if learningGoals}}
Additional Learning Goals: {{{learningGoals}}}
{{/if}}

Based on this information, suggest 3-5 personalized exercises. For each exercise, provide the subject, topic, a title, a brief description, its difficulty level (Beginner, Intermediate, Advanced), and your reasoning for suggesting it.
Prioritize topics where the student has scored lower, but also consider strengthening foundational concepts or expanding on areas of interest if learning goals are provided. Focus on actionable exercises that can be practiced.`,
});

const suggestExercisesFlow = ai.defineFlow(
  {
    name: 'suggestExercisesFlow',
    inputSchema: SuggestExercisesInputSchema,
    outputSchema: SuggestExercisesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate exercise suggestions.');
    }
    return output;
  }
);
