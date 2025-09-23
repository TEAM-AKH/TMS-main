
import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, GanttChartSquare, LineChart, Users } from "lucide-react";
import TaskTable from "@/components/tasks/task-table";
import { tasks } from "@/lib/data";


export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const projectTasks = tasks.filter(task => task.project === project.title);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <Badge variant="secondary">{project.role}</Badge>
        </div>
        <p className="text-muted-foreground mt-1">{project.brief}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Owner</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={project.owner.avatar} />
                        <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{project.owner.name}</span>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-card">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-bold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList className="mb-4">
          <TabsTrigger value="timeline"><GanttChartSquare className="mr-2"/>Timeline</TabsTrigger>
          <TabsTrigger value="tasks"><Users className="mr-2"/>Tasks</TabsTrigger>
          <TabsTrigger value="files"><File className="mr-2"/>Files</TabsTrigger>
          <TabsTrigger value="analytics"><LineChart className="mr-2"/>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
            <Card>
                <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Timeline/Gantt chart will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="tasks">
            <TaskTable tasks={projectTasks} />
        </TabsContent>
        <TabsContent value="files">
            <Card>
                <CardHeader>
                    <CardTitle>Files</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Project files will be listed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="analytics">
            <Card>
                <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Project analytics and metrics will be shown here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
