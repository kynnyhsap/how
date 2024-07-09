import { Config } from "../config";

export type ProviderResult = {
  commands: string[];
  description: string;
};

type ProviderFunction = (
  prompt: string,
  config: Config,
) => Promise<ProviderResult>;

export enum ProviderType {
  Ollama = "ollama",

  Groq = "groq",
  OpenAI = "openai",
  Anthropic = "anthropic",

  Custom = "custom",
}

export const DEFAULT_PROVIDER = ProviderType.OpenAI;

export function parseJSONResponse(json: string): ProviderResult {
  try {
    const { description, commands } = JSON.parse(json);

    return {
      description: description ?? "",
      commands: commands ?? [],
    };
  } catch (error) {
    throw new Error(
      `Failed to parse "description" and "commands" from LLM json response: ${json}. \n${error.message}`,
    );
  }
}

export type ProviderSpec = {
  type: ProviderType;
  name: string;

  defaultModel?: string;

  link?: string;
  docsLink?: string;
  apiKeyLink?: string;

  apiKeyRequired?: boolean;

  func: ProviderFunction;
};
