import { Avatar, BottomNav, Chip, Grid2, IconButton, Page, PageHeader, Row, SearchField, Tabs, TopBar, VideoCard } from '../src';

export const card = { group: 'Schermate', height: 820, width: 390, page: true };

export default function Example() {
  return (
    <>
      <TopBar brand="PosturalBrain" mark="activity">
        <IconButton variant="ghost" icon="bell" label="Avvisi" />
      </TopBar>
      <Page>
        <Row nowrap>
          <Avatar size="lg">AC</Avatar>
          <PageHeader title="Ciao Anna" subtitle="12 video assegnati dallo studio" />
        </Row>
        <SearchField label="Cerca un video" placeholder="Cerca un video" />
        <Tabs label="Video" value="assegnati" tabs={[{ value: 'assegnati', label: 'Assegnati' }, { value: 'preferiti', label: 'Preferiti' }]} />
        <Row role="group" aria-label="Filtra per zona">
          <Chip pressed>Tutti</Chip>
          <Chip pressed={false}>Schiena</Chip>
          <Chip pressed={false}>Anche</Chip>
          <Chip pressed={false}>Core</Chip>
        </Row>
        <Grid2>
          <VideoCard href="#" title="Mobilità dell'anca al risveglio" meta="Anche · 12 novembre" duration="4:32" favourite />
          <VideoCard href="#" title="Respirazione e decompressione lombare" meta="Schiena · 3 novembre" duration="12:05" favourite={false} />
          <VideoCard href="#" title="Attivazione dei glutei in piedi" meta="Core · 28 ottobre" duration="6:10" favourite={false} />
          <VideoCard href="#" title="Appoggio del piede ed equilibrio" meta="Piede · 20 ottobre" duration="8:47" favourite />
        </Grid2>
      </Page>
      <BottomNav
        items={[
          { href: '#', label: 'Video', icon: 'play', current: true },
          { href: '#', label: 'Preferiti', icon: 'heart' },
          { href: '#', label: 'Profilo', icon: 'user' },
        ]}
      />
    </>
  );
}
