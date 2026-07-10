"use client";
import { useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCard";
import AccessibilityRadar from "@/components/dashboard/AccessibilityRadar";
import ReviewList from "@/components/dashboard/ReviewList";
import { PencilLine, Bot } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const params = useSearchParams();

  const region = params.get("region") || "Connaught Place";

const [regionReviews, setRegionReviews] = useState<any[]>([]);

useEffect(() => {
  async function loadReviews() {
    const { data, error } = await supabase
      .from("Reviews")
      .select("*")
      .eq("region", region)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRegionReviews(data || []);
  }

  loadReviews();
}, [region]);
  function average(key: string) {
  const nums = regionReviews
    .map((r: any) => r[key])
    .filter((x: any) => x != null);

  if (nums.length === 0) return 0;

  return nums.reduce((a: number, b: number) => a + b, 0) / nums.length;
}

  const lighting = average("street_lightening");
  const toilets = average("public_toilets");
  const menstrual = average("menstrual_products");
  const transport = average("safe_transport");
  const childcare = average("childcare_access");
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

  const chartData = [
    {
      feature: "Lighting",
      rating: lighting,
    },
    {
      feature: "Toilets",
      rating: toilets,
    },
    {
      feature: "Transport",
      rating: transport,
    },
    {
      feature: "Menstrual",
      rating: menstrual,
    },
    {
      feature: "Childcare",
      rating: childcare,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-6">
        <DashboardHeader region={region} score={overall} />

        <StatsCards
          // overall={overall}
          reviews={regionReviews.length}
          strongest={strongest}
          weakest={weakest}
        />

        <AccessibilityRadar data={chartData} />

        <ReviewList reviews={regionReviews} />
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          <Link
            href={`/assistant?region=${encodeURIComponent(region)}`}
            className="group fixed right-8 bottom-28 z-50 flex h-14 w-14 items-center rounded-full bg-violet-700 text-white shadow-xl transition-all duration-300 hover:w-44 hover:bg-violet-800"
          >
            <Bot size={22} className="ml-4 shrink-0" />

            <span className="ml-3 opacity-0 whitespace-nowrap transition-all duration-300 group-hover:opacity-100">
              Ask HerBot
            </span>
          </Link>

          <Link
            href={`/review?region=${encodeURIComponent(region)}`}
            className="group fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center rounded-full bg-pink-600 text-white shadow-xl transition-all duration-300 hover:w-44 hover:bg-pink-700"
          >
            <PencilLine size={22} className="ml-4 shrink-0" />

            <span className="ml-3 opacity-0 whitespace-nowrap transition-all duration-300 group-hover:opacity-100">
              Write Review
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
