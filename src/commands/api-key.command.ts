import { getConfig, saveConfig } from "../config";
import { mask } from "../mask";

import { password } from "@inquirer/prompts";
import { getProviderSpec } from "../providers";

export async function apiKeyCommand() {
  const config = await getConfig();

  const { name, apiKeyRequired, apiKeyLink } = getProviderSpec(config.provider);

  if (!apiKeyRequired) {
    console.log(`API key is not required for the ${name} provider`);
    return;
  }

  const message = `Enter API key for ${name} (${apiKeyLink}) \n`;

  const newApiKey = await password({
    message,
    mask: true,
  });

  config.apiKey = newApiKey;

  await saveConfig(config);

  console.log(`API key for ${name} updated: ${mask(newApiKey)}`);
}
