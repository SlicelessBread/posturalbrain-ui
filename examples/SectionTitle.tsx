import { Button, SectionTitle, Stack } from '../src';

export const card = { group: 'Superfici e liste', height: 200, subtitle: 'Semplice, con azione, con conteggio' };

export default function Example() {
  return (
    <Stack gap="loose">
      <SectionTitle>Money management</SectionTitle>
      <SectionTitle action={<Button size="small" variant="ghost" href="#">Vedi tutte</Button>}>Scadenze entro 7 giorni</SectionTitle>
      <SectionTitle count={12}>Video assegnati</SectionTitle>
    </Stack>
  );
}
