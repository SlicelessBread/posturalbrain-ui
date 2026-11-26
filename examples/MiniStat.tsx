import { Grid2, MiniStat, Stack } from '../src';

export const card = { group: 'Superfici e liste', height: 280, subtitle: 'Affiancate; con cifra lunga e negativa' };

export default function Example() {
  return (
    <Stack>
      <Grid2>
        <MiniStat value="24" label="Pazienti attivi" />
        <MiniStat value="3" label="Scadenze entro 7 giorni" />
      </Grid2>
      <Grid2>
        <MiniStat value={'58.940,00 €'} label="Lordo 2026, fino a novembre" />
        <MiniStat negative value={'−12.345,67 €'} label="Spese 2026, fino a novembre" />
      </Grid2>
    </Stack>
  );
}
