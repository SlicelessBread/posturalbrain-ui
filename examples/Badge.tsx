import { Badge, Dot, Row, Stack } from '../src';

export const card = { group: 'Avvisi', height: 200, subtitle: 'Stati con icona; punto di notifica' };

export default function Example() {
  return (
    <Stack>
      <Row>
        <Badge tone="ok" icon="check">Pagata</Badge>
        <Badge tone="warn" icon="clock">In scadenza</Badge>
        <Badge tone="danger" icon="circle-alert">Scaduta</Badge>
        <Badge tone="info" icon="calendar-days">Programmato</Badge>
        <Badge>Bozza</Badge>
      </Row>
      <Row>
        <Row as="span">
          <Dot />
          <span className="text-label">2 notifiche non lette</span>
        </Row>
      </Row>
    </Stack>
  );
}
