import { strategyEntries } from "../index";

describe("strategy config contract", () => {
  it.each(strategyEntries)(
    "materializes defaults and rejects unknown fields for $manifest.name",
    (entry) => {
      expect(entry.parseConfig({})).toEqual(entry.defaults);
      expect(() =>
        entry.parseConfig({ UNKNOWN_STRATEGY_CONFIG_FIELD: true }),
      ).toThrow(
        `${entry.manifest.name}.UNKNOWN_STRATEGY_CONFIG_FIELD is not allowed`,
      );
    },
  );

  it.each(strategyEntries)(
    "rejects invalid scalar types for $manifest.name",
    (entry) => {
      const numericField = Object.entries(entry.defaults).find(
        ([, value]) => typeof value === "number",
      );
      expect(numericField).toBeDefined();
      const [key] = numericField!;

      expect(() => entry.parseConfig({ [key]: "invalid" })).toThrow(
        `${entry.manifest.name}.${key} must be a finite number`,
      );
    },
  );
});
