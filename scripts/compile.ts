import { $ } from "bun";

const outDir = "./out";

await $`mkdir -p ${outDir}`;

const targets = [
  "bun-darwin-x64",
  "bun-darwin-arm64",

  "bun-linux-x64",
  "bun-linux-arm64",
];

for (const target of targets) {
  console.log(`Compiling for ${target}...`);

  await $`bun build --compile --minify --sourcemap --target=${target} --outfile ${outDir}/how-${target} ./src/index.ts`;
}

console.log("Compilation complete for all targets.");
