"use client";

import { cities } from '@/constants/cities';

export default function CityGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {cities.map((city) => (
        <div key={city.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800">{city.name}</h3>
           <p className="text-sm text-gray-500">Bengaluru • {city.id * 7 + 20} reviews</p>
            <p className="text-xs text-orange-500 mt-1 flex items-center">
              ⚠️ Weakest: <span className="font-semibold ml-1">Childcare Access</span>
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg text-white font-bold ${city.score >= 3.5 ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {city.score}
          </div>
        </div>
      ))}
    </div>
  );
}