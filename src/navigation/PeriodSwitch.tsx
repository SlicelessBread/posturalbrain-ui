import type { ReactNode } from 'react';
import { Button } from '../actions/Button';
import { IconButton } from '../actions/IconButton';
import { cx } from '../cx';

type PeriodSwitchProps = {
  /** The period shown, already written out ("Novembre 2026", "30 nov – 6 dic"). */
  label: ReactNode;
  sublabel?: ReactNode;
  /** What the arrows do, for assistive technology ("Mese precedente"). */
  prevLabel: string;
  nextLabel: string;
  onPrev?: () => void;
  onNext?: () => void;
  /** The week layout: label on the left and a button that returns to today. */
  week?: boolean;
  onToday?: () => void;
  todayLabel?: string;
  className?: string;
};

/** Moves a screen from one month or week to the next. The new period is announced when it changes. */
export function PeriodSwitch({ label, sublabel, prevLabel, nextLabel, onPrev, onNext, week, onToday, todayLabel = 'Oggi', className }: PeriodSwitchProps) {
  return (
    <div className={cx('pb-period', week && 'pb-period--week', className)}>
      <IconButton variant="ghost" icon="chevron-left" label={prevLabel} onClick={onPrev} />
      <div className="pb-period__label" aria-live="polite">
        <strong className="text-body-strong">{label}</strong>
        {sublabel ? <span className="text-caption pb-subtle">{sublabel}</span> : null}
      </div>
      <IconButton variant="ghost" icon="chevron-right" label={nextLabel} onClick={onNext} />
      {week ? <Button size="small" onClick={onToday}>{todayLabel}</Button> : null}
    </div>
  );
}
