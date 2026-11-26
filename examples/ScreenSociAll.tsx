import { Banner, BottomNav, Button, Chip, DateField, IconButton, Page, PageHeader, Row, Segmented, Stack, TextField, TopBar, UploadZone } from '../src';

export const card = { group: 'Schermate', height: 820, width: 390, page: true };

export default function Example() {
  return (
    <>
      <TopBar brand="SociAll" mark="send">
        <IconButton variant="ghost" icon="link" label="Account collegati" />
      </TopBar>
      <Page>
        <PageHeader title="Nuovo post" subtitle="Un video, una descrizione, quattro piattaforme" />
        <UploadZone status="done" title="Scegli un video" name="esercizi-lombari-novembre.mp4" detail="780 MB · 2 min 14 s · verticale" action={<Button size="small">Sostituisci</Button>} />
        <Banner tone="warn" title="Su Facebook uscirà come video normale">I Reel di Facebook si fermano a 90 secondi; questo video dura 2 minuti e 14.</Banner>
        <TextField
          multiline
          label="Descrizione"
          rows={4}
          defaultValue="Tre esercizi per sbloccare la zona lombare, da fare al mattino prima di sederti alla scrivania."
          help="96 di 2.200 caratteri"
          helpNumeric
        />
        <Stack gap="tight">
          <span id="platforms" className="text-label pb-muted">Dove pubblicare</span>
          <Row role="group" aria-labelledby="platforms">
            <Chip pressed icon="check">YouTube</Chip>
            <Chip pressed icon="check">Instagram</Chip>
            <Chip pressed icon="check">Facebook</Chip>
            <Chip pressed={false}>TikTok</Chip>
          </Row>
        </Stack>
        <Stack gap="tight">
          <span id="when" className="text-label pb-muted">Quando</span>
          <Segmented labelledBy="when" value="programma" options={[{ value: 'subito', label: 'Subito' }, { value: 'programma', label: 'Programma' }]} />
          <DateField label="Giorno" defaultValue="2026-12-01" />
        </Stack>
        <Button variant="primary" block>Programma il post</Button>
      </Page>
      <BottomNav
        items={[
          { href: '#', label: 'Nuovo', icon: 'plus', current: true },
          { href: '#', label: 'Post', icon: 'film' },
          { href: '#', label: 'Calendario', icon: 'calendar-days' },
        ]}
      />
    </>
  );
}
