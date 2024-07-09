import { ProviderResult } from ".";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama3-70b-8192";

export async function groqCloudProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
  if (!config.apiKey) {
    throw new Error(
      "API key isn't set. Please run `how -k <API_KEY>` to set GroqCloud API key. You can get an API key here https://console.groq.com/docs/api-keys",
    );
  }

  const resp = await fetch(GROQ_API_URL, {
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
