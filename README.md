# how cli

Ask a cli tool about other cli tools.

```bash
how to exit vim
```

<img src="./demo.gif">

## Installation

> Instation script for all platforms comming soon...

## Usage

Firs you will need to set `api key` (gpt-4o is a default model):

```bash
how -k <your_api_key>
```

You can verify it by viewing config:

```bash
how --config
```

And then just type any request starting with `how`:

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

- [x] `openai` - (OpenAPI GPT)[https://chatgpt.com/] models (defaul)
- [ ] `groq` - (Groq)[https://groq.com/] models
- [ ] `claude` - (Claude Anthropic)[https://claude.ai/] models
- [ ] `ollama` - (Ollama)[https://ollama.com/] models, on-device inference
- [ ] `custom` - Custom provider

## Development

> You will need `bun` for this.

To install dependencies:

```bash
bun install
```

To run form source:

```bash
bun how to do ...
```

To compile from source:

```bash
bun compile
```

To install compiled binary:

```bash
sudo cp ./how /usr/local/bin/how
```
