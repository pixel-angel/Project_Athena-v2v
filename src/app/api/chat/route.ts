import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lowerMessage = (message || "").toLowerCase();

    // Greeting
    if (/\b(hi|hello|hey)\b/.test(lowerMessage)) {
      return NextResponse.json({
        response:
          "Hello! I'm HerMap's assistant. Ask me about the safety, lighting, toilets, transport or childcare facilities of any region.",
      });
    }

    // Fetch reviews from Supabase
    const { data: reviews, error } = await supabase.from("reviews").select("*");

    if (error) throw error;

    if (!reviews || reviews.length === 0) {
      return NextResponse.json({
        response: "No reviews have been submitted yet.",
      });
    }

    // ---------- GROUP BY REGION ----------
    const grouped: Record<string, any[]> = {};

    for (const review of reviews) {
      if (!grouped[review.region]) grouped[review.region] = [];
      grouped[review.region].push(review);
    }

    function getStats(region: string) {
      const regionReviews = grouped[region];
      if (!regionReviews) return null;

      const avg = (key: string) =>
        regionReviews.reduce((sum, r) => sum + Number(r[key]), 0) /
        regionReviews.length;

      const lighting = avg("street_lightening");
      const toilets = avg("public_toilets");
      const sanitary = avg("menstrual_products");
      const transport = avg("safe_transport");
      const childcare = avg("childcare_access");

      const overall = (
        (lighting + toilets + sanitary + transport + childcare) /
        5
      ).toFixed(1);

      return {
        region,
        lighting: lighting.toFixed(1),
        toilets: toilets.toFixed(1),
        sanitary: sanitary.toFixed(1),
        transport: transport.toFixed(1),
        childcare: childcare.toFixed(1),
        overall,
        reviews: regionReviews.length,
        latestComment:
          regionReviews[regionReviews.length - 1].comment ??
          "No comments available.",
      };
    }

    // ---------- SAFEST REGION ----------
    if (
      lowerMessage.includes("safest") ||
      lowerMessage.includes("best") ||
      lowerMessage.includes("highest")
    ) {
      let best: any = null;

      for (const region of Object.keys(grouped)) {
        const stats = getStats(region);

        if (!best || Number(stats!.overall) > Number(best.overall)) {
          best = stats;
        }
      }

      return NextResponse.json({
        response: `The safest region currently is ${best.region} with an average score of ${best.overall}/5 based on ${best.reviews} reviews.`,
      });
    }

    // ---------- FIND REGION ----------
    let foundRegion: any = null;

    for (const region of Object.keys(grouped)) {
      if (lowerMessage.includes(region.toLowerCase())) {
        foundRegion = getStats(region);
        break;
      }
    }

    if (!foundRegion) {
      return NextResponse.json({
        response:
          "I couldn't find reviews for that region yet. Please try another location.",
      });
    }

    // ---------- LIGHTING ----------
    if (
      lowerMessage.includes("light") ||
      lowerMessage.includes("lighting") ||
      lowerMessage.includes("night")
    ) {
      return NextResponse.json({
        response: `Street lighting in ${foundRegion.region} is rated ${foundRegion.lighting}/5.`,
      });
    }

    // ---------- TOILETS ----------
    if (
      lowerMessage.includes("toilet") ||
      lowerMessage.includes("washroom") ||
      lowerMessage.includes("restroom")
    ) {
      return NextResponse.json({
        response: `Public toilet availability in ${foundRegion.region} is rated ${foundRegion.toilets}/5.`,
      });
    }

    // ---------- TRANSPORT ----------
    if (
      lowerMessage.includes("transport") ||
      lowerMessage.includes("metro") ||
      lowerMessage.includes("bus") ||
      lowerMessage.includes("cab")
    ) {
      return NextResponse.json({
        response: `Safe transport in ${foundRegion.region} is rated ${foundRegion.transport}/5.`,
      });
    }

    // ---------- SANITARY ----------
    if (
      lowerMessage.includes("sanitary") ||
      lowerMessage.includes("menstrual") ||
      lowerMessage.includes("hygiene")
    ) {
      return NextResponse.json({
        response: `Menstrual product availability in ${foundRegion.region} is rated ${foundRegion.sanitary}/5.`,
      });
    }

    // ---------- CHILDCARE ----------
    if (
      lowerMessage.includes("childcare") ||
      lowerMessage.includes("kid") ||
      lowerMessage.includes("baby")
    ) {
      return NextResponse.json({
        response: `Childcare access in ${foundRegion.region} is rated ${foundRegion.childcare}/5.`,
      });
    }

    // ---------- OVERALL ----------
    if (
      lowerMessage.includes("score") ||
      lowerMessage.includes("rating") ||
      lowerMessage.includes("safe")
    ) {
      return NextResponse.json({
        response: `${foundRegion.region} has an overall safety score of ${foundRegion.overall}/5 based on ${foundRegion.reviews} community reviews.`,
      });
    }

    // ---------- DEFAULT ----------
    return NextResponse.json({
      response: `${foundRegion.region}

⭐ Overall Score: ${foundRegion.overall}/5

💡 Street Lighting: ${foundRegion.lighting}/5
🚻 Public Toilets: ${foundRegion.toilets}/5
🩸 Menstrual Products: ${foundRegion.sanitary}/5
🚌 Safe Transport: ${foundRegion.transport}/5
👶 Childcare Access: ${foundRegion.childcare}/5

📝 Latest Review:
"${foundRegion.latestComment}"`,
    });
  } catch (err: any) {
    console.error("API ERROR:", err);

    return NextResponse.json({
      response: err.message ?? JSON.stringify(err),
    });
  }
}
