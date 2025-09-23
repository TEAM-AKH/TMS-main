
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { tasks } from '@/lib/data';
import { GripVertical, Plus, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8; // 8 AM to 7 PM
  return `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
});

export default function PlannerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Design Your Day</h1>
        <p className="text-muted-foreground">
          Plan your schedule with drag-and-drop ease and AI suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <div key={time} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-muted-foreground">
                      {time}
                    </span>
                    <div className="h-16 flex-1 rounded-md border-2 border-dashed border-muted-foreground/20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Unscheduled Tasks
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="flex cursor-grab items-center gap-3 rounded-lg border bg-card p-3 shadow-sm"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline">{task.project}</Badge>
                      <Badge variant="secondary">{task.priority}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Planner Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="working-hours">Sync with Calendar</Label>
                <Switch id="working-hours" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Working Hours</Label>
                <div className="flex items-center gap-2">
                  <TimeSelect defaultValue="09:00" />
                  <span>to</span>
                  <TimeSelect defaultValue="17:00" />
                </div>
              </div>
              <Button className="w-full">Propose Schedule</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TimeSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map(
          (time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
