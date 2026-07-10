"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    feature: string;
    rating: number;
  }[];
}

export default function AccessibilityRadar({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Accessibility Overview</h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />

            <PolarAngleAxis dataKey="feature" />

            <PolarRadiusAxis domain={[0, 5]} />

            <Radar
              dataKey="rating"
              stroke="#7C3AED"
              fill="#A78BFA"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
