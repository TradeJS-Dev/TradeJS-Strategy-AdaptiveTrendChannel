# @tradejs/strategy-adaptive-trend-channel

TradeJS strategy plugin providing `AdaptiveTrendChannel`.

## Strategy overview

`AdaptiveTrendChannel` fits a short regression channel and stretches its
envelope with current volatility. It trades confirmed channel flips or breaks,
can require trend and context alignment, and builds stops and targets from
deterministic channel and ATR geometry.

## Install

```bash
yarn add @tradejs/strategy-adaptive-trend-channel
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-adaptive-trend-channel"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
