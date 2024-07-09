import { parseArgs } from "util";

import { providerCommand } from "./commands/provider.command";
import { configCommand } from "./commands/config.command";
import { apiKeyCommand } from "./commands/api-key.command";
import { versionCommand } from "./commands/version.command";
import { mainCommand } from "./commands/main.command";
import { helpCommand } from "./commands/help.command";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    help: {
      type: "boolean",
      short: "h",
    },
    version: {
      type: "boolean",
      short: "v",
    },
    confing: {
      type: "boolean",
      short: "c",
    },
    key: {
      type: "string",
      short: "k",
    },
    provider: {
      type: "string",
      short: "p",
    },
    model: {
      type: "string",
      short: "m",
    },
  },
  strict: false,
  allowPositionals: true,
});

if (values.version) {
  versionCommand();
} else if (values.help) {
  helpCommand();
} else if (values.config) {
  await configCommand();
} else if (values.key) {
  await apiKeyCommand();
} else if (values.provider) {
  await providerCommand();
} else {
  try {
    await mainCommand();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
