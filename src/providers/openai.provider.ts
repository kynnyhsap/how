import { parseJSONResponse, ProviderSpec, ProviderType } from "./common";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o";

export const openaiProviderSpec: ProviderSpec = {
  type: ProviderType.OpenAI,
  name: "OpenAI",

  defaultModel: DEFAULT_MODEL,

  link: "https://openai.com",
  docsLink: "",
  apiKeyLink: "https://platform.openai.com/account/api-keys",

  apiKeyRequired: true,

  func: async (prompt: string, config: Config) => {
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
