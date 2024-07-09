import { parseArgs } from "util";
import { printVersion } from "./commands/version";
import { printConfig } from "./commands/print-config";
import { setApiKey } from "./commands/set-api-key";
import { main } from "./commands/main";
import { loader } from "./loader";
import { setProvider } from "./commands/set-provider";

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
  printVersion();
} else if (values.help) {
  console.log(`TODO`);
} else if (values.config) {
  await printConfig();
} else if (typeof values.key === "string") {
  await setApiKey(values.key);
} else if (typeof values.provider === "string") {
  await setProvider(values.provider);
} else {
  try {
    await main();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
