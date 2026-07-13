"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { cities } from "@/constants/cities";

interface Review {
  region: string;
  street_lightening: number;
  public_toilets: number;
  menstrual_products: number;
  safe_transport: number;
  childcare_access: number;
}

interface CityData {
  name: string;
  score: number;
  reviews: number;
  weakest: string;
}

export default function CityGrid({ activeFilter }: { activeFilter: string }) {
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("Reviews").select("*");

      if (!data) return;

      const grouped: Record<string, Review[]> = {};

      data.forEach((review: Review) => {
        if (!grouped[review.region]) grouped[review.region] = [];
        grouped[review.region].push(review);
      });

      const result = cities.map((city) => {
        const reviews = grouped[city.name] || [];

        if (reviews.length === 0) {
          return {
            name: city.name,
            score: 0,
            reviews: 0,
            weakest: "No Data",
          };
        }

        const average = (key: keyof Review) =>
          reviews.reduce((sum, r) => sum + Number(r[key]), 0) / reviews.length;

        const metrics = [
          {
            name: "Lighting",
            value: average("street_lightening"),
          },
          {
            name: "Toilets",
            value: average("public_toilets"),
          },
          {
            name: "Transport",
            value: average("safe_transport"),
          },
          {
            name: "Sanitary",
            value: average("menstrual_products"),
          },
          {
            name: "Childcare",
            value: average("childcare_access"),
          },
        ];

        const weakest = metrics.reduce((a, b) =>
          a.value < b.value ? a : b,
        ).name;

        let score = 0;

        switch (activeFilter) {
          case "Lighting":
            score = average("street_lightening");
            break;

          case "Toilets":
            score = average("public_toilets");
            break;

          case "Transport":
            score = average("safe_transport");
            break;

          case "Sanitary":
            score = average("menstrual_products");
            break;

          case "Childcare":
            score = average("childcare_access");
            break;

          default:
            score =
              metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
        }

        return {
          name: city.name,
          score,
          reviews: reviews.length,
          weakest,
        };
      });

      setCityData(result);
    }

    fetchData();
  }, [activeFilter]);

  const sortedCities = useMemo(
    () => [...cityData].sort((a, b) => b.score - a.score),
    [cityData],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {sortedCities.map((city) => (
        <div
          key={city.name}
          className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-[#2D2D2D]">{city.name}</h3>

            <p className="text-sm text-gray-500">
              {city.reviews} community reviews
            </p>

            <p className="text-xs text-orange-500 mt-1">
              ⚠️ Weakest:
              <span className="font-semibold ml-1">{city.weakest}</span>
            </p>
          </div>

          <div
            className={`px-3 py-1 rounded-lg text-white font-bold ${
              city.score >= 4
                ? "bg-green-500"
                : city.score >= 3
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            {city.score.toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
}
