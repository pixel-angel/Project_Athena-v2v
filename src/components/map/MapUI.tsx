"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { cities } from "@/constants/cities";

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);

  return null;
}

interface MapUIProps {
  center: [number, number];
  activeFilter?: string;
  onMarkerClick?: (coords: [number, number]) => void;
}

export default function MapUI({
  center,
  activeFilter = "Overall",
  onMarkerClick,
}: MapUIProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={city.coords as [number, number]}
            eventHandlers={{
              click: () => {
                onMarkerClick?.(city.coords as [number, number]);
              },
            }}
          >
            <Popup>
              <div className="font-semibold">{city.name}</div>
              <p>Score: {city.score}</p>
              <p>Filter: {activeFilter}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}