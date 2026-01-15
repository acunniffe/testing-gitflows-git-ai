import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";

interface SharkRating {
  hasShark: boolean;
  sharkPoints: number; // 0 or 1
  scaryPoints: number; // 1-5
  stylePoints: number; // 1-2
  totalScore: number;
  explanation: string;
}

async function rateSharkSVG(svgPath: string): Promise<SharkRating> {
  // Read the SVG file
  const svgContent = readFileSync(svgPath, "utf-8");

  // Convert SVG to base64 for the API
  const svgBase64 = Buffer.from(svgContent).toString("base64");

  // Initialize Anthropic client
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Create the analysis prompt
  const prompt = `Analyze this image and rate it as a shark picture using these criteria:

1. Does it contain a shark? (1 point if yes, 0 if no)
2. How scary is the shark? (1-5 points, where 1 = not scary at all, 5 = terrifying)
3. Style quality (1-2 points, where 1 = basic/simple style, 2 = polished/artistic style)

Respond ONLY with a JSON object in this exact format:
{
  "hasShark": true/false,
  "sharkPoints": 0 or 1,
  "scaryPoints": 1-5,
  "stylePoints": 1-2,
  "explanation": "brief explanation of your ratings"
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/svg+xml",
              data: svgBase64,
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  // Parse the response
  const responseText = message.content[0].type === "text"
    ? message.content[0].text
    : "";

  // Extract JSON from response (handle potential markdown code blocks)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse response from Claude");
  }

  const rating = JSON.parse(jsonMatch[0]);

  return {
    hasShark: rating.hasShark,
    sharkPoints: rating.sharkPoints,
    scaryPoints: rating.scaryPoints,
    stylePoints: rating.stylePoints,
    totalScore: rating.sharkPoints + rating.scaryPoints + rating.stylePoints,
    explanation: rating.explanation,
  };
}

// Main execution
async function main() {
  const svgPath = process.argv[2];

  if (!svgPath) {
    console.error("Usage: ts-node shark-rater.ts <path-to-svg>");
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  try {
    console.log(`Analyzing shark image: ${svgPath}\n`);

    const rating = await rateSharkSVG(svgPath);

    console.log("🦈 SHARK RATING RESULTS 🦈");
    console.log("=" .repeat(40));
    console.log(`Has Shark: ${rating.hasShark ? "✓" : "✗"} (${rating.sharkPoints} point)`);
    console.log(`Scary Level: ${"🦈".repeat(rating.scaryPoints)} (${rating.scaryPoints}/5 points)`);
    console.log(`Style Quality: ${"⭐".repeat(rating.stylePoints)} (${rating.stylePoints}/2 points)`);
    console.log("=" .repeat(40));
    console.log(`TOTAL SCORE: ${rating.totalScore}/8 points`);
    console.log(`\nExplanation: ${rating.explanation}`);
  } catch (error) {
    console.error("Error rating shark:", error);
    process.exit(1);
  }
}

main();
