import { Stack, StatCard } from '../src';

export const card = { group: 'Superfici e liste', height: 520, subtitle: 'Con icona e nota; in evidenza; negativo; toccabile' };

// A preview is static markup: the handler only makes the card a button.
const open = () => {};

export default function Example() {
  return (
    <Stack gap="tight">
      <StatCard icon="wallet" label="Fatturato mensile lordo" value={'6.480,00 €'} hint="12 rate previste a novembre" />
      <StatCard icon="megaphone" label="Spese per pubblicità" value={'350,00 €'} hint="Tocca per modificare" onClick={open} />
      <StatCard icon="trending-down" tone="negative" label="Guadagno netto di agosto" value={'−412,50 €'} hint="In perdita: spese superiori agli incassi" />
      <StatCard icon="trending-up" tone="highlight" label="Guadagno netto mensile" value={'4.086,00 €'} hint="Incassato meno collaboratori e pubblicità" />
    </Stack>
  );
}
