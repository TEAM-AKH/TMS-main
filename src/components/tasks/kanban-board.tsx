
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { type Task } from '@/lib/data';
import TaskCard from './task-card';

interface KanbanBoardProps {
  tasks: Task[];
}

const columns = ['To Do', 'In Progress', 'Done', 'Blocked'];

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const tasksByStatus = columns.map(status => ({
    title: status,
    tasks: tasks.filter(task => task.status === status),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tasksByStatus.map(column => (
        <Card key={column.title} className="bg-muted/40">
          <CardHeader>
            <CardTitle>{column.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {column.tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
