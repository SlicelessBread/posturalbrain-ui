import { Avatar, Card, DateField, MoneyField, Row, Stack } from '../src';

export const card = { group: 'Moduli', height: 420, subtitle: "Importo in euro; con aiuto; in una riga, con l'etichetta solo per lo schermo parlante" };

export default function Example() {
  return (
    <Stack>
      <MoneyField label="Costo totale del percorso" defaultValue="900,00" />
      <MoneyField label="Stipendio di novembre 2026" placeholder="1.200,00" help="Vale anche per i mesi dopo, finché non lo cambi." />
      <Card>
        <Stack gap="tight">
          <Row nowrap>
            <Avatar>1ª</Avatar>
            <DateField hideLabel label="Data rata 1" defaultValue="2026-12-01" />
            <MoneyField hideLabel label="Importo rata 1" defaultValue="1.300,00" />
          </Row>
          <Row nowrap>
            <Avatar>12ª</Avatar>
            <DateField hideLabel label="Data rata 12" defaultValue="2027-11-01" />
            <MoneyField hideLabel label="Importo rata 12" defaultValue="300,00" />
          </Row>
        </Stack>
      </Card>
    </Stack>
  );
}
