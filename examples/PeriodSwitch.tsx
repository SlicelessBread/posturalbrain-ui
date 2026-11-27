import { PeriodSwitch, Stack } from '../src';

export const card = { group: 'Navigazione', height: 300, subtitle: 'Mese; settimana con ritorno a oggi; settimana di oggi' };

export default function Example() {
  return (
    <Stack>
      <PeriodSwitch label="Novembre 2026" prevLabel="Mese precedente" nextLabel="Mese successivo" />
      <PeriodSwitch week label="30 nov – 6 dic" sublabel="Settimana 49" prevLabel="Settimana precedente" nextLabel="Settimana successiva" />
      <PeriodSwitch week todayDisabled label="23 – 29 nov" sublabel="Questa settimana" prevLabel="Settimana precedente" nextLabel="Settimana successiva" />
    </Stack>
  );
}
