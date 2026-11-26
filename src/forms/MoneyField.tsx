import { useId, type ComponentProps } from 'react';
import { describedBy, Field, type FieldProps } from './Field';

/**
 * An amount in euros, typed as text with the decimal keypad ("1.200,00").
 * Parsing and formatting stay with the app: the field holds what was typed.
 */
export function MoneyField({ label, help, helpNumeric, error, className, ...rest }: FieldProps & Omit<ComponentProps<'input'>, 'type' | 'inputMode'>) {
  const noteId = useId();
  const field = { label, help, helpNumeric, error };
  return (
    <Field {...field} noteId={noteId} className={className}>
      <span className="pb-input-group">
        <input className="pb-input pb-num" type="text" inputMode="decimal" autoComplete="off" aria-invalid={error ? true : undefined} aria-describedby={describedBy(field, noteId)} {...rest} />
        <span className="pb-input-group__suffix" aria-hidden="true">€</span>
      </span>
    </Field>
  );
}
