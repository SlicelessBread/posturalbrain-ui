import { Stack, Tabs } from '../src';

export const card = { group: 'Navigazione', height: 180, subtitle: 'Due linguette; molte linguette che scorrono' };

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
