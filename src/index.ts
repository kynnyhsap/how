import { parseArgs } from "util";
import { main } from "./main";
import { setApiKey } from "./set-api-key";
import { getConfig } from "./config";

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
  console.log(`v0.1.0`);
} else if (values.help) {
  console.log(`TODO`);
} else if (values.help) {
  const config = await getConfig();

  console.log(JSON.stringify(config, null, 2));
} else if (typeof values.key === "string") {
  await setApiKey(values.key);
} else {
  await main();
}
