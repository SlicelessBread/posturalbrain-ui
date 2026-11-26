import type { ReactNode } from 'react';
import { IconButton } from '../actions/IconButton';
import { cx } from '../cx';
import { Icon } from '../Icon';
import type { LinkAs } from '../types';

type VideoCardProps = {
  title: string;
  meta?: ReactNode;
  /** Already formatted ("4:32"). */
  duration?: string;
  /** Where the video plays. */
  href: string;
  /** The component that draws the link, for example Next's `Link`. */
  linkAs?: LinkAs;
  /** The still of the video, usually an `<img alt="">`: the title already names it. */
  thumbnail?: ReactNode;
  /** Whether the video is among the favourites. Leave it out to hide the heart. */
  favourite?: boolean;
  onToggleFavourite?: () => void;
  /** Thumbnail on the left and text on the right, for lists. */
  row?: boolean;
  labels?: { watch?: (title: string) => string; favourite?: (title: string) => string };
  className?: string;
};

/** A video in a library: its still, its title and whether it is a favourite. */
export function VideoCard({ title, meta, duration, href, linkAs: Link = 'a', thumbnail, favourite, onToggleFavourite, row, labels, className }: VideoCardProps) {
  return (
    <article className={cx('pb-video-card', row && 'pb-video-card--row', className)}>
      <Link className="pb-video-card__thumb" href={href} aria-label={labels?.watch ? labels.watch(title) : `Guarda: ${title}`}>
        {thumbnail}
        <span className="pb-video-card__play" aria-hidden="true"><Icon name="play" /></span>
        {duration ? <span className="pb-video-card__duration pb-num">{duration}</span> : null}
      </Link>
      <div className="pb-video-card__body">
        <h3 className="pb-video-card__title text-body-strong">{title}</h3>
        {meta ? <p className="pb-video-card__meta text-label">{meta}</p> : null}
      </div>
      {favourite !== undefined ? (
        <IconButton
          className="pb-video-card__fav"
          variant="ghost"
          icon="heart"
          aria-pressed={favourite}
          // One fixed name: the pressed state says whether it is a favourite, the title says which video.
          label={labels?.favourite ? labels.favourite(title) : `Nei preferiti: ${title}`}
          onClick={onToggleFavourite}
        />
      ) : null}
    </article>
  );
}
