"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "@/constants/cities";
import { supabase } from "@/lib/supabase";

interface Review {
  region: string;
  street_lightening: number;
  public_toilets: number;
  menstrual_products: number;
  safe_transport: number;
  childcare_access: number;
  comment: string;
  created_at: string;
}

export default function RegionCards({
  center,
  activeFilter,
}: {
  center: [number, number];
  activeFilter: string;
}) {
  const activeCity =
    cities.find(
      (city) => city.coords[0] === center[0] && city.coords[1] === center[1],
    ) || cities[0];

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("Reviews")
        .select("*")
        .eq("region", activeCity.name)
        .order("created_at", { ascending: false });

      setReviews(data || []);
    }

    fetchReviews();
  }, [activeCity]);

  function average(key: keyof Review) {
    if (reviews.length === 0) return 0;

    return reviews.reduce((sum, r) => sum + Number(r[key]), 0) / reviews.length;
  }

  const values = {
    Overall: (
      (average("street_lightening") +
        average("public_toilets") +
        average("safe_transport") +
        average("menstrual_products") +
        average("childcare_access")) /
      5
    ).toFixed(1),

    Lighting: average("street_lightening").toFixed(1),

    Toilets: average("public_toilets").toFixed(1),

    Transport: average("safe_transport").toFixed(1),

    Sanitary: average("menstrual_products").toFixed(1),

    Childcare: average("childcare_access").toFixed(1),
  };

  const score = values[activeFilter as keyof typeof values] ?? values.Overall;

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D2D]">
            {activeCity.name}
          </h2>

          <p className="text-gray-500 mt-1">{activeFilter} Overview</p>
        </div>

        <div className="text-right">
          <span className="text-4xl font-bold text-violet-700">{score}</span>

          <span className="block text-gray-500 text-sm">/5</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="rounded-xl bg-violet-50 p-4">
          <p className="text-sm text-gray-500">Reviews</p>

          <p className="text-2xl font-bold text-violet-700">{reviews.length}</p>
        </div>

        <div className="rounded-xl bg-pink-50 p-4">
          <p className="text-sm text-gray-500">Selected Metric</p>

          <p className="text-lg font-semibold text-[#2D2D2D]">{activeFilter}</p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <p className="text-sm text-gray-500">Latest Review</p>

          <p className="text-sm text-[#2D2D2D] line-clamp-2">
            {reviews[0]?.comment || "No reviews yet."}
          </p>
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
          className="rounded-xl border border-pink-500 px-5 py-2 text-pink-600 font-medium hover:bg-pink-50 transition"
        >
          Write Review
        </Link>
      </div>
    </div>
  );
}
