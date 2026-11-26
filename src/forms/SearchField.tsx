import type { ComponentProps } from 'react';
import { IconButton } from '../actions/IconButton';
import { cx } from '../cx';
import { Icon } from '../Icon';

type SearchFieldProps = {
  /** What is searched, for assistive technology; usually the same words as the placeholder. */
  label: string;
  /** With a handler, and some text in `value`, a button to clear the search appears. */
  onClear?: () => void;
  clearLabel?: string;
} & Omit<ComponentProps<'input'>, 'type' | 'aria-label'>;

/** A search box. `className` goes on the box; everything else on the input. */
export function SearchField({ label, onClear, clearLabel = 'Cancella la ricerca', className, ...rest }: SearchFieldProps) {
  const filled = typeof rest.value === 'string' && rest.value !== '';
  return (
    <div className={cx('pb-input-group', 'pb-input-group--search', className)}>
      <span className="pb-input-group__prefix" aria-hidden="true"><Icon name="search" /></span>
      <input className="pb-input" type="search" aria-label={label} autoComplete="off" {...rest} />
      {onClear && filled ? <IconButton variant="ghost" icon="x" label={clearLabel} onClick={onClear} /> : null}
    </div>
  );
}
