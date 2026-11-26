import { Button, Frame, IconButton, Stack, TopBar } from '../src';

export const card = { group: 'Navigazione', height: 200, subtitle: 'Con marchio e azioni; con notifiche non lette' };

export default function Example() {
  return (
    <Stack>
      <Frame>
        <TopBar brand="PosturalBrain" mark="activity">
          <IconButton variant="ghost" icon="eye" label="Nascondi le cifre" />
          <IconButton variant="ghost" icon="bell" label="Notifiche, 2 non lette" dot />
        </TopBar>
      </Frame>
      <Frame>
        <TopBar brand="SociAll" mark="send">
          <Button size="small" variant="ghost">Esci</Button>
        </TopBar>
      </Frame>
    </Stack>
  );
}
