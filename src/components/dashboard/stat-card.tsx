import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};

export default function StatCard({ name, value, change, changeType }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground",
            changeType === "positive" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
          )}
        >
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
