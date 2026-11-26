import { YearBars } from '../src';

export const card = { group: 'Cifre', height: 300, subtitle: 'Dodici mesi, mese corrente in evidenza, un mese a zero' };

export default function Example() {
  return (
    <YearBars
      title="Guadagno netto 2026"
      total={'38.420,00 €'}
      max={5400}
      bars={[
        { label: 'G', value: 2810, description: 'Gennaio 2.810,00 €' },
        { label: 'F', value: 3290, description: 'Febbraio 3.290,00 €' },
        { label: 'M', value: 4000, description: 'Marzo 4.000,00 €' },
        { label: 'A', value: 3780, description: 'Aprile 3.780,00 €' },
        { label: 'M', value: 4430, description: 'Maggio 4.430,00 €' },
        { label: 'G', value: 4860, description: 'Giugno 4.860,00 €' },
        { label: 'L', value: 3560, description: 'Luglio 3.560,00 €' },
        { label: 'A', value: 0, description: 'Agosto 0,00 €' },
        { label: 'S', value: 3130, description: 'Settembre 3.130,00 €' },
        { label: 'O', value: 4474, description: 'Ottobre 4.474,00 €' },
        { label: 'N', value: 4086, description: 'Novembre, mese in corso, 4.086,00 €', state: 'current' },
        { label: 'D', value: 0, description: 'Dicembre, non ancora iniziato', state: 'future' },
      ]}
    />
  );
}
