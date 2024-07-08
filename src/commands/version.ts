import packageInfo from "../../package.json" assert { type: "json" };

export function printVersion() {
	console.log(packageInfo.version);
}
