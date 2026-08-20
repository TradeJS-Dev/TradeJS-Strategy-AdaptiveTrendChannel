import { defineStrategyPlugin } from "@tradejs/core/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import type { StrategyConfig } from "@tradejs/types";
import { config as adaptiveTrendChannelDefaultConfig } from "./AdaptiveTrendChannel/config";
import { AdaptiveTrendChannelStrategyDefinition } from "./AdaptiveTrendChannel/strategy";

export const strategyEntries: ValidatedStrategyRegistryEntry<any>[] = [
  AdaptiveTrendChannelStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  AdaptiveTrendChannel: adaptiveTrendChannelDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { AdaptiveTrendChannelStrategyDefinition } from "./AdaptiveTrendChannel/strategy";
export { adaptiveTrendChannelDefaultConfig };
export { adaptiveTrendChannelManifest } from "./AdaptiveTrendChannel/manifest";
export { adaptiveTrendChannelAiAdapter } from "./AdaptiveTrendChannel/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
