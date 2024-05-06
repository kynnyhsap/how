import os from "os";
import OpenAI from "openai";
import chalk from "chalk";
import clipboard from "clipboardy";

const systemPrompt = () => `
You are "how", a CLI command generator.

First line of the response is the description in one sentence.
Subsequent lines of the response are the CLI commands to achieve user's goal.
Do not add anything else, no markdown, just pain text.

System Info: ${os.platform()} ${os.arch()}

Example input:
how to build and install go binary

Example output:
Building and installing a Go binary
go build main.go
go install main
`;

const prompt = "how " + Bun.argv.slice(2).join(" ");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: systemPrompt() },
    { role: "user", content: prompt },
  ],
});

const content = response.choices[0].message.content ?? "";

const [description, ...commands] = content.split("\n");

console.log("");
console.log(chalk.blue.bold(description));
console.log("");

clipboard.writeSync(commands.join(" && "));

commands.forEach((command) => {
  console.log("  $ " + chalk.gray.bold(command));
});
