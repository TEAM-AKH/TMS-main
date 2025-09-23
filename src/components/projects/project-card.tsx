
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Circle } from "lucide-react";
import { type Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

const roleVariantMap = {
  Accountable: "default",
  Responsible: "secondary",
  Consulted: "outline",
  Informed: "outline",
} as const;

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full flex flex-col hover:border-primary transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{project.title}</CardTitle>
            <Badge variant={roleVariantMap[project.role]}>{project.role}</Badge>
          </div>
          <CardDescription className="line-clamp-2">{project.brief}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-bold">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Key Milestones</h4>
              <div className="space-y-2">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {milestone.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">{milestone.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.owner.avatar} />
              <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {project.owner.name}
            </span>
          </div>
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-card">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
