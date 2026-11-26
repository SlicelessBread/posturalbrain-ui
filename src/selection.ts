import type { CSSProperties } from 'react';
import type { StyleWithVars } from './types';

/**
 * The variables the stylesheet reads to place the highlight that slides between equal-width choices:
 * how many there are and which one is chosen. With nothing chosen (`index` below zero) only the count
 * is set, and the stylesheet draws no highlight.
 */
export function selectionVars(index: number, count: number, style?: CSSProperties): CSSProperties | undefined {
  if (count === 0) return style;
  const vars: StyleWithVars = { ...style, '--pb-count': count, ...(index >= 0 ? { '--pb-index': index } : {}) };
  return vars;
}
