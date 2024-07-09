import { select } from "@inquirer/prompts";
import { getProviderSpec, PROVIDER_SPECS } from "../providers";
import { getConfig, saveConfig } from "../config";
import chalk from "chalk";
import { ProviderType } from "../providers/common";

export async function providerCommand() {
  const config = await getConfig();

  const { name } = getProviderSpec(config.provider);

  const choices = Object.entries(PROVIDER_SPECS).map(([value, { name }]) => ({
    name,
    value,
  }));

  const providerMessage = name
    ? chalk.gray.italic(` ( current config.provider is ${name} ) `)
    : chalk.red.italic(` ( current config.provider is invalid ) `);

  const message = "Select provider" + providerMessage;

  config.provider = await select({
    message,
    choices,
  });

  await saveConfig(config);

  console.log("");
  console.log("Provider updated to " + chalk.green.bold(config.provider));
  console.log("Don't forget to update your API key if needed.");
}
