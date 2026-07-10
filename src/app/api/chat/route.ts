import { NextResponse } from "next/server";
import localData from "../../../data/reviews.json";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lowerMessage = (message || "").toLowerCase();

    // Greetings
    if (/\b(hi|hello|hey)\b/.test(lowerMessage)) {
      return NextResponse.json({
        response:
          "Hello! I'm HerMap's assistant. Ask me about the safety, lighting, toilets, transport or childcare facilities of any region.",
      });
    }

    // ---------- GROUP REVIEWS ----------
    const grouped: Record<string, typeof localData> = {};

    for (const review of localData) {
      if (!grouped[review.region]) grouped[review.region] = [];
      grouped[review.region].push(review);
    }

    function getStats(region: string) {
      const reviews = grouped[region];
      if (!reviews) return null;

      const average = (key: keyof (typeof reviews)[0]) =>
        reviews.reduce((sum, r) => sum + Number(r[key]), 0) / reviews.length;

      const lighting = average("streetLighting");
      const toilets = average("publicToilets");
      const sanitary = average("menstrualProducts");
      const transport = average("safeTransport");
      const childcare = average("childcareAccess");

      const overall =
        (
          (lighting +
            toilets +
            sanitary +
            transport +
            childcare) /
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
        reviews: reviews.length,
        latestComment: reviews[reviews.length - 1].comment,
      };
    }

    // ---------- SAFEST REGION ----------
    if (
      lowerMessage.includes("safest") ||
      lowerMessage.includes("highest") ||
      lowerMessage.includes("best")
    ) {
      let best: any = null;

      for (const region of Object.keys(grouped)) {
        const stats = getStats(region);
        if (!best || Number(stats!.overall) > Number(best.overall)) {
          best = stats;
        }
      }

      return NextResponse.json({
        response: `The safest region currently is ${best.region} with an average safety score of ${best.overall}/5 based on ${best.reviews} community reviews.`,
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
          "I couldn't find reviews for that region yet. Try asking about Connaught Place or Karol Bagh.",
      });
    }

    // ---------- CATEGORY RESPONSES ----------

    if (
      lowerMessage.includes("light") ||
      lowerMessage.includes("lighting") ||
      lowerMessage.includes("night")
    ) {
      return NextResponse.json({
        response: `Street lighting in ${foundRegion.region} has an average rating of ${foundRegion.lighting}/5.`,
      });
    }

    if (
      lowerMessage.includes("toilet") ||
      lowerMessage.includes("washroom") ||
      lowerMessage.includes("restroom")
    ) {
      return NextResponse.json({
        response: `Public toilet availability in ${foundRegion.region} is rated ${foundRegion.toilets}/5.`,
      });
    }

    if (
      lowerMessage.includes("transport") ||
      lowerMessage.includes("bus") ||
      lowerMessage.includes("metro") ||
      lowerMessage.includes("cab")
    ) {
      return NextResponse.json({
        response: `Safe transport in ${foundRegion.region} has an average rating of ${foundRegion.transport}/5.`,
      });
    }

    if (
      lowerMessage.includes("sanitary") ||
      lowerMessage.includes("hygiene") ||
      lowerMessage.includes("menstrual")
    ) {
      return NextResponse.json({
        response: `Menstrual product availability in ${foundRegion.region} is rated ${foundRegion.sanitary}/5.`,
      });
    }

    if (
      lowerMessage.includes("childcare") ||
      lowerMessage.includes("baby") ||
      lowerMessage.includes("kid")
    ) {
      return NextResponse.json({
        response: `Childcare access in ${foundRegion.region} is rated ${foundRegion.childcare}/5.`,
      });
    }

    if (
      lowerMessage.includes("score") ||
      lowerMessage.includes("rating") ||
      lowerMessage.includes("safe")
    ) {
      return NextResponse.json({
        response: `${foundRegion.region} has an overall community safety score of ${foundRegion.overall}/5 based on ${foundRegion.reviews} reviews.`,
      });
    }

    // ---------- DEFAULT ----------
    return NextResponse.json({
      response: `${foundRegion.region} has an overall safety score of ${foundRegion.overall}/5.

Street Lighting: ${foundRegion.lighting}/5
Public Toilets: ${foundRegion.toilets}/5
Safe Transport: ${foundRegion.transport}/5
Menstrual Products: ${foundRegion.sanitary}/5
Childcare Access: ${foundRegion.childcare}/5

Latest community review:
"${foundRegion.latestComment}"`,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      response:
        "Something went wrong while reading the community review data.",
    });
  }
}