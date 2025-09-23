
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = Array.from({ length: 90 }, (_, i) => ({
    name: `Day ${i + 1}`,
    performance: 70 + Math.sin(i / 10) * 10 + Math.random() * 10,
    tasksCompleted: 2 + Math.floor(Math.random() * 4)
}));

export default function KpiTrendChart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="hsl(var(--chart-1))"
            dot={false}
            name="Overall Performance"
          />
           <Line
            type="monotone"
            dataKey="tasksCompleted"
            stroke="hsl(var(--chart-2))"
            dot={false}
            name="Tasks Completed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
