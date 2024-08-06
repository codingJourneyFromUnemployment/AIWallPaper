import { Response, NonStreamingChoice } from "../type/openrouter";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is required");
}

export async function enhancePrompt(basePrompt: string): Promise<String> {
  try {
    const res = await axios.post<Response>(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "cognitivecomputations/dolphin-llama-3-70b",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant specialized in enhancing simple prompts into detailed, vivid descriptions suitable for SDXL image generation. Expand on the given prompt with rich, descriptive, detailed language, focusing on visual elements, style, mood, composition, Light and shadow effects. A example of a enhanced prompt is:A beautiful young girl, full body shot, standing gracefully on a sandy beach, wearing a stylish floral-patterned bikini, radiant smile, warm and inviting eyes looking directly into the camera, slender figure, long toned legs, bare feet sinking slightly into the sand, golden hour sunset, soft diffused light, warm orange and pink hues in the sky, gentle waves lapping at her feet, seagulls flying in the distance, wispy clouds, palm trees silhouetted against the horizon, subtle lens flare, wind-tousled hair, sun-kissed skin with a subtle glow, delicate jewelry accents, beach bag and sunglasses nearby, highly detailed, photorealistic, cinematic lighting, full body composition, 8k resolution.",
          },
          {
            role: "user",
            content: `Enhance this prompt for SDXL image generation: "${basePrompt}"`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data.choices || res.data.choices.length === 0) {
      throw new Error("No response from OpenRouter API");
    }

    const firstChoice = res.data.choices[0] as NonStreamingChoice;
    const enhancedPrompt = firstChoice.message.content;

    if (!enhancedPrompt) {
      throw new Error("Empty response from OpenRouter API");
    }

    return enhancedPrompt;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(`API request failed: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
