import { IconButton, Row } from '../src';

export const card = { group: 'Azioni', height: 120, subtitle: 'Semplice, principale, discreto, con punto di notifica; cifre nascoste' };

export default function Example() {
  return (
    <Row>
      <IconButton label="Notifiche" icon="bell" dot />
      <IconButton label="Aggiungi paziente" icon="plus" variant="primary" />
      <IconButton label="Nascondi le cifre" icon="eye" />
      <IconButton label="Mostra le cifre" icon="eye-off" aria-pressed="true" />
      <IconButton label="Chiudi" icon="x" variant="ghost" />
      <IconButton label="Indietro" icon="chevron-left" variant="ghost" />
    </Row>
  );
}
