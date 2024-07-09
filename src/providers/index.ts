import { Config } from "../config";
import { anthropicProvider } from "./anthropic";
import { groqProvider } from "./groq";
import { ollamaProvider } from "./ollama";
import { openaiProvider } from "./openai";

export type ProviderResult = {
  commands: string[];
  description: string;
};

export enum Providers {
  OpenAI = "openai",
  Anthropic = "anthropic",
  Ollama = "ollama",
  Groq = "groq",

  Custom = "custom",
}

type Provider = (prompt: string, config: Config) => Promise<ProviderResult>;

async function notImplementedProvider(prompt: string): Promise<ProviderResult> {
  throw new Error("Provider not implemented");
}

export function parseJSONResponse(json: string): ProviderResult {
  try {
    const { description, commands } = JSON.parse(json);

    return {
      description: description ?? "",
      commands: commands ?? [],
    };
  } catch (error) {
    throw new Error(
      `Failed to parse "description" and "commands" from LLM response: ${json}. \n${error.message}`,
    );
  }
}

const providers: Record<Providers, Provider> = {
  [Providers.OpenAI]: openaiProvider,
  [Providers.Anthropic]: anthropicProvider,
  [Providers.Ollama]: ollamaProvider,
  [Providers.Groq]: groqProvider,
  [Providers.Custom]: notImplementedProvider,
};

export async function executeProvider(
  prompt: string,
  config: Config,
): Promise<ProviderResult> {
  const provider = config.provider ? providers[config.provider] : undefined;

  if (!provider) {
    throw new Error(
      `Provider not found "${config.provider}" is invalid. Please use one of: ${Object.keys(providers).join(", ")}`,
    );
  }

  return provider(prompt, config);
}
