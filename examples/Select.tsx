import { Select, Stack } from '../src';

export const card = { group: 'Moduli', height: 220, subtitle: 'Scelta da un elenco di voci note' };

export default function Example() {
  return (
    <Stack>
      <Select label="Collaboratore che segue il paziente" defaultValue="Luca Ferri">
        <option>Marco Riva</option>
        <option>Luca Ferri</option>
        <option>Sara Conti</option>
      </Select>
      <Select label="Numero di rate" defaultValue="3 rate">
        <option>1 rata</option>
        <option>2 rate</option>
        <option>3 rate</option>
        <option>6 rate</option>
      </Select>
    </Stack>
  );
}
