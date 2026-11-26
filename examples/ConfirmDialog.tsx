import { ConfirmDialog, Frame } from '../src';

export const card = { group: 'Finestre', height: 400, subtitle: "Conferma di un'azione che non si può annullare" };

// A preview is static markup: the dialog is drawn in place and its buttons do nothing.
const noop = () => {};

export default function Example() {
  return (
    <Frame style={{ minHeight: '360px' }}>
      <ConfirmDialog open modal={false} onCancel={noop} onConfirm={noop} title="Eliminare Paolo Rinaldi?" confirmLabel="Elimina" confirmIcon="trash-2">
        Verranno eliminati anche i suoi 2 percorsi e le 6 rate registrate. Non si può annullare.
      </ConfirmDialog>
    </Frame>
  );
}
