import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarPlus, Bot } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import { stats } from "@/lib/data";
import TasksByStatusChart from "@/components/dashboard/tasks-by-status-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectProgressChart from "@/components/dashboard/project-progress-chart";
import UpcomingMeetings from "@/components/dashboard/upcoming-meetings";
import HighPriorityTasks from "@/components/dashboard/high-priority-tasks";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, Jane!
          </h1>
          <p className="text-muted-foreground">Here's your workspace overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle />
            <span>Create Task</span>
          </Button>
          <Button variant="outline">
            <CalendarPlus />
            <span>Schedule Meeting</span>
          </Button>
          <Button variant="outline">
            <Bot />
            <span>Start MOM</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TasksByStatusChart />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectProgressChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <UpcomingMeetings />
        <HighPriorityTasks />
      </div>
    </div>
  );
}
