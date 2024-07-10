import { readdir } from "node:fs/promises";

const token = process.env.GITHUB_TOKEN;

const owner = "kynnyhsap";
const repo = "how";

const version = "v0.1.0";
const description = `Release of how-cli ${version}`;

const response = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/releases`,
  {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag_name: version,
      target_commitish: "main",
      name: version,
      body: description,
      draft: true,
      prerelease: false,
      generate_release_notes: false,
    }),
  },
);

const { id } = (await response.json()) as { id: number };

console.log(`Created release ${id} for version ${version}`);

const outDir = "./out";

const targets = await readdir(outDir);

for (const target of targets) {
  const data = await Bun.file(`${outDir}/${target}`).arrayBuffer();

  console.log(`Uploading ${target} target for release ${id}...`);

  await fetch(
    `https://uploads.github.com/repos/${owner}/${repo}/releases/${id}/assets?name=${target}`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/x-executable",
      },
      body: data,
    },
  );

  console.log(`Uploaded ${target} target.`);
}

console.log(
  `Uploaded all targets for release ${id} (${version}). Release complete.`,
);
