import path from "node:path";
import envPaths from "env-paths";
import { Providers } from "./providers";

const paths = envPaths("how");
export const CONFIG_PATH = path.join(paths.config, "config.json");

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
