"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { cities } from "@/constants/cities";

// Fix for default Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function getMarkerIcon(score: number) {
  let color = "#22c55e"; // green

  if (score < 4) color = "#eab308"; // yellow
  if (score < 3) color = "#ef4444"; // red

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:18px;
        height:18px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 0 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

// This component handles the map movement when the center prop changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
}

export default function MapUI({
  center,
  activeFilter,
  onMarkerClick,
}: {
  center: [number, number];
  activeFilter: string;
  onMarkerClick: (coords: [number, number]) => void;
}) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* This triggers the map movement */}
        <MapController center={center} />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={city.coords}
            icon={getMarkerIcon(city.score)}
            eventHandlers={{
              click: () => {
                onMarkerClick(city.coords);
              },
            }}
          >
            <Popup>
              <div className="font-semibold">{city.name}</div>
              <p>Score: {city.score}</p>
              <p>{activeFilter}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
