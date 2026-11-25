La griglia mensile mostra un mese intero, con un punto per ogni evento del giorno.

**Quando usarla.** Per scegliere un giorno guardando il mese: il calendario dei post in SociAll, la vista mese nel Client Manager. Toccando un giorno, sotto compare l'elenco per giorno.

**Quando no.** Per lavorare sulla settimana in corso usa la settimana a colonne, che mostra chi e che cosa. I punti dicono solo che c'è qualcosa e di che tipo.

**Cosa fornisce chi lo usa.**
- Una griglia `pb-month__grid` con le sette iniziali dei giorni e un `button` `pb-month__cell` per giorno, da lunedì.
- `pb-month__cell--out` per i giorni del mese prima e dopo, `pb-month__cell--today` per oggi, `aria-pressed="true"` per il giorno scelto.
- Fino a tre punti per giorno in `pb-month__dots`, con il tipo (`--start`, `--end`, `--due`, `--paid`, `--post`).
- Un `aria-label` per giorno con data e numero di eventi: i punti sono solo per l'occhio.
- Sotto, la legenda (`pb-legend`) con icona e parola per ogni tipo presente nel mese.
