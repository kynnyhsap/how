import os from "os";
import path from "path";

export const CONFIG_PATH = path.join(os.homedir(), ".how/config.json");

export const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";

export const DEFAULT_URL = OPEN_AI_URL;
export const DEFAULT_MODEL = "gpt-4o";

export type Config = {
  url: string;
  model: string;
  apiKey?: string;
  copy?: boolean;
};

export async function getConfig(): Promise<Config> {
  const configFile = Bun.file(CONFIG_PATH);

  const exists = await configFile.exists();

  const config: Partial<Config> = (await configFile.exists())
    ? await configFile.json()
    : {};

  return {
    url: config.url ?? DEFAULT_URL,
    model: config.model ?? DEFAULT_MODEL,
    apiKey: config.apiKey,
  };
}
