# AGENTS.md

## Scope

These rules apply to this complete strategy repository.

## Ownership

This repository owns `AdaptiveTrendChannel` strategy behavior, configuration, adapters, figures, and tests.

## Architecture

- Export the TradeJS plugin contract through `strategyEntries`.
- Keep detector engines pure and replay-safe.
- Keep StrategyAPI side effects, position checks, risk plans, and entries/exits
  in each strategy's `core.ts`.
- Import neutral helpers from public `@tradejs/strategy-kit/*` subpaths.
- Do not add strategy-specific branches to TradeJS core, indicators, or Strategy
  Kit.
- Do not import source files from another strategy repository.

## Verification

Run `yarn checks` before every commit. Keep CI and release workflows as thin
callers of the pinned reusable workflows in `TradeJS-Workflows`.
