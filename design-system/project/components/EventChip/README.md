L'evento è una voce di calendario: l'inizio o la fine di un percorso, una rata, un post programmato.

**Quando usarlo.** Negli elenchi per giorno, per esteso, come riga toccabile che porta al paziente o al post. Dentro la settimana a colonne e nelle legende, in forma compatta (`pb-event--compact`).

**I tipi.** Ognuno ha un colore e un'icona, sempre insieme:
- `--start`: inizio percorso, verde, triangolo.
- `--end`: fine percorso, rosso, bandierina.
- `--due`: rata da incassare, giallo, simbolo dell'euro.
- `--paid`: rata incassata, verde, segno di spunta, con l'etichetta «Pagata».
- `--post`: post programmato, azzurro, aeroplanino.

**Cosa fornisce chi lo usa.**
- Per esteso: `pb-event__icon` con l'icona a 18 px, `pb-event__title` con cosa e chi («Rata di Anna Colombo»), `pb-event__meta` con importo, durata o orario, e un'etichetta di stato facoltativa in fondo.
- Compatto: l'icona e le iniziali del paziente (o l'orario del post). Non è toccabile da solo: lo è la colonna che lo contiene.
