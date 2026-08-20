import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { AdaptiveTrendChannelConfig, config as DEFAULT_CONFIG } from "./config";
import { createAdaptiveTrendChannelCore } from "./core";
import { adaptiveTrendChannelManifest } from "./manifest";

export const AdaptiveTrendChannelStrategyDefinition: ValidatedStrategyRegistryEntry<AdaptiveTrendChannelConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "AdaptiveTrendChannel",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createAdaptiveTrendChannelCore,
    manifest: adaptiveTrendChannelManifest,
  };
