// api/identify.js  — Vercel Serverless Function
// Proxies image to Anthropic API so your key stays secret

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "No image provided" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY environment variable is not set" });
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
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: imageBase64,
                },
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

    if (!anthropicResponse.ok) {
      const errData = await anthropicResponse.json().catch(() => ({}));
      return res.status(anthropicResponse.status).json({
        error: errData.error?.message || "Anthropic API error",
      });
    }

    const data = await anthropicResponse.json();
    const text = data.content
      .map((c) => c.text || "")
      .join("")
      .replace(/```json|```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Could not parse AI response" });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("AquaScan proxy error:", err);
    return res.status(500).json({ error: "Internal server error: " + err.message });
  }
}
