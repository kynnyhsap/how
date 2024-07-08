import { getConfig } from "../config";
import { maskApiKey } from "./set-api-key";

export async function printConfig() {
  const config = await getConfig();

  if (config.apiKey) {
    config.apiKey = maskApiKey(config.apiKey);
  }

  console.log(JSON.stringify(config, null, 2));
}
