import { DateField, Stack } from '../src';

export const card = { group: 'Moduli', height: 240, subtitle: 'Data di inizio; data con errore' };

export default function Example() {
  return (
    <Stack>
      <DateField label="Inizio del percorso" defaultValue="2026-11-14" help="Finisce il 14 maggio 2027." />
      <DateField label="Scadenza della seconda rata" defaultValue="2026-10-01" error="La rata scade prima dell'inizio del percorso." />
    </Stack>
  );
}
