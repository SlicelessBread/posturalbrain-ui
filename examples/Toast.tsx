import { Button, Frame, Stack, Toast } from '../src';

export const card = { group: 'Avvisi', height: 370, subtitle: 'Riuscito, errore con azione, neutro: nascondili e mostrali di nuovo' };

// The preview is static markup: this stands in for the \`open\` prop of the component.
export const script = `
  // Demo only: hides the toasts of this preview and shows them again.
  const toasts = [...document.querySelectorAll('.pb-toast')];
  const ended = (el) => Promise.all(el.getAnimations().map((a) => a.finished.catch(() => {})));
  let shown = true;
  const toggle = document.querySelector('[data-demo-toggle]');
  toggle.addEventListener('click', async () => {
    shown = !shown;
    toggle.textContent = shown ? 'Nascondi gli avvisi' : 'Mostra gli avvisi';
    if (shown) {
      toasts.forEach((toast) => { toast.hidden = false; });
      return;
    }
    toasts.forEach((toast) => toast.setAttribute('data-closing', ''));
    await Promise.all(toasts.map(ended));
    if (shown) return;
    toasts.forEach((toast) => { toast.hidden = true; toast.removeAttribute('data-closing'); });
  });
`;

export default function Example() {
  return (
    <Stack>
      <Button data-demo-toggle>Nascondi gli avvisi</Button>
      <Frame><Toast tone="ok">Percorso salvato</Toast></Frame>
      <Frame>
        <Toast tone="danger" action={<Button size="small" variant="ghost">Riprova</Button>}>Non sono riuscito a salvare: manca la connessione.</Toast>
      </Frame>
      <Frame><Toast icon="link">Link copiato</Toast></Frame>
    </Stack>
  );
}
