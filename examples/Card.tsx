import { Button, Card, Icon, Row, Stack } from '../src';

export const card = { group: 'Superfici e liste', height: 400, subtitle: 'Semplice, in rilievo, toccabile' };

export default function Example() {
  return (
    <Stack>
      <Card>
        <h2 className="text-section">Percorso semestrale</h2>
        <p className="pb-muted">Dal 14 novembre 2026 al 14 maggio 2027, tre rate da 300,00{' '}€.</p>
      </Card>
      <Card raised>
        <h2 className="text-section">Rinnovo in arrivo</h2>
        <p className="pb-muted">Il percorso di Anna Colombo finisce tra 5 giorni.</p>
        <Row>
          <Button size="small" variant="primary">Rinnova</Button>
          <Button size="small">Più tardi</Button>
        </Row>
      </Card>
      <Card href="#">
        <Row as="span" between nowrap>
          <span className="text-section">Collaboratori</span>
          <Icon name="chevron-right" />
        </Row>
        <span className="pb-muted">3 persone · 2.100,00{' '}€ a novembre</span>
      </Card>
    </Stack>
  );
}
