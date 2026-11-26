import { Button, Frame, Stack, Toast } from '../src';

export const card = { group: 'Avvisi', height: 300, subtitle: 'Riuscito, errore con azione, neutro' };

export default function Example() {
  return (
    <Stack>
      <Frame><Toast tone="ok">Percorso salvato</Toast></Frame>
      <Frame>
        <Toast tone="danger" action={<Button size="small" variant="ghost">Riprova</Button>}>Non sono riuscito a salvare: manca la connessione.</Toast>
      </Frame>
      <Frame><Toast icon="link">Link copiato</Toast></Frame>
    </Stack>
  );
}
