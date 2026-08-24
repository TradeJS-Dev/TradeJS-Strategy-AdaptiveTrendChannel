/** @jest-environment node */

import { config as DEFAULT_CONFIG } from "../config";
import {
  advanceAdaptiveTrendChannelExit,
  resolveAdaptiveTrendChannelExitConfirmationBars,
  resolveAdaptiveTrendChannelReentryCooldownMs,
} from "../lifecycle";

const makeState = () => ({ pending: null });

describe("AdaptiveTrendChannel lifecycle", () => {
  it("keeps the legacy immediate exit when confirmation is zero", () => {
    const state = makeState();

    expect(
      advanceAdaptiveTrendChannelExit({
        state,
        positionDirection: "SHORT",
        triggerReason: "CHANNEL_BREAK",
        channelBreakPersists: true,
        oppositeRegimePersists: false,
        confirmationBars: 0,
        timestamp: 1,
      }),
    ).toBe("CHANNEL_BREAK");
    expect(state.pending).toBeNull();
  });

  it("requires one subsequent persistent bar and keeps the armed reason", () => {
    const state = makeState();

    expect(
      advanceAdaptiveTrendChannelExit({
        state,
        positionDirection: "SHORT",
        triggerReason: "OPPOSITE_FLIP",
        channelBreakPersists: false,
        oppositeRegimePersists: true,
        confirmationBars: 1,
        timestamp: 1,
      }),
    ).toBeNull();
    expect(state.pending).toEqual(
      expect.objectContaining({ reason: "OPPOSITE_FLIP", stableBars: 0 }),
    );

    expect(
      advanceAdaptiveTrendChannelExit({
        state,
        positionDirection: "SHORT",
        triggerReason: null,
        channelBreakPersists: false,
        oppositeRegimePersists: true,
        confirmationBars: 1,
        timestamp: 2,
      }),
    ).toBe("OPPOSITE_FLIP");
    expect(state.pending).toBeNull();
  });

  it("cancels a pending exit when its causal condition does not persist", () => {
    const state = makeState();
    advanceAdaptiveTrendChannelExit({
      state,
      positionDirection: "LONG",
      triggerReason: "CHANNEL_BREAK",
      channelBreakPersists: true,
      oppositeRegimePersists: false,
      confirmationBars: 1,
      timestamp: 1,
    });

    expect(
      advanceAdaptiveTrendChannelExit({
        state,
        positionDirection: "LONG",
        triggerReason: null,
        channelBreakPersists: false,
        oppositeRegimePersists: false,
        confirmationBars: 1,
        timestamp: 2,
      }),
    ).toBeNull();
    expect(state.pending).toBeNull();
  });

  it("resolves SHORT confirmation independently and preserves global fallback", () => {
    const config = {
      ...DEFAULT_CONFIG,
      ADAPTIVE_TREND_CHANNEL_EXIT_CONFIRMATION_BARS: 0,
      ADAPTIVE_TREND_CHANNEL_EXIT_CONFIRMATION_BARS_SHORT: 1,
    } as any;

    expect(
      resolveAdaptiveTrendChannelExitConfirmationBars({
        config,
        direction: "LONG",
      }),
    ).toBe(0);
    expect(
      resolveAdaptiveTrendChannelExitConfirmationBars({
        config,
        direction: "SHORT",
      }),
    ).toBe(1);
  });

  it("keeps the 24-hour cooldown default and accepts explicit zero", () => {
    expect(
      resolveAdaptiveTrendChannelReentryCooldownMs(DEFAULT_CONFIG as any),
    ).toBe(86_400_000);
    expect(
      resolveAdaptiveTrendChannelReentryCooldownMs({
        ...DEFAULT_CONFIG,
        ADAPTIVE_TREND_CHANNEL_REENTRY_COOLDOWN_MS: 0,
      } as any),
    ).toBe(0);
  });
});
