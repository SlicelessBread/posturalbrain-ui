'use client';

import { useId, type ReactNode } from 'react';
import { cx } from '../cx';

type SwitchProps = {
  label: ReactNode;
  /** A second, quieter line. */
  description?: ReactNode;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

/** A setting that takes effect at once, with no save step. Put the rows in a `List as="div"`. */
export function Switch({ label, description, checked, onCheckedChange, disabled, className }: SwitchProps) {
  const id = useId();
  return (
    <div className={cx('pb-switch-row', className)}>
      <span id={id} className="pb-switch-row__text">
        {label}
        {description ? <span className="text-caption pb-subtle">{description}</span> : null}
      </span>
      <button className="pb-switch" type="button" role="switch" aria-checked={checked} aria-labelledby={id} disabled={disabled} onClick={() => onCheckedChange?.(!checked)} />
    </div>
  );
}
