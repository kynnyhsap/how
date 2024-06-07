import { Config } from "./config";
import { SYSTEM_PROMPT, USER_PROMPT } from "./prompts";

export async function getChatReponse({
  url,
  model,
  apiKey,
}: Config): Promise<string> {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT },
      ],
    }),
  });

  if (resp.status !== 200) {
    throw new Error(await resp.text());
  }

  const data = await resp.json();

  return data.choices?.[0]?.message?.content ?? "";
}
