import type { CSSProperties, ElementType, ReactElement } from 'react';
import type { IconName } from './icons.generated';

/** An icon by name (drawn at the size the component fixes) or any element of your own. */
export type IconInput = IconName | ReactElement;

/** The component that draws a link, for example Next's `Link`. Defaults to a plain `<a>`. */
export type LinkAs = ElementType;

/** Inline style that may carry the custom properties the stylesheet reads, such as `--value`. */
export type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>;
