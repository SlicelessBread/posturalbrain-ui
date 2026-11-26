/**
 * Share of `max` that `value` fills, between 0 and 1 with two decimals.
 * Anything that cannot be drawn as a bar (NaN, a negative value, no scale) is 0.
 */
export function fraction(value: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0 || value <= 0) return 0;
  return Math.round(Math.min(value / max, 1) * 100) / 100;
}
