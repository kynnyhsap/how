import { parseJSONResponse, ProviderSpec, ProviderType } from "./common";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama3-8b-8192";

export const groqProviderSpec: ProviderSpec = {
  type: ProviderType.Groq,
  name: "Groq",

  defaultModel: DEFAULT_MODEL,

  link: "https://groq.com/",
  docsLink: "https://console.groq.com/docs/api-keys",
  apiKeyLink: "https://console.groq.com/docs/api-keys",

  apiKeyRequired: true,

  func: async (prompt: string, config: Config) => {
    if (!config.apiKey) {
      throw new Error(
        "API key isn't set. Please run `how -k` to set Groq API key. You can get an API key here https://console.groq.com/docs/api-keys",
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

        max_tokens: 1024,

        response_format: {
          type: "json_object",
        },

        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await resp.json();

    if (resp.status !== 200) {
      throw new Error(data.error.message);
    }

    return parseJSONResponse(data.choices?.[0]?.message?.content);
  },
};
