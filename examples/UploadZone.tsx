import { Button, IconButton, Stack, UploadZone } from '../src';

export const card = { group: 'Video e file', height: 820, subtitle: 'In attesa, mentre si trascina, in caricamento, completato, errore' };

export default function Example() {
  return (
    <Stack>
      <UploadZone status="idle" title="Scegli un video" hint="MP4 o MOV, fino a 1 GB" accept="video/mp4,video/quicktime" />
      <UploadZone status="idle" dragging title="Scegli un video" dropTitle="Rilascia qui il video" hint="MP4 o MOV, fino a 1 GB" accept="video/mp4,video/quicktime" />
      <UploadZone
        status="uploading"
        name="esercizi-lombari-novembre.mp4"
        title="Scegli un video"
        detail="312 MB di 780 MB"
        progress={0.4}
        progressLabel="Caricamento del video"
        action={<IconButton variant="ghost" icon="x" label="Annulla il caricamento" />}
      />
      <UploadZone status="done" title="Scegli un video" name="esercizi-lombari-novembre.mp4" detail="780 MB · 2 min 14 s · verticale" action={<Button size="small">Sostituisci</Button>} />
      <UploadZone
        status="error"
        title="Scegli un video"
        name="Caricamento interrotto"
        detail="La connessione è caduta al 40%. Il file è ancora sul tuo telefono."
        action={<Button size="small">Riprova</Button>}
      />
    </Stack>
  );
}
