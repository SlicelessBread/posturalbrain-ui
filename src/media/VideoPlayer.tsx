import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Spinner } from '../feedback/Spinner';
import { Icon } from '../Icon';

type VideoPlayerProps = {
  title?: ReactNode;
  meta?: ReactNode;
  /** Already formatted ("4:32"); shown with the play button, before the video starts. */
  duration?: string;
  state?: 'ready' | 'loading' | 'error';
  /** A 9:16 frame instead of 16:9. */
  portrait?: boolean;
  /** The play button of the placeholder was pressed. */
  onPlay?: () => void;
  /** What to say when the video cannot be played. */
  errorMessage?: ReactNode;
  /** The real `<video controls>`: it fills the frame in place of the placeholder. */
  children?: ReactNode;
  labels?: { play?: string; loading?: string };
  className?: string;
};

/** The frame a video plays in, with its caption. The playback controls are the browser's own. */
export function VideoPlayer({ title, meta, duration, state = 'ready', portrait, onPlay, errorMessage = 'Il video non è disponibile.', children, labels, className }: VideoPlayerProps) {
  let content: ReactNode;
  if (state === 'error') {
    content = (
      <span className="pb-player__message">
        <Icon name="circle-alert" />
        <span className="text-label">{errorMessage}</span>
      </span>
    );
  } else {
    content = (
      <>
        {children}
        {state === 'loading' ? <Spinner size="lg" className="pb-player__spinner" label={labels?.loading ?? 'Caricamento del video'} /> : null}
        {state === 'ready' && !children ? (
          <>
            <button className="pb-player__play" type="button" aria-label={labels?.play ?? 'Riproduci'} onClick={onPlay}>
              <Icon name="play" size="lg" />
            </button>
            {duration ? <span className="pb-player__duration pb-num">{duration}</span> : null}
          </>
        ) : null}
      </>
    );
  }
  return (
    <figure className={cx('pb-player', portrait && 'pb-player--portrait', className)}>
      <div className={cx('pb-player__frame', state === 'error' && 'pb-player__frame--error')}>{content}</div>
      {title || meta ? (
        <figcaption className="pb-player__caption">
          {title ? <span className="text-section">{title}</span> : null}
          {meta ? <span className="text-label pb-muted">{meta}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
