import { BottomNav, Button, EventChip, Grid2, IconButton, MiniStat, Page, PageHeader, PeriodSwitch, SectionTitle, Stack, StatCard, TopBar } from '../src';

export const card = { group: 'Schermate', height: 820, width: 390, page: true };

// A preview is static markup: the handler only makes the card a button.
const openAds = () => {};

export default function Example() {
  return (
    <>
      <TopBar brand="PosturalBrain" mark="activity">
        <IconButton variant="ghost" icon="eye" label="Nascondi le cifre" />
        <IconButton variant="ghost" icon="bell" label="Notifiche, 2 non lette" dot />
        <IconButton variant="ghost" icon="settings" label="Impostazioni" />
      </TopBar>
      <Page>
        <PageHeader display title="Buongiorno, Marco" subtitle="Lunedì 30 novembre 2026" />
        <Grid2>
          <MiniStat value="24" label="Pazienti attivi" />
          <MiniStat value="3" label="Scadenze entro 7 giorni" />
        </Grid2>
        <Stack as="section" gap="tight">
          <PeriodSwitch label="Novembre 2026" prevLabel="Mese precedente" nextLabel="Mese successivo" />
          <StatCard tone="highlight" icon="trending-up" label="Guadagno netto mensile" value={'4.086,00 €'} hint="Incassato meno collaboratori e pubblicità" />
          <StatCard icon="wallet" label="Rate effettivamente incassate" value={'6.536,00 €'} />
          <StatCard icon="users" label="Spese per collaboratori" value={'2.100,00 €'} />
          <StatCard icon="megaphone" label="Spese per pubblicità" value={'350,00 €'} onClick={openAds} />
        </Stack>
        <Stack as="section" gap="tight">
          <SectionTitle>Anno 2026, fino a novembre</SectionTitle>
          <Grid2>
            <MiniStat value={'38.420,00 €'} label="Guadagno netto" />
            <MiniStat negative value={'−26.950,00 €'} label="Spese: collaboratori e pubblicità" />
          </Grid2>
        </Stack>
        <Stack as="section" gap="tight">
          <SectionTitle action={<Button size="small" variant="ghost" href="#">Calendario</Button>}>Scadenze entro 7 giorni</SectionTitle>
          <EventChip href="#" kind="due" title="Rata di Anna Colombo" meta={'Oggi · 300,00 €'} numeric />
          <EventChip href="#" kind="end" title="Fine percorso di Paolo Rinaldi" meta="Sabato 5 dicembre · da rinnovare" />
        </Stack>
      </Page>
      <BottomNav
        items={[
          { href: '#', label: 'Pazienti', icon: 'users' },
          { href: '#', label: 'Home', icon: 'house', current: true },
          { href: '#', label: 'Calendario', icon: 'calendar-days' },
        ]}
      />
    </>
  );
}
