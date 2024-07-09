import { ProviderSpec, ProviderType } from "./common";

export const customProviderSpec: ProviderSpec = {
  type: ProviderType.Custom,
  name: "Custom",

  func: async (prompt, config) => {
    throw new Error("custom not implemented yet");
  },
};
