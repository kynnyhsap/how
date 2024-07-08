import { parseArgs } from "util";
import { printVersion } from "./commands/version";
import { printConfig } from "./commands/print-config";
import { setApiKey } from "./commands/set-api-key";
import { main } from "./commands/main";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    help: { type: "boolean" },
    version: { type: "boolean" },
    confing: { type: "boolean" },
    key: {
      type: "string",
      short: "k",
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
} else {
  await main();
}
