# how

Ask your terminal about cli commands (with AI)

<img src="./demo.gif">

## Installation

Run this command to install `how`:

```bash
curl -fsSL https://raw.githubusercontent.com/kynnyhsap/how/main/scripts/install.sh | bash
```

> This will fetch and run the script located in [./scripts/install.sh](/scripts/install.sh).

## Usage

Make sure to set **api key** first with `--key` flag:

```bash
how --key
```

> Default provider is `openai`. You can change it with `--provider` flag. See [providers](#providers) below for more info.

Now you can prompt and adk `how` about cli commands:

```bash
how to [prompt...]
```

### Providers

The default provider is `openai`, but you can change it with `--provider` flag:

```bash
how --provider
```

Changing provider means you also need to update the api key with `--key` flag.

Supported providers:

- [x] `openai` - [OpenAPI GPT](https://chatgpt.com/) models (default)
- [x] `anthropic` - [Anthropic](https://claude.ai/) models
- [x] `groq` - [Groq](https://groq.com/) models
- [x] `ollama` - [Ollama](https://ollama.com/) models, on-device inference, no api key required
- [ ] `custom` - Custom provider script

### Config

Api key and provider info is stored in `~/.how/config.json`. This config is also used for other options. You can view it with:

```bash
how --config
```

### Help

To see all available commands and options:

```bash
how --help
```

## Examples

```bash
how to create a git branch
```

```bash
how to convert video to gif with ffmpeg
```

```bash
how to upgrade node to latest version
```

<img src="./demo.gif">

## Development

> You will need [bun](https://bun.sh/) for this.

To install dependencies:

```bash
bun install
```

To run from source:

```bash
bun how [arguments...]
```

To compile executable from source:

```bash
bun compile-dev
```
