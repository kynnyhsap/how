import type { ProviderResult } from ".";
import type { Config } from "../config";
import { SYSTEM_PROMPT } from "../systemPrompt";

export async function openAIProvider(
	prompt: string,
	config: Config,
): Promise<ProviderResult> {
	const API_URL = config.url ?? "https://api.openai.com/v1/chat/completions";
	const DEFAULT_MODEL = config.model ?? "gpt-4o";

	const headers = {
		"Content-Type": "application/json",
		Authorization: "",
	};

	if (API_URL.includes("api.openai.com")) {
		if (!config.apiKey) {
			throw new Error(
				"API key isn't set. Please run `how -k <API_KEY>` to set OpenAI API key. You can get an API here https://platform.openai.com/account/api-keys",
			);
		}
		headers.Authorization = `Bearer ${config.apiKey}`;
	}

	const resp = await fetch(API_URL, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			model: config.model ?? DEFAULT_MODEL,
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{ role: "user", content: prompt },
			],
		}),
	});

	if (resp.status !== 200) {
		throw new Error(await resp.text());
	}

	const data = await resp.json();
	const content: string = data.choices?.[0]?.message?.content ?? "";
	const [description, ...commands] = content.split("\n");

	return {
		commands,
		description,
	};
}
