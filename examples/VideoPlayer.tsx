import { Grid2, Stack, VideoPlayer } from '../src';

export const card = { group: 'Video e file', height: 720, subtitle: 'Pronto, in caricamento, verticale, non disponibile' };

export default function Example() {
  return (
    <Stack>
      <VideoPlayer title="Mobilità dell'anca al risveglio" meta="Anche · assegnato il 12 novembre" duration="4:32" />
      <Grid2>
        <VideoPlayer state="loading" />
        <VideoPlayer state="error" errorMessage="Il video non è più disponibile." />
      </Grid2>
      <VideoPlayer portrait duration="0:58" />
    </Stack>
  );
}
