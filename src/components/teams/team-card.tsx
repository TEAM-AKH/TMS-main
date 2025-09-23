
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Team } from "@/lib/data";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/team/${team.id}`}>
      <Card className="h-full flex flex-col hover:border-primary transition-colors">
        <CardHeader>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription className="line-clamp-2">{team.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">{team.progress}%</span>
            </div>
            <Progress value={team.progress} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex -space-x-2">
            {team.members.map((member, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-card">
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
