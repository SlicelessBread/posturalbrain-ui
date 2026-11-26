import { Checkbox, Stack } from '../src';

export const card = { group: 'Moduli', height: 240, subtitle: 'Spuntata, non spuntata, disabilitata' };

export default function Example() {
  return (
    <Stack gap="tight">
      <Checkbox label="Rinnovo del percorso precedente" defaultChecked />
      <Checkbox label="Usa una descrizione diversa per ogni piattaforma" />
      <Checkbox label="Rata già pagata" description="Segna la data di oggi come giorno dell'incasso." />
      <Checkbox label="Facebook (account non collegato)" disabled />
    </Stack>
  );
}
