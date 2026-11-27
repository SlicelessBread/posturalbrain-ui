import type { ComponentProps } from 'react';
import { Field, useField, type FieldProps } from './Field';

/**
 * An amount in euros, typed as text with the decimal keypad ("1.200,00").
 * Parsing and formatting stay with the app: the field holds what was typed.
 */
export function MoneyField({ label, hideLabel, help, helpNumeric, error, className, ...rest }: FieldProps & Omit<ComponentProps<'input'>, 'type' | 'inputMode'>) {
  const { shell, control } = useField({ label, hideLabel, help, helpNumeric, error }, rest);
  return (
    <Field {...shell} className={className}>
      <span className="pb-input-group">
        <input className="pb-input pb-num" type="text" inputMode="decimal" autoComplete="off" {...rest} {...control} />
        <span className="pb-input-group__suffix" aria-hidden="true">€</span>
      </span>
    </Field>
  );
}
