import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';
import { LinkOr } from '../LinkOr';
import type { LinkAs } from '../types';

type ListRowProps = {
  title: ReactNode;
  meta?: ReactNode;
  /** A `Badge` under the meta line. */
  status?: ReactNode;
  /** Usually an `Avatar`. */
  avatar?: ReactNode;
  /** What closes the row; a chevron when the row is a link. */
  trail?: ReactNode;
  /** With `href` the whole row is a link, drawn with `as`. */
  href?: string;
  as?: LinkAs;
  className?: string;
};

/** One row of a `List`. It draws its own `<li>`. */
export function ListRow({ title, meta, status, avatar, trail, href, as, className }: ListRowProps) {
  const end = trail ?? (href !== undefined ? <Icon name="chevron-right" /> : null);
  return (
    <li>
      <LinkOr className={cx('pb-list-row', className)} href={href} as={as}>
        {avatar}
        <span className="pb-list-row__body">
          <span className="pb-list-row__title text-body-strong">{title}</span>
          {meta ? <span className="pb-list-row__meta text-label">{meta}</span> : null}
          {status ? <span className="pb-list-row__status">{status}</span> : null}
        </span>
        {end ? <span className="pb-list-row__trail">{end}</span> : null}
      </LinkOr>
    </li>
  );
}
