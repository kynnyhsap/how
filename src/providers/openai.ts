import { ProviderResult } from ".";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o";

export async function openAIProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
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
    }),
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  const data = await resp.json();

  const content: string = data.choices?.[0]?.message?.content ?? "";

  const [description, ...commands] = content.split("\n");

  return {
    commands,
    description,
  };
}
