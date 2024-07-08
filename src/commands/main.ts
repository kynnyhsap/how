import chalk from "chalk";
import clipboard from "clipboardy";
import { getConfig } from "../config";
import { executeProvider } from "../providers";

export async function main() {
	const config = await getConfig();

	const prompt = `how ${Bun.argv.slice(2).join(" ")}`;

	const { commands, description } = await executeProvider(prompt, config);

	console.log("");
	console.log(chalk.green.bold(description));
	console.log("");

	for (const command of commands) {
		console.log(chalk.blue.bold(`  $ ${command}`));
	}

	console.log("");
	console.log(chalk.gray.italic("copied to clipboard"));

	clipboard.writeSync(commands.join(" && "));
}
