import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

type LoginScreenProps = {
  /** The name of the app. */
  title: ReactNode;
  subtitle?: ReactNode;
  mark?: IconInput;
  /** A `LoginForm` with the fields and buttons of this app. */
  children: ReactNode;
  className?: string;
};

/** The screen a person meets before signing in: who they are entering, and how. */
export function LoginScreen({ title, subtitle, mark = 'activity', children, className }: LoginScreenProps) {
  return (
    <main className={cx('pb-login', className)}>
      <span className="pb-login__mark" aria-hidden="true">{renderIcon(mark, 'lg')}</span>
      <h1 className="text-display">{title}</h1>
      {subtitle ? <p className="pb-muted">{subtitle}</p> : null}
      {children}
    </main>
  );
}

/** The form of a `LoginScreen`: fields, the primary button, then other ways in after a `LoginDivider`. */
export function LoginForm({ className, ...rest }: ComponentProps<'form'>) {
  return <form className={cx('pb-login__form', 'pb-stack', className)} {...rest} />;
}

/** The word between the main way in and the others. */
export function LoginDivider({ children = 'oppure' }: { children?: ReactNode }) {
  return <span className="pb-login__or text-caption">{children}</span>;
}
