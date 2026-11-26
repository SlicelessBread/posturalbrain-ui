import { Button, EmptyState } from '../src';

export const card = { group: 'Superfici e liste', height: 300, subtitle: 'Elenco vuoto con azione' };

export default function Example() {
  return (
    <EmptyState icon="users" title="Ancora nessun paziente" action={<Button variant="primary" icon="plus">Aggiungi paziente</Button>}>
      Aggiungi il primo paziente per registrare il suo percorso e le rate.
    </EmptyState>
  );
}
