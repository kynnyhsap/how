import { CONFIG_PATH } from "./config";

export async function setApiKey(apiKey: string) {
  const configFile = Bun.file(CONFIG_PATH);

  const exists = await configFile.exists();

  const pretty = (o) => JSON.stringify(o, null, 2);

  if (exists) {
    try {
      const existingConfig = await configFile.json();
      existingConfig.apiKey = apiKey;
      await Bun.write(CONFIG_PATH, pretty(existingConfig));
    } catch (e) {
      await Bun.write(CONFIG_PATH, pretty({ apiKey }));
    }
  } else {
    await Bun.write(CONFIG_PATH, pretty({ apiKey }));
  }

  console.log(`API key updated.`);
}
