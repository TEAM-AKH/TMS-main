import { config } from 'dotenv';
config();

import '@/ai/flows/auto-generate-meeting-summary.ts';
import '@/ai/flows/extract-action-items-from-meeting.ts';
import '@/ai/flows/suggest-task-priorities.ts';