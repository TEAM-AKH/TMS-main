
import { teams } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = teams.find((t) => t.id === params.id);

  if (!team) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
        <p className="text-muted-foreground mt-1">{team.description}</p>
      </div>

       <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Progress</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-bold">{team.progress}%</span>
                </div>
                <Progress value={team.progress} />
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {team.members.map((member) => (
            <div key={member.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Team Analytics</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Team analytics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
