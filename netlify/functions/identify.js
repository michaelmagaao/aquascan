// netlify/functions/identify.js — Netlify Serverless Function

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let imageBase64;
  try {
    ({ imageBase64 } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!imageBase64) {
    return { statusCode: 400, body: JSON.stringify({ error: "No image provided" }) };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "ANTHROPIC_API_KEY not set" }) };
  }

  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: "image/jpeg", data: imageBase64 },
              },
              {
                type: "text",
                text: `You are AquaScan, an expert marine biologist AI.
Analyze this image. If you see a fish, respond ONLY with a JSON object (no markdown, no code fences).
If no fish is visible, respond with: {"error":"no_fish"}

JSON schema:
{
  "commonName": "string",
  "scientificName": "string",
  "family": "string",
  "confidence": "High|Medium|Low",
  "habitat": "string",
  "distribution": "string",
  "averageLength": "string",
  "maxWeight": "string",
  "lifespan": "string",
  "diet": "string",
  "conservationStatus": "string",
  "isEdible": "Yes|No|Sometimes",
  "description": "2-3 sentence description",
  "funFact": "one surprising fact"
}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await anthropicResponse.json();

    if (!anthropicResponse.ok) {
      return { statusCode: anthropicResponse.status, body: JSON.stringify({ error: data.error?.message || "API error" }) };
    }

    const text = data.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();

    let parsed;
    try { parsed = JSON.parse(text); }
    catch { return { statusCode: 500, body: JSON.stringify({ error: "Could not parse AI response" }) }; }

    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error: " + err.message }) };
  }
};
