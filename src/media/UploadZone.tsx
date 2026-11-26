'use client';

import { useState, type ChangeEvent, type DragEvent, type ReactNode } from 'react';
import { cx } from '../cx';
import { Progress } from '../feedback/Progress';
import { Icon } from '../Icon';
import type { IconName } from '../icons.generated';

type UploadZoneProps = {
  /** `idle`: waiting for a file. The other three show the file being handled. */
  status: 'idle' | 'uploading' | 'done' | 'error';
  /** What to do, while idle ("Scegli un video"). */
  title: ReactNode;
  /** Accepted formats and size, while idle. */
  hint?: ReactNode;
  /** Shown instead of the title while a file is dragged over the zone. */
  dropTitle?: ReactNode;
  /** The `accept` of the file input ("video/mp4,video/quicktime"). */
  accept?: string;
  /** A file was chosen or dropped. A dropped file is not filtered by `accept`: check its type and size here. */
  onFile?: (file: File) => void;
  /** The name of the file; or, in the `error` status, what went wrong. */
  name?: ReactNode;
  /** Size, progress in words, or how to recover. */
  detail?: ReactNode;
  /** Share uploaded, from 0 to 1. Without it the bar shows activity only. */
  progress?: number;
  progressLabel?: string;
  /** The button of the current status: cancel, replace, retry. */
  action?: ReactNode;
  /** Forces the drop-target look (documentation, tests). */
  dragging?: boolean;
  className?: string;
};

const ICONS: Record<Exclude<UploadZoneProps['status'], 'idle'>, IconName> = { uploading: 'film', done: 'circle-check', error: 'circle-alert' };

/** Where a file is chosen, and where its upload is followed to the end. */
export function UploadZone({ status, title, hint, dropTitle, accept, onFile, name, detail, progress, progressLabel = 'Caricamento', action, dragging, className }: UploadZoneProps) {
  const [over, setOver] = useState(false);

  if (status !== 'idle') {
    return (
      // The zone the person was using is replaced: say what happened to the file.
      <div className={cx('pb-upload', `pb-upload--${status}`, className)} role={status === 'error' ? 'alert' : 'status'}>
        <div className="pb-upload__file">
          <span className="pb-upload__icon" aria-hidden="true"><Icon name={ICONS[status]} /></span>
          <span className="pb-upload__name">
            <strong className="text-body-strong">{name}</strong>
            {detail ? <span className={cx('text-label', 'pb-muted', status !== 'error' && 'pb-num')}>{detail}</span> : null}
          </span>
          {action}
        </div>
        {status === 'uploading' ? <Progress label={progressLabel} value={progress === undefined ? undefined : progress * 100} /> : null}
      </div>
    );
  }

  const target = dragging ?? over;

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Empty the input, so choosing the same file again is reported again.
    event.target.value = '';
    if (file) onFile?.(file);
  }

  function onDragOver(event: DragEvent<HTMLLabelElement>) {
    // Without this the browser opens the dropped file instead of handing it over.
    event.preventDefault();
    setOver(true);
  }

  function onDragLeave(event: DragEvent<HTMLLabelElement>) {
    // Moving onto a child of the zone is not leaving it.
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    setOver(false);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setOver(false);
    const file = event.dataTransfer.files[0];
    if (file) onFile?.(file);
  }

  return (
    <label className={cx('pb-upload', target ? 'pb-upload--dragging' : 'pb-upload--idle', className)} onDragEnter={onDragOver} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      {/* data-pb-compact: the input is hidden, the whole zone is the tap target. */}
      <input className="pb-sr-only" type="file" accept={accept} data-pb-compact="" onChange={onChange} />
      <span className="pb-upload__icon" aria-hidden="true"><Icon name="upload" /></span>
      <strong className="text-body-strong">{target ? (dropTitle ?? title) : title}</strong>
      {hint && !target ? <span className="text-label pb-muted">{hint}</span> : null}
    </label>
  );
}
