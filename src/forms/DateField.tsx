import { useId, type ComponentProps } from 'react';
import { Icon } from '../Icon';
import { describedBy, Field, type FieldProps } from './Field';

/** A date, with the system's own picker. The value is ISO `YYYY-MM-DD`. */
export function DateField({ label, help, helpNumeric, error, className, ...rest }: FieldProps & Omit<ComponentProps<'input'>, 'type'>) {
  const noteId = useId();
  const field = { label, help, helpNumeric, error };
  return (
    <Field {...field} noteId={noteId} className={className}>
      <span className="pb-input-group">
        <input className="pb-input" type="date" aria-invalid={error ? true : undefined} aria-describedby={describedBy(field, noteId)} {...rest} />
        <span className="pb-input-group__suffix" aria-hidden="true"><Icon name="calendar-days" /></span>
      </span>
    </Field>
  );
}
