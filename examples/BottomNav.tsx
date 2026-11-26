import { BottomNav, Frame, Stack } from '../src';

export const card = { group: 'Navigazione', height: 260, subtitle: 'Tre e cinque voci: tocca per provare' };

// The preview is static markup: this stands in for the navigation of the app.
export const script = `
  // Demo only: marks the destination that is tapped as the current one.
  document.querySelectorAll('.pb-bottomnav').forEach((nav) => {
    nav.addEventListener('click', (event) => {
      const chosen = event.target.closest('a');
      if (!chosen) return;
      event.preventDefault();
      [...nav.children].forEach((link) => (link === chosen ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current')));
      nav.style.setProperty('--pb-index', [...nav.children].indexOf(chosen));
    });
  });
`;

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
