
import StatCard from '@/components/dashboard/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KpiRadarChart from '@/components/kpi/kpi-radar-chart';
import KpiTrendChart from '@/components/kpi/kpi-trend-chart';

const kpiStats = [
  {
    name: 'Task Completion Rate',
    value: '92%',
    change: '+3.1%',
    changeType: 'positive',
  },
  {
    name: 'On-Time Delivery',
    value: '88%',
    change: '-1.5%',
    changeType: 'negative',
  },
  {
    name: 'Avg. Cycle Time',
    value: '3.2 days',
    change: '-0.2 days',
    changeType: 'positive',
  },
  {
    name: 'Peer Feedback Score',
    value: '4.7/5',
    change: '+0.1',
    changeType: 'positive',
  },
];

export default function KpiPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee KPI</h1>
        <p className="text-muted-foreground">
          Track your performance metrics here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiStats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <KpiRadarChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend (Last 90 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <KpiTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
