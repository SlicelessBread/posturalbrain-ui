import { Progress, Row, Stack } from '../src';

export const card = { group: 'Avvisi', height: 240, subtitle: 'Con percentuale, completata, senza misura' };

export default function Example() {
  return (
    <Stack>
      <Stack gap="tight">
        <Row between>
          <span className="text-label">Caricamento del video</span>
          <span className="text-label pb-muted pb-num">40%</span>
        </Row>
        <Progress label="Caricamento del video" value={40} />
      </Stack>
      <Stack gap="tight">
        <Row between>
          <span className="text-label">Rate incassate</span>
          <span className="text-label pb-muted pb-num">3 di 3</span>
        </Row>
        <Progress label="Rate incassate" value={3} max={3} />
      </Stack>
      <Stack gap="tight">
        <span className="text-label">Pubblicazione in corso…</span>
        <Progress label="Pubblicazione in corso" />
      </Stack>
    </Stack>
  );
}
