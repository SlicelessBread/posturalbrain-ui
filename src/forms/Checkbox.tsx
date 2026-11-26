import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../cx';

type CheckboxProps = { label: ReactNode; /** A second, quieter line. */ description?: ReactNode } & Omit<ComponentProps<'input'>, 'type'>;

/** A yes or no that takes effect when the form is saved. `className` goes on the row; everything else on the input. */
export function Checkbox({ label, description, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx('pb-check', className)}>
      {/* data-pb-compact: the box is small, the whole row is the tap target. */}
      <input type="checkbox" data-pb-compact="" {...rest} />
      {description ? (
        <span className="pb-check__text">
          {label}
          <span className="text-caption pb-subtle">{description}</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
    </label>
  );
}
