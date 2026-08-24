import type { Direction } from "@tradejs/types";
import type { AdaptiveTrendChannelConfig } from "./config";
import { resolveDirectionalConfigNumber } from "@tradejs/strategy-kit/config";

export type AdaptiveTrendChannelExitReason = "CHANNEL_BREAK" | "OPPOSITE_FLIP";

export type AdaptiveTrendChannelPendingExit = {
  positionDirection: Direction;
  reason: AdaptiveTrendChannelExitReason;
  armedAtTimestamp: number;
  stableBars: number;
};

export type AdaptiveTrendChannelExitState = {
  pending: AdaptiveTrendChannelPendingExit | null;
};

const asNonNegativeInteger = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : fallback;
};

export const resolveAdaptiveTrendChannelExitConfirmationBars = ({
  config,
  direction,
}: {
  config: AdaptiveTrendChannelConfig;
  direction: Direction;
}) =>
  asNonNegativeInteger(
    resolveDirectionalConfigNumber({
      config,
      key: "ADAPTIVE_TREND_CHANNEL_EXIT_CONFIRMATION_BARS",
      direction,
      fallback: 0,
    }),
  );

export const resolveAdaptiveTrendChannelReentryCooldownMs = (
  config: AdaptiveTrendChannelConfig,
) =>
  asNonNegativeInteger(
    config.ADAPTIVE_TREND_CHANNEL_REENTRY_COOLDOWN_MS,
    86_400_000,
  );

export const clearAdaptiveTrendChannelPendingExit = (
  state: AdaptiveTrendChannelExitState,
) => {
  state.pending = null;
};

export const advanceAdaptiveTrendChannelExit = ({
  state,
  positionDirection,
  triggerReason,
  channelBreakPersists,
  oppositeRegimePersists,
  confirmationBars,
  timestamp,
}: {
  state: AdaptiveTrendChannelExitState;
  positionDirection: Direction;
  triggerReason: AdaptiveTrendChannelExitReason | null;
  channelBreakPersists: boolean;
  oppositeRegimePersists: boolean;
  confirmationBars: number;
  timestamp: number;
}): AdaptiveTrendChannelExitReason | null => {
  if (confirmationBars <= 0) {
    state.pending = null;
    return triggerReason;
  }

  if (state.pending?.positionDirection !== positionDirection) {
    state.pending = null;
  }

  if (state.pending) {
    const persists =
      state.pending.reason === "CHANNEL_BREAK"
        ? channelBreakPersists
        : oppositeRegimePersists;
    if (persists) {
      state.pending.stableBars += 1;
      if (state.pending.stableBars >= confirmationBars) {
        const confirmedReason = state.pending.reason;
        state.pending = null;
        return confirmedReason;
      }
      return null;
    }
    state.pending = null;
  }

  if (triggerReason) {
    state.pending = {
      positionDirection,
      reason: triggerReason,
      armedAtTimestamp: timestamp,
      stableBars: 0,
    };
  }

  return null;
};
