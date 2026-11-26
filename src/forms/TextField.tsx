import { useId, type ComponentProps } from 'react';
import { describedBy, Field, type FieldProps } from './Field';

type TextFieldProps = FieldProps &
  (({ /** More than one line of text. */ multiline?: false } & ComponentProps<'input'>) | ({ multiline: true } & ComponentProps<'textarea'>));

/** A line of text, or several with `multiline`. `className` goes on the field; everything else on the control. */
export function TextField({ label, help, helpNumeric, error, className, ...rest }: TextFieldProps) {
  const noteId = useId();
  const field = { label, help, helpNumeric, error };
  const shared = { className: 'pb-input', 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy(field, noteId) };
  let control;
  if (rest.multiline) {
    const { multiline: _multiline, ...textarea } = rest;
    control = <textarea {...shared} {...textarea} />;
  } else {
    const { multiline: _multiline, type = 'text', ...input } = rest;
    control = <input type={type} {...shared} {...input} />;
  }
  return (
    <Field {...field} noteId={noteId} className={className}>
      {control}
    </Field>
  );
}
