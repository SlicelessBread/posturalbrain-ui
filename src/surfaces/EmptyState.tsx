import type { ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

type EmptyStateProps = {
  icon: IconInput;
  title: ReactNode;
  /** One sentence on what to do next. */
  children?: ReactNode;
  /** Usually a primary `Button`. */
  action?: ReactNode;
  className?: string;
};

/** What a list shows when it has nothing yet, with the way to fill it. */
export function EmptyState({ icon, title, children, action, className }: EmptyStateProps) {
  return (
    <div className={cx('pb-empty', className)}>
      <span className="pb-empty__icon" aria-hidden="true">{renderIcon(icon, 'lg')}</span>
      <h2 className="text-section">{title}</h2>
      {children ? <p className="pb-muted">{children}</p> : null}
      {action}
    </div>
  );
}
