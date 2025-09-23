
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LayoutGrid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskTable from '@/components/tasks/task-table';
import KanbanBoard from '@/components/tasks/kanban-board';
import { tasks } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { projects, assignees, priorities, tags } from '@/lib/task-filters';

export default function TasksPage() {
  const [view, setView] = React.useState("kanban");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks here.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle />
            <span>Create Task</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterDropdown label="Project" items={projects} />
          <FilterDropdown label="Assignee" items={assignees} />
          <FilterDropdown label="Priority" items={priorities} />
          <FilterDropdown label="Tag" items={tags} />
        </div>
        <Tabs value={view} onValueChange={setView} className="w-auto">
          <TabsList>
            <TabsTrigger value="kanban"><LayoutGrid className="mr-2" />Kanban</TabsTrigger>
            <TabsTrigger value="table"><List className="mr-2" />Table</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={view} onValueChange={setView} defaultValue="kanban">
        <TabsContent value="kanban" className="mt-0">
          <KanbanBoard tasks={tasks} />
        </TabsContent>
        <TabsContent value="table" className="mt-0">
          <TaskTable tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FilterDropdown({ label, items }: { label: string, items: string[] }) {
  const [selectedItems, setSelectedItems] = React.useState<Record<string, boolean>>({});

  const handleCheckedChange = (item: string, checked: boolean) => {
    setSelectedItems(prev => ({ ...prev, [item]: checked }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`Filter by ${label}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map(item => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={selectedItems[item] || false}
            onCheckedChange={(checked) => handleCheckedChange(item, !!checked)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
