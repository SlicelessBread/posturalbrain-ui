import { Button, Row, Stack } from '../src';

export const card = { group: 'Azioni', height: 420, subtitle: 'Principale, secondario, discreto, distruttivo; piccolo, a tutta larghezza, in attesa, disabilitato' };

export default function Example() {
  return (
    <Stack>
      <Row>
        <Button variant="primary">Salva percorso</Button>
        <Button>Annulla</Button>
        <Button variant="ghost">Vedi tutte</Button>
      </Row>
      <Row>
        <Button variant="primary" icon="plus">Aggiungi paziente</Button>
        <Button variant="danger" icon="trash-2">Elimina</Button>
      </Row>
      <Row>
        <Button size="small">Oggi</Button>
        <Button size="small" variant="primary">Segna pagata</Button>
        <Button variant="primary" loading>Salvataggio…</Button>
        <Button variant="primary" disabled>Pubblica</Button>
      </Row>
      <Button variant="primary" block>Entra</Button>
    </Stack>
  );
}
