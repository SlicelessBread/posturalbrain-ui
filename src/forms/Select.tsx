import { useId, type ComponentProps } from 'react';
import { Icon } from '../Icon';
import { describedBy, Field, type FieldProps } from './Field';

/** A choice among a few known options, with the system's own picker. Pass the `<option>`s as children. */
export function Select({ label, help, helpNumeric, error, className, children, ...rest }: FieldProps & ComponentProps<'select'>) {
  const noteId = useId();
  const field = { label, help, helpNumeric, error };
  return (
    <Field {...field} noteId={noteId} className={className}>
      <span className="pb-select">
        <select className="pb-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(field, noteId)} {...rest}>
          {children}
        </select>
        <Icon name="chevron-down" />
      </span>
    </Field>
  );
}
