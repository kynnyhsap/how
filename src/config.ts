import os from "os";
import path from "path";
import { Providers } from "./providers";

export const CONFIG_PATH = path.join(os.homedir(), ".how/config.json");

export type Config = {
  provider?: Providers;
  url?: string;
  model?: string;
  apiKey?: string;
};

export async function getConfig(): Promise<Config> {
  const configFile = Bun.file(CONFIG_PATH);

  const exists = await configFile.exists();

  const config = exists ? await configFile.json() : {};

  if (!config.provider) {
    config.provider = Providers.OpenAI;
  }

  return config;
}
