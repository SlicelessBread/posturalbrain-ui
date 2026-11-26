import { DayList, DayListDay, EventChip, Stack, WeekColumns } from '../src';

export const card = { group: 'Calendario', height: 420, subtitle: 'Sette colonne, oggi in evidenza, giorno scelto con il dettaglio sotto' };

export default function Example() {
  return (
    <Stack>
      <WeekColumns
        selected="2026-11-30"
        days={[
          {
            id: '2026-11-30',
            weekday: 'Lun',
            day: 30,
            label: 'Lunedì 30 novembre, oggi, 4 eventi',
            today: true,
            events: [{ kind: 'due', text: 'AC' }, { kind: 'start', text: 'MD' }, { kind: 'paid', text: 'LB' }, { kind: 'end', text: 'PR' }],
          },
          { id: '2026-12-01', weekday: 'Mar', day: 1, label: 'Martedì 1 dicembre, nessun evento' },
          { id: '2026-12-02', weekday: 'Mer', day: 2, label: 'Mercoledì 2 dicembre, 1 evento', events: [{ kind: 'due', text: 'SC' }] },
          { id: '2026-12-03', weekday: 'Gio', day: 3, label: 'Giovedì 3 dicembre, 2 eventi', events: [{ kind: 'due', text: 'MD' }, { kind: 'start', text: 'GV' }] },
          { id: '2026-12-04', weekday: 'Ven', day: 4, label: 'Venerdì 4 dicembre, nessun evento' },
          { id: '2026-12-05', weekday: 'Sab', day: 5, label: 'Sabato 5 dicembre, 1 evento', events: [{ kind: 'end', text: 'AC' }] },
          { id: '2026-12-06', weekday: 'Dom', day: 6, label: 'Domenica 6 dicembre, 1 evento', events: [{ kind: 'paid', text: 'FN' }] },
        ]}
      />
      <DayList>
        <DayListDay date="Lunedì 30 novembre · oggi">
          <EventChip href="#" kind="due" title="Rata di Anna Colombo" meta={'300,00 € · seconda di tre'} numeric />
          <EventChip href="#" kind="start" title="Inizio percorso di Maria Antonietta Degli Esposti-Bianchi" meta="Annuale" />
        </DayListDay>
      </DayList>
    </Stack>
  );
}
