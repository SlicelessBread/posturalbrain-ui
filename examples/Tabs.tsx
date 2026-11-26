import { Stack, Tabs } from '../src';

export const card = { group: 'Navigazione', height: 180, subtitle: 'Due linguette; molte linguette che scorrono: tocca per provare' };

// The preview is static markup: this stands in for the state the app keeps.
export const script = `
  // Demo only: chooses the tab that is tapped.
  document.querySelectorAll('.pb-tabs').forEach((tabs) => {
    tabs.addEventListener('click', (event) => {
      const chosen = event.target.closest('[role="tab"]');
      if (!chosen) return;
      [...tabs.children].forEach((tab) => {
        tab.setAttribute('aria-selected', String(tab === chosen));
        tab.tabIndex = tab === chosen ? 0 : -1;
      });
    });
  });
`;

export default function Example() {
  return (
    <Stack>
      <Tabs label="Video" value="assegnati" tabs={[{ value: 'assegnati', label: 'Assegnati' }, { value: 'preferiti', label: 'Preferiti' }]} />
      <Tabs
        label="Scheda paziente"
        value="percorsi"
        tabs={[
          { value: 'dati', label: 'Dati' },
          { value: 'percorsi', label: 'Percorsi' },
          { value: 'rate', label: 'Rate' },
          { value: 'video', label: 'Video assegnati' },
          { value: 'note', label: 'Note' },
        ]}
      />
    </Stack>
  );
}
