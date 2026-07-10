"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/map/SearchBar";
import RegionCards from "@/components/map/RegionCards";
import StatisticsCards from "@/components/map/StatisticsCards";
import FilterTabs from "@/components/map/FilterTabs";
import CityGrid from "@/components/map/CityGrid";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer";

const MapUI = dynamic(() => import("@/components/map/MapUI"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-3xl bg-gray-100 animate-pulse flex items-center justify-center">
      Loading Map...
    </div>
  ),
});


export default function MapPage() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    28.6139, 77.209,
  ]);
  const [activeFilter, setActiveFilter] = useState("overall");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 bg-[#FFF9FB]">
        <div className="max-w-6xl mx-auto">
          <StatisticsCards />

          <main className="w-full">
            <FilterTabs onFilterChange={setActiveFilter} />
            <SearchBar onSearch={setMapCenter} />

            <div className="flex gap-6 mb-3 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500"></span>
                Excellent
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
                Moderate
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500"></span>
                Needs Improvement
              </div>
            </div>
            <div className="my-8 rounded-3xl overflow-hidden shadow-xl border border-white">
              <MapUI
                center={mapCenter}
                activeFilter={activeFilter}
                onMarkerClick={setMapCenter}
              />
            </div>

            <RegionCards center={mapCenter} activeFilter={activeFilter} />
            <CityGrid activeFilter={activeFilter} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
