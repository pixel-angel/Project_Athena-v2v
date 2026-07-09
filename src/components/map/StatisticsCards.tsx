"use client";

import { cities } from '@/constants/cities';

export default function StatisticsCards() {
  const totalRegions = cities.length;
  const avgScore = (cities.reduce((acc, curr) => acc + curr.score, 0) / totalRegions).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm font-medium">Regions Mapped</p>
        <h3 className="text-4xl font-bold text-gray-800 mt-2">{totalRegions}</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm font-medium">Average Safety Score</p>
        <h3 className="text-4xl font-bold text-purple-600 mt-2">{avgScore}</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm font-medium">Safety Factors</p>
        <h3 className="text-4xl font-bold text-gray-800 mt-2">5</h3>
      </div>
    </div>
  );
}