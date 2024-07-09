import { DEFAULT_PROVIDER, ProviderSpec, ProviderType } from "./common";

import { anthropicProviderSpec } from "./anthropic.provider";
import { customProviderSpec } from "./custom.provider";
import { groqProviderSpec } from "./groq.provider";
import { ollamaProviderSpec } from "./ollama.provider";
import { openaiProviderSpec } from "./openai.provider";

export const PROVIDER_SPECS: Record<ProviderType, ProviderSpec> = {
  [ProviderType.Ollama]: ollamaProviderSpec,

  [ProviderType.Groq]: groqProviderSpec,
  [ProviderType.OpenAI]: openaiProviderSpec,
  [ProviderType.Anthropic]: anthropicProviderSpec,

  [ProviderType.Custom]: customProviderSpec,
};

export function getProviderSpec(provider: ProviderType | string | undefined) {
  if (!Object.values(ProviderType).includes(provider as ProviderType)) {
    console.warn(
      `Unknown provider "${provider}" detected in config. Defaulting to "${DEFAULT_PROVIDER}"`,
    );

    return PROVIDER_SPECS[DEFAULT_PROVIDER];
  }

  return PROVIDER_SPECS[provider as ProviderType];
}
