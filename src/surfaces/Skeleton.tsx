import { cx } from '../cx';

type SkeletonProps = { shape?: 'text' | 'block' | 'circle'; width?: string; height?: string; className?: string };

/**
 * The outline of content that is loading. Put the outlines in a container with `aria-busy="true"`
 * and a `pb-sr-only` sentence: the outlines themselves say nothing.
 */
export function Skeleton({ shape = 'text', width, height, className }: SkeletonProps) {
  const Tag = shape === 'block' ? 'div' : 'span';
  return <Tag className={cx('pb-skeleton', `pb-skeleton--${shape}`, className)} style={width || height ? { width, height } : undefined} />;
}
