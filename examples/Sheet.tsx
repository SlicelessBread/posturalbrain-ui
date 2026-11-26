import { Button, Frame, MoneyField, Sheet, Skeleton, Stack, TextField } from '../src';

export const card = { group: 'Finestre', height: 600, subtitle: 'Foglio dal basso con modulo e azione' };

// A preview is static markup: the sheet is drawn in place and never closes.
const noop = () => {};

export default function Example() {
  return (
    <Frame style={{ minHeight: '560px' }}>
      <Stack style={{ padding: 'var(--space-4)' }} aria-hidden="true">
        <Skeleton shape="block" height="64px" />
        <Skeleton shape="block" height="64px" />
      </Stack>
      <Sheet open modal={false} onClose={noop} title="Aggiungi collaboratore" actions={<Button variant="primary" block>Aggiungi collaboratore</Button>}>
        <TextField label="Nome e cognome" defaultValue="Sara Conti" autoComplete="off" />
        <MoneyField label="Stipendio mensile" defaultValue="400,00" help="Da novembre 2026 in poi. Puoi cambiarlo mese per mese." />
      </Sheet>
    </Frame>
  );
}
