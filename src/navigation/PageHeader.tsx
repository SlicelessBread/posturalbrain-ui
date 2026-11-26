import type { ReactNode } from 'react';
import { IconButton } from '../actions/IconButton';
import { cx } from '../cx';
import type { LinkAs } from '../types';

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Uses the opening style (`text-display`): the greeting of a home screen, once per screen. */
  display?: boolean;
  /** A way back to the list this page belongs to; `label` says where it goes. */
  back?: { href: string; label: string; as?: LinkAs };
  /** Actions on the right: one icon button or one small button. */
  children?: ReactNode;
  className?: string;
};

/** The title of a screen, with the way back and its main action. */
export function PageHeader({ title, subtitle, display, back, children, className }: PageHeaderProps) {
  return (
    <header className={cx('pb-page-head', className)}>
      {back ? <IconButton className="pb-page-head__back" variant="ghost" icon="chevron-left" label={back.label} href={back.href} as={back.as} /> : null}
      <div className="pb-page-head__text">
        <h1 className={cx('pb-page-head__title', display ? 'text-display' : 'text-title')}>{title}</h1>
        {subtitle ? <p className="pb-page-head__sub text-label">{subtitle}</p> : null}
      </div>
      {children ? <div className="pb-page-head__actions">{children}</div> : null}
    </header>
  );
}
