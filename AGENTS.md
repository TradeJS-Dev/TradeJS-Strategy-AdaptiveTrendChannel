# AGENTS.md

## Scope

These rules apply to this complete strategy repository.

## Workspace Routing

- The canonical workspace map is `~/dev/tradejs/AGENTS.md`. Do not scan
  sibling repositories when that map already identifies the owner.
- Make this strategy's source, config, deterministic gate, figures, and test
  changes here; run `yarn checks` here.
- Run backtest, replay, Redis, evidence, notes, and release operations from
  `~/dev/tradejs/tradejs-project`. Keep that directory as `PROJECT_CWD` and
  point `TRADEJS_SOURCE_REPOSITORY_ROOT` at this repository for lineage.
- Use `$strategy-backtest-research` for implementation/backtest work,
  `$ai-train-local-research` for deterministic gate analysis, and
  `$strategy-release` for bounded release or forward-test work. Their
  instructions live in `~/dev/tradejs/investing/.codex/skills/`.
- Do not create `data/`, `notes/`, runtime config, or deployment files here.

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
