import { Stack, TextField } from '../src';

export const card = { group: 'Moduli', height: 640, subtitle: 'Vuoto, compilato, con aiuto, con errore, disabilitato, più righe' };

export default function Example() {
  return (
    <Stack>
      <TextField label="Nome e cognome" placeholder="Es. Anna Colombo" autoComplete="off" />
      <TextField label="Nome e cognome" defaultValue="Anna Colombo" autoComplete="off" help="Come compare negli elenchi e nei promemoria." />
      <TextField label="Telefono" type="tel" defaultValue="333 12" autoComplete="off" error="Il numero è incompleto: servono almeno 9 cifre." />
      <TextField label="Collaboratore" defaultValue="Marco Riva" disabled />
      <TextField multiline label="Descrizione" rows={3} defaultValue="Tre esercizi per sbloccare la zona lombare, da fare al mattino." help="64 di 2.200 caratteri" helpNumeric />
    </Stack>
  );
}
