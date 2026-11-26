'use client';

import { useState } from 'react';
import { Button, ConfirmDialog, DayList, DayListDay, EventChip, List, MoneyField, SearchField, SectionTitle, Segmented, Sheet, Stack, Switch, Tabs, TextField, UploadZone, WeekColumns, type WeekDay } from 'posturalbrain-ui';

const week: WeekDay[] = [
  { id: 'lun', weekday: 'Lun', day: 30, label: 'Lunedì 30 novembre, oggi, 1 evento', today: true, events: [{ kind: 'due', text: 'AC' }] },
  { id: 'mar', weekday: 'Mar', day: 1, label: 'Martedì 1 dicembre, nessun evento' },
  { id: 'mer', weekday: 'Mer', day: 2, label: 'Mercoledì 2 dicembre, 1 evento', events: [{ kind: 'start', text: 'GV' }] },
  { id: 'gio', weekday: 'Gio', day: 3, label: 'Giovedì 3 dicembre, nessun evento' },
  { id: 'ven', weekday: 'Ven', day: 4, label: 'Venerdì 4 dicembre, nessun evento' },
  { id: 'sab', weekday: 'Sab', day: 5, label: 'Sabato 5 dicembre, nessun evento' },
  { id: 'dom', weekday: 'Dom', day: 6, label: 'Domenica 6 dicembre, nessun evento' },
];

/** The components that hold state, wired the way an app wires them. The test reads the line at the bottom. */
export function Playground() {
  const [view, setView] = useState<'lista' | 'calendario'>('lista');
  const [tab, setTab] = useState<'dati' | 'percorsi' | 'rate'>('dati');
  const [notify, setNotify] = useState(false);
  const [query, setQuery] = useState('');
  const [day, setDay] = useState('lun');
  const [file, setFile] = useState('');
  const [sheet, setSheet] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(true);
  const [closes, setCloses] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [outcome, setOutcome] = useState('');

  return (
    <Stack>
      <SectionTitle>Con stato</SectionTitle>
      <Segmented label="Vista dei post" value={view} onChange={setView} options={[{ value: 'lista', label: 'Lista' }, { value: 'calendario', label: 'Calendario' }]} />
      <Tabs label="Scheda paziente" value={tab} onChange={setTab} tabs={[{ value: 'dati', label: 'Dati' }, { value: 'percorsi', label: 'Percorsi' }, { value: 'rate', label: 'Rate' }]} />
      <List as="div">
        <Switch label="Notifiche sul telefono" description="Ogni mattina, per rate e percorsi in scadenza." checked={notify} onCheckedChange={setNotify} />
      </List>
      <SearchField label="Cerca un paziente" placeholder="Cerca un paziente" value={query} onChange={(event) => setQuery(event.target.value)} onClear={() => setQuery('')} />
      <WeekColumns days={week} selected={day} onSelect={setDay} />
      <DayList>
        <DayListDay date={week.find((d) => d.id === day)?.label}>
          {day === 'lun' ? <EventChip kind="due" title="Rata di Anna Colombo" meta={'300,00 €'} numeric /> : null}
        </DayListDay>
      </DayList>
      <UploadZone
        status={file ? 'done' : 'idle'}
        title="Scegli un video"
        dropTitle="Rilascia qui il video"
        hint="MP4 o MOV, fino a 1 GB"
        accept="video/mp4,video/quicktime"
        onFile={(chosen) => setFile(chosen.name)}
        name={file}
        action={<Button size="small" onClick={() => setFile('')}>Sostituisci</Button>}
      />
      <Button onClick={() => setSheet(true)}>Apri il foglio</Button>
      <Button variant="danger" icon="trash-2" onClick={() => setConfirm(true)}>Elimina paziente</Button>

      {sheetMounted ? (
        <Sheet
          open={sheet}
          onClose={() => { setSheet(false); setCloses((n) => n + 1); }}
          title="Aggiungi collaboratore"
          actions={<Button variant="primary" block onClick={() => setSheet(false)}>Aggiungi collaboratore</Button>}
        >
          <TextField label="Nome e cognome" autoComplete="off" />
          <MoneyField label="Stipendio mensile" />
          <Button variant="ghost" onClick={() => setSheetMounted(false)}>Togli il foglio dalla pagina</Button>
        </Sheet>
      ) : null}

      <ConfirmDialog
        open={confirm}
        onCancel={() => { setConfirm(false); setOutcome('annullato'); }}
        onConfirm={() => { setConfirm(false); setOutcome('confermato'); }}
        title="Eliminare Paolo Rinaldi?"
        confirmLabel="Elimina"
        confirmIcon="trash-2"
      >
        Verranno eliminati anche i suoi 2 percorsi. Non si può annullare.
      </ConfirmDialog>

      <p id="state" className="text-caption pb-subtle" data-view={view} data-tab={tab} data-notify={String(notify)} data-query={query} data-day={day} data-file={file} data-sheet={String(sheet)} data-closes={closes} data-outcome={outcome}>
        Stato per la prova automatica
      </p>
    </Stack>
  );
}
