import chalk from "chalk";
import { getConfig, saveConfig } from "../config";
import { Providers } from "../providers";
import { maskApiKey } from "./set-api-key";

const allowed = Object.values(Providers);

export function checkProvider(provider: string) {
  if (!allowed.includes(provider as Providers)) {
    throw new Error(
      `Invalid provider "${provider}" \nExpected one of ${allowed.join(", ")}`,
    );
  }
}

export async function setProvider(provider: string) {
  checkProvider(provider);

  const config = await getConfig();

  config.provider = provider as Providers;

  await saveConfig(config);

  console.log("Provider updated to " + chalk.green.bold(provider));
  console.log("");
  console.log(
    "Make sure you have set " + chalk.blue.bold("correct API key") + ".",
  );
  console.log(
    "Current API key is " + chalk.gray.bold(maskApiKey(config.apiKey)),
  );
}
