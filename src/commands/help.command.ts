const HELP = `Usage: how to [prompt...]

Options
  -k, --key               Set API key
  -p, --provider          Set provider
  -m, --model             Set model
  -c, --config            Print config
  -v, --version           Print version
  -h, --help              Get help for commands`;

export function helpCommand() {
  console.log(HELP);
}
