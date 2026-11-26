'use client';

import { useId, type ReactNode } from 'react';
import { Segmented } from '../actions/Segmented';
import type { ThemeChoice } from '../theme/theme';
import { useTheme } from '../theme/useTheme';

const LABELS: Record<ThemeChoice, string> = { auto: 'Automatico', light: 'Chiaro', dark: 'Scuro' };

type ThemeSwitchProps = { label?: ReactNode; hint?: ReactNode; labels?: Partial<Record<ThemeChoice, string>> };

/** Lets the person choose the theme; the choice is remembered on the device. */
export function ThemeSwitch({ label = 'Tema', hint = "Automatico segue l'impostazione del telefono.", labels }: ThemeSwitchProps) {
  const { choice, setChoice } = useTheme();
  const id = useId();
  const names = { ...LABELS, ...labels };
  return (
    <div className="pb-theme-switch">
      <span id={id} className="text-body-strong">{label}</span>
      <Segmented<ThemeChoice>
        labelledBy={id}
        value={choice}
        onChange={setChoice}
        options={[
          { value: 'auto', label: names.auto },
          { value: 'light', label: names.light },
          { value: 'dark', label: names.dark },
        ]}
      />
      {hint ? <span className="text-caption pb-subtle">{hint}</span> : null}
    </div>
  );
}
