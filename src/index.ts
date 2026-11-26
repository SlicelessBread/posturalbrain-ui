// Single entry point. No "use client" here: each file that needs the browser declares it itself,
// so everything else stays usable from Server Components. Named re-exports only.
export { cx } from './cx';
export { fraction } from './fraction';
export { Icon, renderIcon } from './Icon';
export type { IconSize } from './Icon';
export { ICONS } from './icons.generated';
export type { IconName } from './icons.generated';
export type { IconInput, LinkAs, StyleWithVars } from './types';

export { Stack } from './layout/Stack';
export { Row } from './layout/Row';
export { Grid2 } from './layout/Grid2';
export { Page } from './layout/Page';
export { Frame } from './layout/Frame';
export { List } from './layout/List';

export { Button } from './actions/Button';
export type { ButtonProps } from './actions/Button';
export { IconButton } from './actions/IconButton';
export type { IconButtonProps } from './actions/IconButton';
export { Chip } from './actions/Chip';
export type { ChipProps } from './actions/Chip';
export { Dot } from './actions/Dot';
export { Segmented } from './actions/Segmented';
export type { SegmentedProps } from './actions/Segmented';

export { ThemeSwitch } from './access/ThemeSwitch';

export { applyThemeChoice, parseChoice, resolveTheme, themeScript, THEME_STORAGE_KEY } from './theme/theme';
export type { Theme, ThemeChoice } from './theme/theme';
export { THEME_COLORS } from './theme/colors.generated';
export { ThemeScript } from './theme/ThemeScript';
export { useTheme } from './theme/useTheme';
