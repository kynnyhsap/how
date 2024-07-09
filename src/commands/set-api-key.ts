import { getConfig, saveConfig } from "../config";

const maskLenght = 3;
export function maskApiKey(k?: string) {
  if (!k) {
    return "";
  }

  return (
    k.slice(0, maskLenght) +
    "*".repeat(k.length - maskLenght * 2) +
    k.slice(-maskLenght)
  );
}

export async function setApiKey(apiKey: string) {
  const config = await getConfig();

  config.apiKey = apiKey;

  await saveConfig(config);

  console.log(`API key updated: ${maskApiKey(apiKey)}`);
}
