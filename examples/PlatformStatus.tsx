import { Button, List, PlatformStatus } from '../src';

export const card = { group: 'Video e file', height: 420, subtitle: 'In coda, in pubblicazione, pubblicato, non riuscito' };

export default function Example() {
  return (
    <List>
      <PlatformStatus mark="YT" name="YouTube" status="published" detail="Pubblicato alle 18:31" />
      <PlatformStatus mark="IG" name="Instagram" status="processing" detail="Instagram sta preparando il video" />
      <PlatformStatus mark="TT" name="TikTok" status="pending" detail="Parte alle 18:30 di domani" />
      <PlatformStatus mark="FB" name="Facebook" status="failed" detail="L'account risulta scollegato." action={<Button size="small">Riprova</Button>} />
    </List>
  );
}
