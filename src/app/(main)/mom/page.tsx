
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';
import {
  autoGenerateMeetingSummary,
  type AutoGenerateMeetingSummaryOutput,
} from '@/ai/flows/auto-generate-meeting-summary';

export default function MomPage() {
  const [transcript, setTranscript] = React.useState('');
  const [summary, setSummary] =
    React.useState<AutoGenerateMeetingSummaryOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateSummary = async () => {
    if (!transcript) return;
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await autoGenerateMeetingSummary({ transcript });
      setSummary(result);
    } catch (error) {
      console.error('Error generating summary:', error);
      // You could add some user-facing error handling here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Minutes of Meeting</h1>
        <p className="text-muted-foreground">
          Generate structured meeting summaries from transcripts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Transcript</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your meeting transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[300px]"
            />
            <Button onClick={handleGenerateSummary} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bot className="mr-2" />
              )}
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {summary ? (
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Summary:</strong> {summary.summary}
                </p>
                <div>
                  <strong>Main Points:</strong>
                  <ul className="list-disc pl-5">
                    {summary.mainPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Decisions:</strong>
                  <ul className="list-disc pl-5">
                    {summary.decisions.map((decision, i) => (
                      <li key={i}>{decision}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Action Items:</strong>
                  <ul className="list-disc pl-5">
                    {summary.actionItems.map((item, i) => (
                      <li key={i}>
                        <strong>{item.assignee}:</strong> {item.item} (Due:
                        {item.dueDate})
                      </li>
                    ))}
                  </ul>
                </div>
                 <div>
                    <strong>Date:</strong> {summary.date}
                    <br />
                    <strong>Time:</strong> {summary.time}
                    <br />
                    <strong>Platform:</strong> {summary.platform}
                    <br />
                    <strong>Organizer:</strong> {summary.organizer}
                </div>
                 <div>
                  <strong>Attendees:</strong>
                  <ul className="list-disc pl-5">
                    {summary.attendees.map((attendee, i) => (
                      <li key={i}>{attendee}</li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">
                  Your summary will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
