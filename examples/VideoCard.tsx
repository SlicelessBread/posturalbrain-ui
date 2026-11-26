import { Grid2, Stack, VideoCard } from '../src';

export const card = { group: 'Video e file', height: 640, subtitle: 'In griglia, in riga, preferito, titolo lungo' };

export default function Example() {
  return (
    <Stack>
      <Grid2>
        <VideoCard href="#" title="Mobilità dell'anca al risveglio" meta="Anche · 12 novembre" duration="4:32" favourite />
        <VideoCard href="#" title="Respirazione e decompressione lombare" meta="Schiena · 3 novembre" duration="12:05" favourite={false} />
      </Grid2>
      <VideoCard
        row
        href="#"
        title="Sequenza completa di attivazione del core e dei glutei per chi sta molte ore seduto"
        meta="Core · assegnato il 20 ottobre"
        duration="1:08:40"
        favourite={false}
      />
    </Stack>
  );
}
