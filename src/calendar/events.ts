import type { IconName } from '../icons.generated';

/** The kinds of things a calendar shows: a course starting or ending, an instalment due or paid, a scheduled post. */
export type EventKind = 'start' | 'end' | 'due' | 'paid' | 'post';

export const EVENT_KINDS: readonly EventKind[] = ['start', 'end', 'due', 'paid', 'post'];

/** The icon of each kind: the kind is never told by colour alone. */
export const EVENT_ICONS: Record<EventKind, IconName> = { start: 'play', end: 'flag', due: 'euro', paid: 'check', post: 'send' };

export const EVENT_LABELS: Record<EventKind, string> = { start: 'Inizio', end: 'Fine', due: 'Rata', paid: 'Pagata', post: 'Post' };
