import { Grid2, List, Skeleton, Stack } from '../src';

export const card = { group: 'Superfici e liste', height: 360, subtitle: 'Home in attesa dei dati' };

// The outlines borrow the boxes of the components they stand for, without their text wrappers.
function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <li>
      <div className="pb-list-row">
        <Skeleton shape="circle" />
        <span className="pb-list-row__body">
          <Skeleton width={title} />
          <Skeleton width={meta} />
        </span>
      </div>
    </li>
  );
}

export default function Example() {
  return (
    <Stack aria-busy="true">
      <span className="pb-sr-only">Caricamento in corso</span>
      <Grid2>
        <div className="pb-mini">
          <Skeleton width="40%" height="28px" />
          <Skeleton width="80%" />
        </div>
        <div className="pb-mini">
          <Skeleton width="30%" height="28px" />
          <Skeleton width="90%" />
        </div>
      </Grid2>
      <Skeleton shape="block" height="92px" />
      <List>
        <Row title="55%" meta="80%" />
        <Row title="45%" meta="70%" />
      </List>
    </Stack>
  );
}
