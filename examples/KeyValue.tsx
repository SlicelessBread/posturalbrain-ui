import { KeyValue } from '../src';

export const card = { group: 'Superfici e liste', height: 280, subtitle: 'Dati di una scheda' };

export default function Example() {
  return (
    <KeyValue
      items={[
        { label: 'Data di nascita', value: '12/03/1984 · 42 anni' },
        { label: 'Collaboratore', value: 'Luca Ferri' },
        { label: 'Percorso', value: 'Semestrale, dal 14/11/2026 al 14/05/2027' },
        { label: 'Totale', value: '900,00 €', numeric: true },
        { label: 'Già incassato', value: '300,00 €', numeric: true },
      ]}
    />
  );
}
