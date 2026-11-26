import { Button, Frame, MoneyField, Sheet, Skeleton, Stack, TextField } from '../src';

export const card = { group: 'Finestre', height: 600, subtitle: 'Foglio dal basso con modulo e azione: chiudilo e riaprilo' };

const noop = () => {};

// The preview is static markup: this stands in for the component, which closes the sheet when its exit has ended.
export const script = `
  // Demo only: opens and closes the sheet drawn in this preview.
  const sheet = document.querySelector('.pb-sheet');
  const veil = document.querySelector('.pb-sheet-backdrop');
  const ended = (el) => Promise.all(el.getAnimations().map((a) => a.finished.catch(() => {})));
  const close = async () => {
    sheet.setAttribute('data-closing', '');
    veil.setAttribute('data-closing', '');
    await Promise.all([ended(sheet), ended(veil)]);
    sheet.removeAttribute('open');
    veil.hidden = true;
    sheet.removeAttribute('data-closing');
    veil.removeAttribute('data-closing');
  };
  sheet.querySelector('.pb-sheet__head button').addEventListener('click', close);
  sheet.querySelector('.pb-sheet__actions button').addEventListener('click', close);
  document.querySelector('[data-demo-open]').addEventListener('click', () => {
    veil.hidden = false;
    sheet.setAttribute('open', '');
  });
`;

export default function Example() {
  return (
    <Frame style={{ minHeight: '560px' }}>
      <Stack style={{ padding: 'var(--space-4)' }}>
        <Button data-demo-open>Apri il foglio</Button>
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
