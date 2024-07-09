# how-cli

Ask your terminal about cli commands (with AI)

<img src="./demo.gif">

## Installation

> Instation script for all platforms comming soon...

## Usage

```bash
how to [prompt...]
```

But first you will need to set `apiKey` with:

```bash
how -k
```

or

```bash
how --key
```

The default provider is `openai`, but you can change it with:

```bash
how -p
```

or

```bash
how --provider
```

You can verify it by viewing config with:

```bash
how -c
```

or

```bash
how --config
```

And then just type any request starting with `how to`:

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

### Providers

Supported providers:

- [x] `openai` - [OpenAPI GPT](https://chatgpt.com/) models (default)
- [x] `anthropic` - [Anthropic](https://claude.ai/) models
- [x] `groq` - [Groq](https://groq.com/) models
- [x] `ollama` - [Ollama](https://ollama.com/) models, on-device inference
- [ ] `custom` - Custom provider

## Development

> You will need [bun](https://bun.sh/) for this.

To install dependencies:

```bash
bun install
```

To run form source:

```bash
bun how [arguments...]
```

To compile from source:

```bash
bun compile
```

To install compiled binary:

```bash
bun replace-bin
```
