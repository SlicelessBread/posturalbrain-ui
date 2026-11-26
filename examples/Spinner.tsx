import { Row, Spinner, Stack } from '../src';

export const card = { group: 'Avvisi', height: 160, subtitle: 'Piccolo in riga, grande al centro' };

export default function Example() {
  return (
    <Stack>
      <Row>
        <Spinner />
        <span className="text-label pb-muted">Controllo gli account collegati…</span>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Spinner size="lg" />
      </Row>
    </Stack>
  );
}
