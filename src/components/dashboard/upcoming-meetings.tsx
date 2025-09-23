import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { upcomingMeetings } from "@/lib/data";

export default function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingMeetings.map((meeting, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{meeting.title}</p>
              <p className="text-sm text-muted-foreground">{meeting.time}</p>
            </div>
            <div className="flex -space-x-2">
              {meeting.avatars.map((src, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-card">
                  <AvatarImage src={src} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
