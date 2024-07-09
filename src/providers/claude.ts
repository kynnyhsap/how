import { parseJSONResponse, ProviderResult } from ".";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-3-5-sonnet-20240620";

export async function claudeAnthropicProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
  if (!config.apiKey) {
    throw new Error(
      "API key isn't set. Please run `how -k <API_KEY>` to set Anthopic API key. You can get your API key here https://console.anthropic.com/settings/keys",
    );
  }

  const resp = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01", // https://docs.anthropic.com/en/api/versioning
      "x-api-key": config.apiKey,
    },
    body: JSON.stringify({
      model: config.model ?? DEFAULT_MODEL,
      system: SYSTEM_PROMPT,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await resp.json();

  if (resp.status !== 200) {
    throw new Error(data.error.message);
  }

  return parseJSONResponse(data.content?.[0].text);
}
