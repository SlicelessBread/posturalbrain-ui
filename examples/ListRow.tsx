import { Avatar, Badge, List, ListRow } from '../src';

export const card = { group: 'Superfici e liste', height: 420, subtitle: 'Con avatar, meta, stato; nome lungo' };

export default function Example() {
  return (
    <List>
      <ListRow href="#" avatar={<Avatar>AC</Avatar>} title="Anna Colombo" meta="Semestrale · rata il 28 novembre" />
      <ListRow
        href="#"
        avatar={<Avatar>MD</Avatar>}
        title="Maria Antonietta Degli Esposti-Bianchi"
        meta="Annuale · seguita da Luca Ferri · prossima rata il 3 dicembre"
        status={<Badge tone="warn" icon="clock">In scadenza</Badge>}
      />
      <ListRow href="#" avatar={<Avatar>PR</Avatar>} title="Paolo Rinaldi" meta="Nessun percorso attivo" />
    </List>
  );
}
