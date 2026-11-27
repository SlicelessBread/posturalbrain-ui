import { useId, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';

export type FieldProps = {
  label: ReactNode;
  /** Keeps the label for assistive technology only: for a row of fields whose meaning is plain from what is around them. */
  hideLabel?: boolean;
  /** A line of guidance under the control. */
  help?: ReactNode;
  /** Lines the help up as figures (a character count, an amount). */
  helpNumeric?: boolean;
  /** What is wrong and how to fix it. Shown in place of the help; marks the field invalid. */
  error?: ReactNode;
};

type FieldShellProps = FieldProps & {
  /** Ids of the label text and of the help or error text, from `useField`. */
  labelId: string;
  noteId: string;
  className?: string;
  children: ReactNode;
};

type CallerAria = { 'aria-describedby'?: string; 'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling' };

/** Internal: what a field component hands to its `Field` shell and to its control (spread it after the caller's props). */
export function useField({ label, hideLabel, help, helpNumeric, error }: FieldProps, caller: CallerAria = {}) {
  const labelId = useId();
  const noteId = useId();
  const note = error || help ? noteId : undefined;
  return {
    shell: { label, hideLabel, help, helpNumeric, error, labelId, noteId },
    control: {
      // Named by the label text alone: the <label> also wraps the note, which is the description.
      'aria-labelledby': labelId,
      'aria-describedby': [caller['aria-describedby'], note].filter(Boolean).join(' ') || undefined,
      'aria-invalid': error ? true : caller['aria-invalid'],
    },
  };
}

/** Internal: the label, the control and its note, as one tap target. */
export function Field({ label, hideLabel, help, helpNumeric, error, labelId, noteId, className, children }: FieldShellProps) {
  return (
    <label className={cx('pb-field', error ? 'pb-field--invalid' : false, className)}>
      <span id={labelId} className={hideLabel ? 'pb-sr-only' : 'pb-field__label text-label'}>{label}</span>
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
