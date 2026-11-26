import type { ReactNode } from 'react';
import { cx } from '../cx';

type MiniStatProps = { value: ReactNode; label: ReactNode; negative?: boolean; className?: string };

/** A small figure with its label; two side by side in a `Grid2`. */
export function MiniStat({ value, label, negative, className }: MiniStatProps) {
  return (
    <div className={cx('pb-mini', negative && 'pb-mini--negative', className)}>
      <strong className="pb-mini__value text-figure pb-num">{value}</strong>
      <span className="pb-mini__label text-label">{label}</span>
    </div>
  );
}
