import { Chip, Row, Stack } from '../src';

export const card = { group: 'Azioni', height: 180, subtitle: 'Scelta multipla, con e senza icona' };

export default function Example() {
  return (
    <Stack>
      <Row role="group" aria-label="Piattaforme">
        <Chip pressed icon="check">YouTube</Chip>
        <Chip pressed icon="check">Instagram</Chip>
        <Chip pressed={false}>Facebook</Chip>
        <Chip pressed={false}>TikTok</Chip>
      </Row>
      <Row role="group" aria-label="Filtra i video">
        <Chip pressed>Tutti</Chip>
        <Chip pressed={false} icon="heart">Preferiti</Chip>
        <Chip pressed={false}>Schiena</Chip>
      </Row>
    </Stack>
  );
}
