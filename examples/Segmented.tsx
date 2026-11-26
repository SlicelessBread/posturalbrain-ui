import { Segmented, Stack } from '../src';

export const card = { group: 'Azioni', height: 200, subtitle: 'Due e tre scelte: tocca per provare' };

// The preview is static markup: this stands in for the state the app keeps.
export const script = `
  // Demo only: chooses the option that is tapped.
  document.querySelectorAll('.pb-segmented').forEach((group) => {
    group.addEventListener('click', (event) => {
      const chosen = event.target.closest('button');
      if (!chosen) return;
      [...group.children].forEach((option) => option.setAttribute('aria-pressed', String(option === chosen)));
      group.style.setProperty('--pb-index', [...group.children].indexOf(chosen));
    });
  });
`;

export default function Example() {
  return (
    <Stack>
      <Segmented label="Vista dei post" value="lista" options={[{ value: 'lista', label: 'Lista' }, { value: 'calendario', label: 'Calendario' }]} />
      <Segmented
        label="Durata del percorso"
        value="semestrale"
        options={[{ value: 'trimestrale', label: 'Trimestrale' }, { value: 'semestrale', label: 'Semestrale' }, { value: 'annuale', label: 'Annuale' }]}
      />
    </Stack>
  );
}
