import type { ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

type TopBarProps = {
  /** The name of the app. */
  brand: ReactNode;
  /** The small mark before the name. */
  mark?: IconInput;
  /** Actions on the right: icon buttons, or one small ghost button. */
  children?: ReactNode;
  className?: string;
};

/** The bar at the top of every screen of an app. */
export function TopBar({ brand, mark, children, className }: TopBarProps) {
  return (
    <header className={cx('pb-topbar', className)}>
      <div className="pb-topbar__brand">
        {mark ? <span className="pb-topbar__mark" aria-hidden="true">{renderIcon(mark, 'sm')}</span> : null}
        {brand}
      </div>
      {children ? <div className="pb-topbar__actions">{children}</div> : null}
    </header>
  );
}
