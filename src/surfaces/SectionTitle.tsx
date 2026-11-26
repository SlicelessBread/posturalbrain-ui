import type { ReactNode } from 'react';
import { cx } from '../cx';

type SectionTitleProps = {
  children: ReactNode;
  /** How many items the section holds. */
  count?: ReactNode;
  /** Usually a small ghost `Button` with `href` ("Vedi tutte"). */
  action?: ReactNode;
  className?: string;
};

/** The heading of a section of a screen. */
export function SectionTitle({ children, count, action, className }: SectionTitleProps) {
  return (
    <div className={cx('pb-section-title', className)}>
      <h2 className="text-section">
        {children}
        {count != null ? <> <span className="pb-section-title__count">{count}</span></> : null}
      </h2>
      {action}
    </div>
  );
}
