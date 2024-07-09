import envPaths from "env-paths";
import path from "node:path";
import { DEFAULT_PROVIDER, type ProviderType } from "./providers/common";

const paths = envPaths("how");
export const CONFIG_PATH = path.join(paths.config, "config.json");

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
