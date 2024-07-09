import { parseJSONResponse, ProviderResult } from ".";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const OLLAMA_API_URL = "http://localhost:11434/v1/chat/completions";

const DEFAULT_MODEL = "llama3";

export async function ollamaProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
  const resp = await fetch(OLLAMA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model ?? DEFAULT_MODEL,
      max_tokens: 1024,
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
