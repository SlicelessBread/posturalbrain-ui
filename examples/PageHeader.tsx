import { Button, IconButton, PageHeader, Stack } from '../src';

export const card = { group: 'Navigazione', height: 300, subtitle: 'Titolo con azione; con ritorno indietro e sottotitolo' };

export default function Example() {
  return (
    <Stack gap="loose">
      <PageHeader title="Pazienti" subtitle="24 attivi su 31">
        <IconButton variant="primary" icon="plus" label="Aggiungi paziente" />
      </PageHeader>
      <PageHeader title="Maria Antonietta Degli Esposti-Bianchi" subtitle="Percorso semestrale · fino al 14 maggio" back={{ href: '#', label: 'Torna ai pazienti' }}>
        <Button size="small">Modifica</Button>
      </PageHeader>
    </Stack>
  );
}
