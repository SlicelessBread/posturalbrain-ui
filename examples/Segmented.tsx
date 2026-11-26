import { Segmented, Stack } from '../src';

export const card = { group: 'Azioni', height: 200, subtitle: 'Due e tre scelte' };

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
