import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, renderIcon } from '../Icon';
import type { IconInput } from '../types';

type StatCardProps = {
  icon: IconInput;
  label: ReactNode;
  /** The figure, already formatted. */
  value: ReactNode;
  hint?: ReactNode;
  /** `highlight`: the figure the screen is about, drawn larger (one per screen). `negative`: a loss (the same as the `negative` prop). */
  tone?: 'highlight' | 'negative';
  /** A loss, also on the highlighted card: the figure turns to the danger colour. */
  negative?: boolean;
  /** With a handler the card is a button and shows a chevron. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

/** One figure with its label, an icon and a note. */
export function StatCard({ icon, label, value, hint, tone, negative, onClick, className }: StatCardProps) {
  // Inside a <button> the body must be phrasing content.
  const Body = onClick ? 'span' : 'div';
  const content = (
    <>
      <span className="pb-stat__icon" aria-hidden="true">{renderIcon(icon)}</span>
      <Body className="pb-stat__body">
        <span className="pb-stat__label text-label">{label}</span>
        <strong className={cx('pb-stat__value', tone === 'highlight' ? 'text-figure-lg' : 'text-figure', 'pb-num')}>{value}</strong>
        {hint ? <span className="pb-stat__hint text-caption">{hint}</span> : null}
      </Body>
    </>
  );
  const classes = cx('pb-stat', onClick && 'pb-stat--interactive', tone && `pb-stat--${tone}`, negative && tone !== 'negative' && 'pb-stat--negative', className);
  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {content}
        <Icon name="chevron-right" />
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}
