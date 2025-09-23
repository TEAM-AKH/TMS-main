
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/projects/project-card";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            An overview of all your active projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle />
            <span>Create Project</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
