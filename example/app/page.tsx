import { Button, Page, Row, Stack } from 'posturalbrain-ui';

export default function Home() {
  return (
    <Page>
      <Stack>
        <h1 className="text-title">Prova del pacchetto</h1>
        <Row>
          <Button variant="primary" icon="plus">Aggiungi paziente</Button>
          <Button>Annulla</Button>
          <Button variant="ghost" href="#altro">Vedi tutte</Button>
        </Row>
      </Stack>
    </Page>
  );
}
