import clipboard from "clipboardy";
import { getChatReponse } from "./openai";
import { getConfig } from "./config";

const GRAY_BOLD = "\x1b[1;30m";
const BLUE_BOLD = "\x1b[1;34m";

export async function main() {
  const config = await getConfig();

  const content = await getChatReponse(config);

  const [description, ...commands] = content.split("\n");

  console.log("", BLUE_BOLD);
  console.log("", description);
  console.log("");

  commands.forEach((command) => {
    console.log(`${GRAY_BOLD}  $ ` + chalk.gray.bold(command));
  });

  // if (config.copy) {
  clipboard.writeSync(commands.join(" && "));
  // }
}
