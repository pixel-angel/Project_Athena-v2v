"use client";

import MapUI from "@/components/map/MapUI";

export default function MapPreview() {
  return (
    <div className="h-full w-full">
      <MapUI center={[28.6139, 77.209]} />
    </div>
  );
}
