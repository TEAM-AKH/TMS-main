"use client";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { tasksByStatus } from "@/lib/data";

export default function TasksByStatusChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Pie
            data={tasksByStatus}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            labelLine={false}
          >
            {tasksByStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend wrapperStyle={{fontSize: '0.875rem'}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
