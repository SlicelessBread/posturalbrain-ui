import { Stack, StatCard } from '../src';

export const card = { group: 'Superfici e liste', height: 760, subtitle: 'Con icona e nota; toccabile; negativo; in evidenza; in evidenza e in perdita; in attesa del mese nuovo' };

// A preview is static markup: the handler only makes the card a button.
const open = () => {};

export default function Example() {
  return (
    <Stack gap="tight">
      <StatCard icon="wallet" label="Fatturato mensile lordo" value={'6.480,00 €'} hint="12 rate previste a novembre" />
      <StatCard icon="megaphone" label="Spese per pubblicità" value={'350,00 €'} hint="Tocca per modificare" onClick={open} />
      <StatCard icon="trending-down" tone="negative" label="Guadagno netto di agosto" value={'−412,50 €'} hint="In perdita: spese superiori agli incassi" />
      <StatCard icon="trending-up" tone="highlight" label="Guadagno netto mensile" value={'4.086,00 €'} hint="Incassato meno collaboratori e pubblicità" />
      <StatCard icon="trending-down" tone="highlight" negative label="Guadagno netto mensile" value={'−412,50 €'} hint="In perdita: spese superiori agli incassi" />
      <div className="pb-stale" aria-busy="true">
        <StatCard icon="wallet" label="Stipendio di ottobre 2026" value={'1.200,00 €'} hint="Il mese di prima, mentre arriva quello scelto" />
      </div>
    </Stack>
  );
}
