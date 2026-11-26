import { MoneyField, Stack } from '../src';

export const card = { group: 'Moduli', height: 240, subtitle: 'Importo in euro; con aiuto' };

export default function Example() {
  return (
    <Stack>
      <MoneyField label="Costo totale del percorso" defaultValue="900,00" />
      <MoneyField label="Stipendio di novembre 2026" placeholder="1.200,00" help="Vale anche per i mesi dopo, finché non lo cambi." />
    </Stack>
  );
}
