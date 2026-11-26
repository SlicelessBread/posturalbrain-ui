import Link from 'next/link';
import { BottomNav, Button, EmptyState, Page, PageHeader } from 'posturalbrain-ui';

// A second route, so the links of the first page have somewhere real to go.
export default function Other() {
  return (
    <>
      <Page>
        <PageHeader title="Altra pagina" back={{ href: '/', label: 'Torna alla prova', as: Link }} />
        <EmptyState icon="users" title="Ancora nessun paziente" action={<Button href="/" as={Link} variant="primary">Torna alla prova</Button>}>
          Questa pagina serve solo a provare la navigazione.
        </EmptyState>
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
