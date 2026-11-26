import { EventLegend, MonthGrid, Stack, type EventKind, type MonthCell } from '../src';

export const card = { group: 'Calendario', height: 480, subtitle: 'Mese con oggi, giorno scelto, giorni con eventi, legenda' };

// December 2026 starts on a Tuesday: one day of November before it, three of January after.
const events: Record<number, EventKind[]> = { 2: ['due'], 3: ['due', 'start'], 5: ['end'], 6: ['paid'], 10: ['post', 'post'], 14: ['due'], 18: ['start', 'end', 'due'], 22: ['post'], 28: ['due'] };
const count = (n: number) => (n === 0 ? 'nessun evento' : n === 1 ? '1 evento' : `${n} eventi`);

const december: MonthCell[] = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const list = events[day] ?? [];
  const state = day === 3 ? 'oggi, ' : day === 10 ? 'scelto, ' : '';
  return { id: `2026-12-${String(day).padStart(2, '0')}`, day, label: `${day} dicembre, ${state}${count(list.length)}`, today: day === 3, events: list };
});

const cells: MonthCell[] = [
  // Four events that day: three dots, the real number in the label.
  { id: '2026-11-30', day: 30, label: '30 novembre, 4 eventi', outside: true, events: ['due', 'start', 'paid', 'end'] },
  ...december,
  ...[1, 2, 3].map((day) => ({ id: `2027-01-0${day}`, day, label: `${day} gennaio, nessun evento`, outside: true })),
];

export default function Example() {
  return (
    <Stack>
      <MonthGrid label="Dicembre 2026" cells={cells} selected="2026-12-10" />
      <EventLegend />
    </Stack>
  );
}
