import clipboard from "clipboardy";
import { getConfig } from "../config";
import { getProviderSpec } from "../providers";
import chalk from "chalk";
import { loader } from "../loader";

export async function mainCommand() {
  const config = await getConfig();

  const prompt = "how " + Bun.argv.slice(2).join(" ");

  loader.start();

  const { func } = getProviderSpec(config.provider);
  const { commands, description } = await func(prompt, config);

  loader.stop();

  console.log("");
  console.log(chalk.green.bold(description));
  console.log("");

  commands.forEach((command) => {
    console.log(chalk.blue.bold("  $ " + command));
  });

  console.log("");
  console.log(chalk.gray.italic("copied to clipboard"));

  clipboard.writeSync(commands.join(" && "));
}
