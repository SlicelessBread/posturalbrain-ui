import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput, LinkAs } from '../types';

export type BottomNavItem = { href: string; label: string; icon: IconInput; current?: boolean };

type BottomNavProps = {
  /** Three to five destinations. */
  items: BottomNavItem[];
  /** Name of the navigation for assistive technology. */
  label?: string;
  /** The component that draws each link, for example Next's `Link`. */
  linkAs?: LinkAs;
  className?: string;
};

/** The sections of an app, always within reach of the thumb. */
export function BottomNav({ items, label = 'Sezioni', linkAs: Link = 'a', className }: BottomNavProps) {
  return (
    <nav className={cx('pb-bottomnav', className)} aria-label={label}>
      {items.map((item, index) => (
        <Link key={index} href={item.href} aria-current={item.current ? 'page' : undefined}>
          {renderIcon(item.icon)}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
