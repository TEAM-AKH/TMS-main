"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { projectProgress } from "@/lib/data";

export default function ProjectProgressChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <BarChart data={projectProgress} layout="vertical">
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="project"
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent))", opacity: 0.5 }}
            contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar
            dataKey="progress"
            fill="hsl(var(--primary))"
            radius={[4, 4, 4, 4]}
            background={{ fill: "hsl(var(--muted))", radius: 4 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
