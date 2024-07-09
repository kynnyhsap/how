import os from "os";
import path from "path";
import { DEFAULT_PROVIDER, ProviderType } from "./providers/common";

export const CONFIG_PATH = path.join(os.homedir(), ".how/config.json");

export type Config = {
  provider?: ProviderType | string;
  url?: string;
  model?: string;
  apiKey?: string;
};

export async function getConfig(): Promise<Config> {
  const configFile = Bun.file(CONFIG_PATH);

  const exists = await configFile.exists();

  const config = exists ? await configFile.json() : {};

  if (!config.provider) {
    config.provider = DEFAULT_PROVIDER;
  }

  return config;
}

export async function saveConfig(config: Config) {
  await Bun.write(CONFIG_PATH, JSON.stringify(config, null, 2));
}
