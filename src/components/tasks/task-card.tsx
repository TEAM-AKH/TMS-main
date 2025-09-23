
'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Task } from '@/lib/data';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
}

const priorityBadgeVariant = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
} as const;

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
            <Badge variant={priorityBadgeVariant[task.priority]}>{task.priority}</Badge>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.brief}</p>
        <div className="flex gap-1 mt-3">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatar} />
            <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{task.dueDate}</span>
      </CardFooter>
    </Card>
  );
}
