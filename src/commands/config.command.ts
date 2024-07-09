import { getConfig } from "../config";
import { mask } from "../mask";

export async function configCommand() {
	const config = await getConfig();

	if (config.apiKey) {
		config.apiKey = mask(config.apiKey);
	}

	console.log(JSON.stringify(config, null, 2));
}
