import type { ComponentProps } from 'react';
import { Icon } from '../Icon';
import { Field, useField, type FieldProps } from './Field';

/** A choice among a few known options, with the system's own picker. Pass the `<option>`s as children. */
export function Select({ label, help, helpNumeric, error, className, children, ...rest }: FieldProps & ComponentProps<'select'>) {
  const { shell, control } = useField({ label, help, helpNumeric, error });
  return (
    <Field {...shell} className={className}>
      <span className="pb-select">
        <select className="pb-input" {...control} {...rest}>
          {children}
        </select>
        <Icon name="chevron-down" />
      </span>
    </Field>
  );
}
