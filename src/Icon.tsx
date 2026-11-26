import type { ReactNode } from 'react';
import { cx } from './cx';
import { ICONS, type IconName } from './icons.generated';
import type { IconInput } from './types';

export type IconSize = 'sm' | 'lg';

/** A line icon that takes the colour of the text around it. Decorative: hidden from assistive technology. */
export function Icon({ name, size, className }: { name: IconName; size?: IconSize; className?: string }) {
  return (
    <svg
      className={cx('pb-icon', size && `pb-icon--${size}`, className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      // The markup comes from the icon files of this package, never from a caller.
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? '' }}
    />
  );
}

/** Draws an icon given by name at `size`; an element is returned as it is. */
export function renderIcon(icon: IconInput | undefined, size?: IconSize): ReactNode {
  if (icon === undefined) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}
