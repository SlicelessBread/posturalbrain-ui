import { Banner, Button, Stack } from '../src';

export const card = { group: 'Avvisi', height: 520, subtitle: 'Informazione, riuscito, attenzione, errore' };

export default function Example() {
  return (
    <Stack gap="tight">
      <Banner tone="info" title="Modalità di prova">I post non vengono pubblicati davvero.</Banner>
      <Banner tone="ok" title="Notifiche attive su questo telefono" />
      <Banner tone="warn" title="Facebook accetta al massimo 90 secondi">Il video dura 2 minuti: su Facebook uscirà come video normale, non come Reel.</Banner>
      <Banner tone="danger" title="Instagram non ha pubblicato il video" action={<Button size="small">Riprova</Button>}>
        L'account risulta scollegato. Ricollegalo e riprova.
      </Banner>
    </Stack>
  );
}
