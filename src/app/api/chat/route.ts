import { NextResponse } from 'next/server';
import localData from '../../../data/reviews.json'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || ""; 
    const lowerMessage = message.toLowerCase();

    // 1. Basic greetings
    if (lowerMessage.match(/\b(hi|hello|hey)\b/)) {
      return NextResponse.json({ 
        response: "Hello! I am HerMap's local safety assistant. Ask me about a region's safety score, transport, lighting, toilets, childcare, or sanitary conditions!" 
      });
    }

    // 2. Safest Region Calculation
    if (lowerMessage.includes("safest") || lowerMessage.includes("highest") || lowerMessage.includes("best")) {
      if (localData && localData.length > 0) {
        let safestRegion = localData[0];
        for (const data of localData) {
          if (data.score > safestRegion.score) safestRegion = data;
        }
        return NextResponse.json({
          response: `The safest area right now is ${safestRegion.region} with an excellent score of ${safestRegion.score}/5.0.`
        });
      }
    }

    // 3. Scan for matching region
    let foundRegion = null;
    for (const data of localData) {
      if (data?.region && lowerMessage.includes(data.region.toLowerCase())) {
        foundRegion = data;
        break; 
      }
    }

    // 4. Smart Responses based on the NEW data fields
    if (foundRegion) {
      
      if (lowerMessage.includes("sanitary") || lowerMessage.includes("hygiene")) {
        return NextResponse.json({ response: `Sanitary conditions in ${foundRegion.region} are currently rated as: ${foundRegion.sanitary}.` });
      }

      if (lowerMessage.includes("toilet") || lowerMessage.includes("washroom") || lowerMessage.includes("restroom")) {
        return NextResponse.json({ response: `Public toilet access in ${foundRegion.region}: ${foundRegion.toilets}.` });
      }

      if (lowerMessage.includes("transport") || lowerMessage.includes("bus") || lowerMessage.includes("metro") || lowerMessage.includes("cab")) {
        return NextResponse.json({ response: `Public transport in ${foundRegion.region} features: ${foundRegion.transport}.` });
      }

      if (lowerMessage.includes("childcare") || lowerMessage.includes("kid") || lowerMessage.includes("baby")) {
        return NextResponse.json({ response: `Regarding childcare access in ${foundRegion.region}, community reviews indicate: ${foundRegion.childcare}.` });
      }

      if (lowerMessage.includes("light") || lowerMessage.includes("dark") || lowerMessage.includes("night")) {
        return NextResponse.json({ response: `Street lighting in ${foundRegion.region} is reported as: ${foundRegion.lighting}.` });
      }

      if (lowerMessage.includes("score") || lowerMessage.includes("rating")) {
        return NextResponse.json({ response: `${foundRegion.region} has an overall safety score of ${foundRegion.score}/5.0 based on ${foundRegion.reviews} community reviews.` });
      }

      if (lowerMessage.includes("weak") || lowerMessage.includes("issue")) {
        return NextResponse.json({ response: `The most significant weakness flagged by users in ${foundRegion.region} is ${foundRegion.weakest}.` });
      }

      // Default Overview using the new "overall" field
      return NextResponse.json({ 
        response: `Overall, ${foundRegion.region} is considered ${foundRegion.overall.toLowerCase()} with a safety score of ${foundRegion.score}/5.0. Transport features ${foundRegion.transport.toLowerCase()} and lighting is ${foundRegion.lighting.toLowerCase()}.` 
      });
    }

    // 5. Fallback
    return NextResponse.json({ 
      response: "I don't have enough review data for that specific request yet." 
    });
    
  } catch (error) {
    console.error("Local Engine Error:", error);
    return NextResponse.json({ response: "I'm doing a quick map reset. Please ask your question again!" });
  }
}