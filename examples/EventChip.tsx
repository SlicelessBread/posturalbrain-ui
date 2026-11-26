import { Badge, EventChip, EventTag, Row, Stack } from '../src';

export const card = { group: 'Calendario', height: 520, subtitle: 'I cinque tipi, per esteso e compatti' };

export default function Example() {
  return (
    <Stack>
      <Stack gap="tight">
        <EventChip href="#" kind="start" title="Inizio percorso di Giulia Villa" meta="Trimestrale" />
        <EventChip href="#" kind="end" title="Fine percorso di Paolo Rinaldi" meta="Semestrale · da rinnovare" />
        <EventChip href="#" kind="due" title="Rata di Anna Colombo" meta={'300,00 € · seconda di tre'} numeric />
        <EventChip href="#" kind="paid" title="Rata di Laura Bassi" meta={'250,00 € · incassata il 28 novembre'} numeric badge={<Badge tone="ok">Pagata</Badge>} />
        <EventChip href="#" kind="post" title="Tre esercizi per la zona lombare" meta="Alle 18:30 · YouTube, Instagram" badge={<Badge tone="info">Programmato</Badge>} />
      </Stack>
      <Row>
        <EventTag kind="start">GV</EventTag>
        <EventTag kind="end">PR</EventTag>
        <EventTag kind="due">AC</EventTag>
        <EventTag kind="paid">LB</EventTag>
        <EventTag kind="post">18:30</EventTag>
      </Row>
    </Stack>
  );
}
