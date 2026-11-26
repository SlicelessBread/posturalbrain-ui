import { Badge, DayList, DayListDay, EventChip } from '../src';

export const card = { group: 'Calendario', height: 560, subtitle: 'Eventi raggruppati per giorno, con un giorno vuoto' };

export default function Example() {
  return (
    <DayList>
      <DayListDay date="Lunedì 30 novembre · oggi">
        <EventChip href="#" kind="due" title="Rata di Anna Colombo" meta={'300,00 € · seconda di tre'} numeric />
        <EventChip href="#" kind="paid" title="Rata di Laura Bassi" meta={'250,00 € · incassata il 28 novembre'} numeric badge={<Badge tone="ok">Pagata</Badge>} />
      </DayListDay>
      <DayListDay date="Martedì 1 dicembre" />
      <DayListDay date="Giovedì 3 dicembre">
        <EventChip href="#" kind="start" title="Inizio percorso di Giulia Villa" meta="Trimestrale" />
        <EventChip href="#" kind="end" title="Fine percorso di Paolo Rinaldi" meta="Semestrale · da rinnovare" />
      </DayListDay>
    </DayList>
  );
}
