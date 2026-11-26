import { BottomNav, Frame, Stack } from '../src';

export const card = { group: 'Navigazione', height: 260, subtitle: 'Tre e cinque voci' };

const frame = { minHeight: 'calc(var(--nav-h) + 2px)' };

export default function Example() {
  return (
    <Stack>
      <Frame style={frame}>
        <BottomNav
          items={[
            { href: '#', label: 'Pazienti', icon: 'users' },
            { href: '#', label: 'Home', icon: 'house', current: true },
            { href: '#', label: 'Calendario', icon: 'calendar-days' },
          ]}
        />
      </Frame>
      <Frame style={frame}>
        <BottomNav
          items={[
            { href: '#', label: 'Video', icon: 'play', current: true },
            { href: '#', label: 'Preferiti', icon: 'heart' },
            { href: '#', label: 'Programma', icon: 'calendar-days' },
            { href: '#', label: 'Avvisi', icon: 'bell' },
            { href: '#', label: 'Profilo', icon: 'user' },
          ]}
        />
      </Frame>
    </Stack>
  );
}
