import { SearchField, Stack } from '../src';

export const card = { group: 'Moduli', height: 200, subtitle: 'Vuoto; con testo e pulsante per cancellare' };

// A preview is static markup: the handlers only show the field as an app would hold it.
const noop = () => {};

export default function Example() {
  return (
    <Stack>
      <SearchField label="Cerca un paziente" placeholder="Cerca un paziente" />
      <SearchField label="Cerca un paziente" value="colom" onChange={noop} onClear={noop} />
    </Stack>
  );
}
