import Link from 'next/link';
import { BottomNav, Button, EmptyState, EventTag, LoginDivider, LoginForm, LoginScreen, Page, PageHeader, Row, TextField, UploadZone } from 'posturalbrain-ui';

// A second route, so the links of the first page have somewhere real to go. Like the first it is a
// Server Component, and it draws the pieces the first page leaves out.
export default function Other() {
  return (
    <>
      <Page>
        <PageHeader title="Altra pagina" back={{ href: '/', label: 'Torna alla prova', as: Link }} />
        <EmptyState icon="users" title="Ancora nessun paziente" action={<Button href="/" as={Link} variant="primary">Torna alla prova</Button>}>
          Questa pagina serve solo a provare la navigazione.
        </EmptyState>
        <Row>
          <EventTag kind="due">AC</EventTag>
          <EventTag kind="post">18:30</EventTag>
        </Row>
        <UploadZone status="idle" title="Scegli un video" hint="MP4 o MOV, fino a 1 GB" accept="video/mp4,video/quicktime" />
        <LoginScreen title="PosturalBrain" subtitle="Entra per vedere pazienti, percorsi e scadenze.">
          <LoginForm action="/altra">
            <TextField label="Password" type="password" name="password" autoComplete="current-password" />
            <Button type="submit" variant="primary" block>Entra</Button>
            <LoginDivider />
            <Button block icon="scan-face">Entra con Face ID</Button>
          </LoginForm>
        </LoginScreen>
      </Page>
      <BottomNav
        linkAs={Link}
        items={[
          { href: '/altra', label: 'Pazienti', icon: 'users', current: true },
          { href: '/', label: 'Home', icon: 'house' },
        ]}
      />
    </>
  );
}
