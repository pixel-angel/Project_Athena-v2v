"use client";
import Link from "next/link";
import { cities } from '@/constants/cities';

export default function RegionCards({ center }: { center: [number, number] }) {
  // Logic: Agar exact match nahi mila, toh hum default mein "Connaught Place" dikha denge
  const activeCity = cities.find(city => city.coords[0] === center[0] && city.coords[1] === center[1]) || cities[0];

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{activeCity.name}</h2>
          <p className="text-gray-500 mt-1">Region Safety Overview</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-purple-600">
            {activeCity.score}
          </span>
          <span className="text-gray-400 text-sm block">/ 5.0 Score</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Traffic</p>
          <p className="font-semibold text-gray-700">Moderate</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Lighting</p>
          <p className="font-semibold text-gray-700">Good</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Alerts</p>
          <p className="font-semibold text-gray-700">None</p>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <Link
          href={`/dashboard?region=${encodeURIComponent(activeCity.name)}`}
          className="rounded-xl bg-violet-700 px-5 py-2 text-white font-medium hover:bg-violet-800 transition"
        >
          View Dashboard
        </Link>

        <Link
          href={`/review?region=${encodeURIComponent(activeCity.name)}`}
          className="rounded-xl border border-pink-600 px-5 py-2 text-pink-600 font-medium hover:bg-pink-50 transition"
        >
          Write Review
        </Link>
      </div>
    </div>
  );
}