"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cities } from "@/constants/cities";

// ---------------- Marker ----------------
function getMarkerIcon(score: number) {
  let color = "#22c55e";

  if (score < 4) color = "#eab308";
  if (score < 3) color = "#ef4444";

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width:18px;
          height:18px;
          border-radius:9999px;
          background:${color};
          border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,.35);
        "
      ></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

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
  const getScore = (city: any) => {
    switch (activeFilter) {
      case "Lighting":
        return city.lighting ?? city.score;

      case "Toilets":
        return city.toilets ?? city.score;

      case "Transport":
        return city.transport ?? city.score;

      case "Sanitary":
        return city.sanitary ?? city.score;

      case "Childcare":
        return city.childcare ?? city.score;

      default:
        return city.score;
    }
  };

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden">
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

        {cities.map((city) => {
          const score = getScore(city);

          return (
            <Marker
              key={city.id}
              position={city.coords as [number, number]}
              icon={getMarkerIcon(score)}
              eventHandlers={{
                click: () => onMarkerClick?.(city.coords as [number, number]),
              }}
            >
              <Popup>
                <h3 className="font-semibold">{city.name}</h3>

                <p>
                  <strong>{activeFilter}</strong>: {score}/5
                </p>

                <p>Overall: {city.score}/5</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
