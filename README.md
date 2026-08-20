# @tradejs/strategy-adaptive-trend-channel

TradeJS strategy plugin providing `AdaptiveTrendChannel`.

## Strategy overview

`AdaptiveTrendChannel` fits a short regression channel and stretches its
envelope with current volatility. It trades confirmed channel flips or breaks,
can require trend and context alignment, and builds stops and targets from
deterministic channel and ATR geometry.

## Logic at a glance

![AdaptiveTrendChannel strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-AdaptiveTrendChannel/main/docs/strategy-logic.svg)

## Signal on an example chart

The example follows a rising regression channel until price closes through its adaptive upper envelope and the context filters accept the transition.

![AdaptiveTrendChannel signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-AdaptiveTrendChannel/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

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

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the production-like Project
image passes. The current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.
