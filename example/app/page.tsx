import Link from 'next/link';
import {
  Avatar, Badge, Banner, BottomNav, Button, Card, Checkbox, Chip, DateField, EmptyState, EventLegend, Grid2, IconButton, KeyValue, List, ListRow,
  MiniStat, MoneyFigure, MonthGrid, Page, PageHeader, PeriodSwitch, PlatformStatus, Progress, Row, SectionTitle, Segmented, Select, Skeleton, Spinner,
  Stack, StatCard, Tabs, ThemeSwitch, Toast, TopBar, VideoCard, VideoPlayer, YearBars,
} from 'posturalbrain-ui';
import { Playground } from './Playground';

// A Server Component on purpose: everything imported here from the single entry point must render
// without "use client" in this file and without passing any function.
export default function Home() {
  return (
    <>
      <TopBar brand="Prova" mark="activity">
        <IconButton variant="ghost" icon="bell" label="Notifiche, 2 non lette" dot />
      </TopBar>
      <Page>
        <PageHeader title="Prova del pacchetto" subtitle="Un componente per famiglia" back={{ href: '/', label: 'Torna alla pagina iniziale', as: Link }}>
          <IconButton variant="primary" icon="plus" label="Aggiungi paziente" />
        </PageHeader>

        <Stack as="section" id="azioni">
          <SectionTitle count={3}>Azioni</SectionTitle>
          <Row>
            <Button variant="primary" icon="plus">Aggiungi paziente</Button>
            <Button>Annulla</Button>
            <Button variant="ghost" href="/" as={Link}>Vedi tutte</Button>
          </Row>
          <Row role="group" aria-label="Piattaforme">
            <Chip pressed icon="check">YouTube</Chip>
            <Chip pressed={false}>TikTok</Chip>
          </Row>
          <Segmented label="Durata del percorso" value="semestrale" options={[{ value: 'trimestrale', label: 'Trimestrale' }, { value: 'semestrale', label: 'Semestrale' }]} />
          <ThemeSwitch />
        </Stack>

        <Stack as="section" id="navigazione">
          <SectionTitle>Navigazione</SectionTitle>
          <PeriodSwitch week label="30 nov – 6 dic" sublabel="Settimana 49" prevLabel="Settimana precedente" nextLabel="Settimana successiva" />
          <Tabs label="Video" value="assegnati" tabs={[{ value: 'assegnati', label: 'Assegnati' }, { value: 'preferiti', label: 'Preferiti' }]} />
        </Stack>

        <Stack as="section" id="superfici">
          <SectionTitle>Superfici e liste</SectionTitle>
          <Grid2>
            <MiniStat value="24" label="Pazienti attivi" />
            <MiniStat negative value={'−12.345,67 €'} label="Spese 2026" />
          </Grid2>
          <StatCard tone="highlight" icon="trending-up" label="Guadagno netto mensile" value={'4.086,00 €'} hint="Incassato meno collaboratori e pubblicità" />
          <Card href="/" as={Link}>
            <span className="text-section">Collaboratori</span>
            <span className="pb-muted">3 persone</span>
          </Card>
          <List>
            <ListRow href="/" as={Link} avatar={<Avatar>AC</Avatar>} title="Anna Colombo" meta="Semestrale · rata il 28 novembre" status={<Badge tone="warn" icon="clock">In scadenza</Badge>} />
            <ListRow avatar={<Avatar>PR</Avatar>} title="Paolo Rinaldi" meta="Nessun percorso attivo" />
          </List>
          <KeyValue items={[{ label: 'Collaboratore', value: 'Luca Ferri' }, { label: 'Totale', value: '900,00 €', numeric: true }]} />
          <EmptyState icon="users" title="Ancora nessun paziente" action={<Button variant="primary" icon="plus">Aggiungi paziente</Button>}>
            Aggiungi il primo paziente per registrare il suo percorso e le rate.
          </EmptyState>
          <Skeleton shape="block" height="48px" />
        </Stack>

        <Stack as="section" id="cifre">
          <SectionTitle>Cifre</SectionTitle>
          <MoneyFigure label="Guadagno netto di novembre" value={'4.086,00 €'} trend="up" delta={'+320,00 € rispetto a ottobre'} />
          <YearBars
            title="Guadagno netto 2026"
            total={'6.810,00 €'}
            bars={[
              { label: 'S', value: 3130, description: 'Settembre 3.130,00 €' },
              { label: 'O', value: -400, description: 'Ottobre, in perdita di 400,00 €' },
              { label: 'N', value: 4086, description: 'Novembre, mese in corso, 4.086,00 €', state: 'current' },
              { label: 'D', value: 0, description: 'Dicembre, non ancora iniziato', state: 'future' },
            ]}
          />
        </Stack>

        <Stack as="section" id="moduli">
          <SectionTitle>Moduli</SectionTitle>
          <Select label="Numero di rate" defaultValue="3 rate">
            <option>1 rata</option>
            <option>3 rate</option>
          </Select>
          <DateField label="Scadenza della seconda rata" defaultValue="2026-10-01" error="La rata scade prima dell'inizio del percorso." />
          <Checkbox label="Rata già pagata" description="Segna la data di oggi come giorno dell'incasso." />
        </Stack>

        <Stack as="section" id="avvisi">
          <SectionTitle>Avvisi</SectionTitle>
          <Banner tone="warn" title="Facebook accetta al massimo 90 secondi">Il video dura 2 minuti: uscirà come video normale.</Banner>
          <Progress label="Caricamento del video" value={40} />
          <Row>
            <Spinner />
            <span className="text-label pb-muted">Controllo gli account collegati…</span>
          </Row>
        </Stack>

        <Stack as="section" id="calendario">
          <SectionTitle>Calendario</SectionTitle>
          <MonthGrid
            label="Dicembre 2026"
            selected="2"
            cells={Array.from({ length: 7 }, (_, i) => ({ id: String(i + 1), day: i + 1, label: `${i + 1} dicembre`, today: i === 2, events: i === 1 ? ['due' as const, 'start' as const] : [] }))}
          />
          <EventLegend kinds={['start', 'end', 'due', 'paid']} />
        </Stack>

        <Stack as="section" id="video">
          <SectionTitle>Video e file</SectionTitle>
          <VideoCard row href="/" linkAs={Link} title="Mobilità dell'anca al risveglio" meta="Anche · 12 novembre" duration="4:32" favourite />
          <VideoPlayer title="Respirazione e decompressione lombare" duration="12:05" />
          <List>
            <PlatformStatus mark="YT" name="YouTube" status="published" detail="Pubblicato alle 18:31" />
          </List>
        </Stack>

        <Playground />
      </Page>
      <BottomNav
        linkAs={Link}
        items={[
          { href: '/pazienti', label: 'Pazienti', icon: 'users' },
          { href: '/', label: 'Home', icon: 'house', current: true },
          { href: '/calendario', label: 'Calendario', icon: 'calendar-days' },
        ]}
      />
      <Toast tone="ok">Percorso salvato</Toast>
    </>
  );
}
