"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/componenets/component/map/SearchBar';
import RegionCards from '@/componenets/component/map/RegionCards';
import StatisticsCards from '@/componenets/component/dashboard/StatisticsCards';
import FilterTabs from '@/componenets/component/dashboard/FilterTabs';
import CityGrid from '@/componenets/component/map/CityGrid';

const MapUI = dynamic(() => import('@/componenets/component/map/MapUI'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] rounded-3xl bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div>
});

export default function MapPage() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]);

  return (
    <div className="min-h-screen p-8 bg-[#FFF9FB]">
      <div className="max-w-6xl mx-auto">
        {/* Header - Brand Name HerMap */}
        <div className="flex items-center mb-10">
           <h1 className="text-4xl font-bold text-[#7E22CE] tracking-tight">HerMap</h1>
        </div>
        
        <StatisticsCards />
        
        <main className="w-full">
          <FilterTabs onFilterChange={(f) => console.log("Filter selected:", f)} />
          <SearchBar onSearch={setMapCenter} />
          
          <div className="my-8 rounded-3xl overflow-hidden shadow-xl border border-white">
            <MapUI center={mapCenter} />
          </div>
          
          <RegionCards center={mapCenter} />
          <CityGrid />
        </main>
      </div>
    </div>
  );
}