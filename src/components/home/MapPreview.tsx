"use client";

import dynamic from "next/dynamic";

const MapUI = dynamic(
  () => import("@/components/map/MapUI"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-violet-50">
        Loading Map...
      </div>
    ),
  }
);

export default function MapPreview() {
  return (
    <div className="h-full w-full">
      <MapUI
        center={[28.6139, 77.209]}
        activeFilter="Overall"
      />
    </div>
  );
}