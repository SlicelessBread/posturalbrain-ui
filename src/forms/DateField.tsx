import type { ComponentProps } from 'react';
import { Icon } from '../Icon';
import { Field, useField, type FieldProps } from './Field';

/** A date, with the system's own picker. The value is ISO `YYYY-MM-DD`. */
export function DateField({ label, help, helpNumeric, error, className, ...rest }: FieldProps & Omit<ComponentProps<'input'>, 'type'>) {
  const { shell, control } = useField({ label, help, helpNumeric, error });
  return (
    <Field {...shell} className={className}>
      <span className="pb-input-group">
        <input className="pb-input" type="date" {...control} {...rest} />
        <span className="pb-input-group__suffix" aria-hidden="true"><Icon name="calendar-days" /></span>
      </span>
    </Field>
  );
}
