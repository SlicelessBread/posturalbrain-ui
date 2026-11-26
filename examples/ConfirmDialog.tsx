import { Button, ConfirmDialog, Frame, Stack } from '../src';

export const card = { group: 'Finestre', height: 400, subtitle: "Conferma di un'azione che non si può annullare: annulla e riapri" };

const noop = () => {};

// The preview is static markup: this stands in for the component, which closes the dialog when its exit has ended.
export const script = `
  // Demo only: opens and closes the dialog drawn in this preview.
  const dialog = document.querySelector('.pb-dialog');
  const veil = document.querySelector('.pb-sheet-backdrop');
  const ended = (el) => Promise.all(el.getAnimations().map((a) => a.finished.catch(() => {})));
  const close = async () => {
    dialog.setAttribute('data-closing', '');
    veil.setAttribute('data-closing', '');
    await Promise.all([ended(dialog), ended(veil)]);
    dialog.removeAttribute('open');
    veil.hidden = true;
    dialog.removeAttribute('data-closing');
    veil.removeAttribute('data-closing');
  };
  dialog.querySelectorAll('.pb-dialog__actions button').forEach((button) => button.addEventListener('click', close));
  document.querySelector('[data-demo-open]').addEventListener('click', () => {
    veil.hidden = false;
    dialog.setAttribute('open', '');
  });
`;

export default function Example() {
  return (
    <Frame style={{ minHeight: '360px' }}>
      <Stack style={{ padding: 'var(--space-4)' }}>
        <Button variant="danger" icon="trash-2" data-demo-open>Elimina paziente</Button>
      </Stack>
      <ConfirmDialog open modal={false} onCancel={noop} onConfirm={noop} title="Eliminare Paolo Rinaldi?" confirmLabel="Elimina" confirmIcon="trash-2">
        Verranno eliminati anche i suoi 2 percorsi e le 6 rate registrate. Non si può annullare.
      </ConfirmDialog>
    </Frame>
  );
}
