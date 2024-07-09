import { parseJSONResponse, ProviderSpec, ProviderType } from "./common";
import { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

const OLLAMA_API_URL = "http://localhost:11434/v1/chat/completions";

const DEFAULT_MODEL = "llama3";

export const ollamaProviderSpec: ProviderSpec = {
  type: ProviderType.Ollama,
  name: "Ollama",

  defaultModel: DEFAULT_MODEL,

  link: "https://ollama.com",
  docsLink: "https://ollama.com/blog/openai-compatibility",

  func: async (prompt: string, config: Config) => {
    const resp = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
