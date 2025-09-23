
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { tasks, upcomingMeetings } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { AlertCircle, CalendarCheck, Lightbulb } from 'lucide-react';

export default function ConflictPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const selectedDate = date || new Date();

  const eventsForDay = [
    ...upcomingMeetings.map((m) => ({ ...m, type: 'meeting' })),
    ...tasks
      .filter((t) => t.dueDate)
      .map((t) => ({
        title: t.title,
        time: `Due ${format(new Date(t.dueDate), 'PPP')}`,
        type: 'task',
        dueDate: new Date(t.dueDate),
      })),
  ].filter(
    (e) =>
      (e.type === 'meeting' && isSameDay(selectedDate, new Date())) || // dummy logic for meetings
      (e.type === 'task' && isSameDay(selectedDate, e.dueDate))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Conflict Management
        </h1>
        <p className="text-muted-foreground">
          Manage your calendar, analyze conflicts, and get smart
          recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule for {format(selectedDate, 'PPP')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eventsForDay.length > 0 ? (
                eventsForDay.map((event, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        event.type === 'meeting'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                    />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No events for this day.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" /> Detected
                Conflicts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No conflicts detected for the selected day.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" /> AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recommendations available at the moment.
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarCheck/>Auto-Avoid Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="deep-work">Block Deep Work Windows</Label>
                    <Switch id="deep-work" />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="no-meetings">No Meetings on Fridays</Label>
                    <Switch id="no-meetings" />
                </div>
                 <Button>Add New Rule</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
