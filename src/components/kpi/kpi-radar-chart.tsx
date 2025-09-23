
'use client';

import {
  PolarGrid,
  PolarAngleAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { subject: 'Technical', A: 120, B: 110, fullMark: 150 },
  { subject: 'Communication', A: 98, B: 130, fullMark: 150 },
  { subject: 'Teamwork', A: 86, B: 130, fullMark: 150 },
  { subject: 'Leadership', A: 99, B: 100, fullMark: 150 },
  { subject: 'Problem Solving', A: 85, B: 90, fullMark: 150 },
  { subject: 'Proactivity', A: 110, B: 85, fullMark: 150 },
];

export default function KpiRadarChart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Jane Doe"
            dataKey="A"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.6}
          />
           <Tooltip
            cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
