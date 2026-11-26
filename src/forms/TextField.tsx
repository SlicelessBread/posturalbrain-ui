import type { ComponentProps } from 'react';
import { Field, useField, type FieldProps } from './Field';

type TextFieldProps = FieldProps &
  (({ /** More than one line of text. */ multiline?: false } & ComponentProps<'input'>) | ({ multiline: true } & ComponentProps<'textarea'>));

/** A line of text, or several with `multiline`. `className` goes on the field; everything else on the control. */
export function TextField({ label, help, helpNumeric, error, className, ...rest }: TextFieldProps) {
  const { shell, control } = useField({ label, help, helpNumeric, error });
  let input;
  if (rest.multiline) {
    const { multiline: _multiline, ...textarea } = rest;
    input = <textarea className="pb-input" {...control} {...textarea} />;
  } else {
    const { multiline: _multiline, type = 'text', ...props } = rest;
    input = <input type={type} className="pb-input" {...control} {...props} />;
  }
  return (
    <Field {...shell} className={className}>
      {input}
    </Field>
  );
}
