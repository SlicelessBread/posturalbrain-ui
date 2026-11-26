import type { ReactNode } from 'react';
import { cx } from '../cx';

export type KeyValueItem = { label: ReactNode; value: ReactNode; /** Figures line up with tabular digits. */ numeric?: boolean };

/** The facts of a record, one per line: what it is on the left, its value on the right. */
export function KeyValue({ items, className }: { items: KeyValueItem[]; className?: string }) {
  return (
    <dl className={cx('pb-kv', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <dt>{item.label}</dt>
          <dd className={item.numeric ? 'pb-num' : undefined}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
