import { CONFIG_PATH, getConfig } from "../config";

export function maskApiKey(apiKey: string) {
  return apiKey.slice(0, 2) + "*".repeat(apiKey.length - 2);
}

export async function setApiKey(apiKey: string) {
  const config = await getConfig();

  config.apiKey = apiKey;

  await Bun.write(CONFIG_PATH, JSON.stringify(config, null, 2));

  console.log(`API key updated: ${maskApiKey(apiKey)}`);
}
