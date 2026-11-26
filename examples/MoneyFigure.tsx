import { MoneyFigure, Stack } from '../src';

export const card = { group: 'Cifre', height: 380, subtitle: 'In crescita, in calo, negativa' };

export default function Example() {
  return (
    <Stack gap="loose">
      <MoneyFigure label="Guadagno netto di novembre" value={'4.086,00 €'} trend="up" delta={'+320,00 € rispetto a ottobre'} />
      <MoneyFigure label="Incassato nel 2026" value={'52.300,00 €'} trend="down" delta={'−1.150,00 € rispetto al 2025'} />
      <MoneyFigure negative label="Guadagno netto di agosto" value={'−412,50 €'} delta="Studio chiuso tre settimane" />
    </Stack>
  );
}
