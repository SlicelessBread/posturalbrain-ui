import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';

export type FieldProps = {
  label: ReactNode;
  /** A line of guidance under the control. */
  help?: ReactNode;
  /** Lines the help up as figures (a character count, an amount). */
  helpNumeric?: boolean;
  /** What is wrong and how to fix it. Shown in place of the help; marks the field invalid. */
  error?: ReactNode;
};

type FieldShellProps = FieldProps & {
  /** The id given to the help or error text, for the control's `aria-describedby`. */
  noteId: string;
  className?: string;
  children: ReactNode;
};

/** The id to put in the control's `aria-describedby`, when the field has a note. */
export const describedBy = (props: FieldProps, noteId: string) => (props.error || props.help ? noteId : undefined);

/** Internal: the label, the control and its note, as one tap target. */
export function Field({ label, help, helpNumeric, error, noteId, className, children }: FieldShellProps) {
  return (
    <label className={cx('pb-field', error ? 'pb-field--invalid' : false, className)}>
      <span className="pb-field__label text-label">{label}</span>
      {children}
      {error ? (
        <span id={noteId} className="pb-field__error text-caption">
          <Icon name="circle-alert" size="sm" />
          {error}
        </span>
      ) : help ? (
        <span id={noteId} className={cx('pb-field__help', 'text-caption', helpNumeric && 'pb-num')}>{help}</span>
      ) : null}
    </label>
  );
}
