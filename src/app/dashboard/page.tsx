"use client";

import { useSearchParams } from "next/navigation";

import reviews from "@/data/reviews.json";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import StatsCards from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  const params = useSearchParams();

  const region = params.get("region") || "Connaught Place";

  const regionReviews = reviews.filter((review) => review.region === region);

  function average(key: string) {
    const nums = regionReviews

      .map((r: any) => r[key])

      .filter((x) => x != null);

    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }

  const lighting = average("streetLighting");

  const toilets = average("publicToilets");

  const menstrual = average("menstrualProducts");

  const transport = average("safeTransport");

  const childcare = average("childcareAccess");

  const overall = (lighting + toilets + menstrual + transport + childcare) / 5;

  const features = [
    {
      name: "Street Lighting",

      value: lighting,
    },

    {
      name: "Public Toilets",

      value: toilets,
    },

    {
      name: "Menstrual Products",

      value: menstrual,
    },

    {
      name: "Safe Transport",

      value: transport,
    },

    {
      name: "Childcare",

      value: childcare,
    },
  ];

  const strongest = features.reduce((a, b) => (a.value > b.value ? a : b)).name;

  const weakest = features.reduce((a, b) => (a.value < b.value ? a : b)).name;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <DashboardHeader region={region} score={overall} />

      {/* <StatsCards
        // // overall={overall}
        // reviews={regionReviews.length}
        // strongest={strongest}
        // weakest={weakest}
      /> */}
    </div>
  );
}
