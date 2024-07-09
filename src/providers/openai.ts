import { parseJSONResponse, ProviderResult } from ".";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o";

export async function openAIProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
  if (!config.apiKey) {
    throw new Error(
      "API key isn't set. Please run `how -k <API_KEY>` to set OpenAI API key. You can get your API here https://platform.openai.com/account/api-keys",
    );
  }

  const resp = await fetch(OPEN_AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model ?? DEFAULT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_object",
      },
    }),
  });

  const data = await resp.json();

  if (resp.status !== 200) {
    throw new Error(data.error.message);
  }

  return parseJSONResponse(data.choices?.[0]?.message?.content);
}
