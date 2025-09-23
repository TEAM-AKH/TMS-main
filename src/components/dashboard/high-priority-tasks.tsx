import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { highPriorityTasks } from "@/lib/data";

export default function HighPriorityTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>High Priority Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {highPriorityTasks.map((task, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium leading-tight">{task.title}</p>
              <p className="text-sm text-muted-foreground">{task.project}</p>
            </div>
            <Badge variant="destructive" className="whitespace-nowrap">{task.priority}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
