
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { teams } from "@/lib/data";
import TeamCard from "@/components/teams/team-card";

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            An overview of all your teams.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle />
            <span>Create Team</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
