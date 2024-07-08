import { Config } from "../config";
import { openAIProvider } from "./openai";

export type ProviderResult = {
  commands: string[];
  description: string;
};

export enum Providers {
  OpenAI = "openai",
  Claude = "claude",
  Ollama = "ollama",
  Groq = "groq",

  Custom = "custom",
}

type Provider = (prompt: string, config: Config) => Promise<ProviderResult>;

async function notImplementedProvider(prompt: string): Promise<ProviderResult> {
  throw new Error("Provider not implemented");
}

const providers: Record<Providers, Provider> = {
  [Providers.OpenAI]: openAIProvider,
  [Providers.Claude]: notImplementedProvider,
  [Providers.Ollama]: notImplementedProvider,
  [Providers.Groq]: notImplementedProvider,
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
