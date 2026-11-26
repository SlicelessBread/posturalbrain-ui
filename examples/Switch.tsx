import { List, Switch } from '../src';

export const card = { group: 'Moduli', height: 240, subtitle: 'Acceso, spento, disabilitato' };

export default function Example() {
  return (
    <List as="div">
      <Switch checked label="Notifiche sul telefono" description="Ogni mattina, per rate e percorsi in scadenza." />
      <Switch checked={false} label="Email del mattino" />
      <Switch checked={false} disabled label="Entra con Face ID" description="Non disponibile su questo dispositivo." />
    </List>
  );
}
