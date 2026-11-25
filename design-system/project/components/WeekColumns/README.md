La settimana a colonne mostra i sette giorni affiancati, da lunedì a domenica, con gli eventi di ciascuno impilati.

**Quando usarla.** Come vista principale del calendario: in un colpo d'occhio si vede quali giorni sono pieni e quali liberi. Ogni colonna è un pulsante: toccandola, sotto compare l'elenco per giorno con i dettagli. Oggi è evidenziato (`pb-week__day--today`); il giorno scelto ha `aria-pressed="true"`.

**Quando no.** Non ha una griglia delle ore, perché gli eventi di oggi (inizio e fine percorso, rate, post) valgono per il giorno intero. Per vedere un mese usa la griglia mensile. Per leggere i dettagli usa l'elenco per giorno.

**Cosa fornisce chi lo usa.**
- Sette `button` con classe `pb-week__day` dentro `pb-week__grid`, ognuno con il giorno in tre lettere (`pb-week__dow`) e il numero (`pb-week__num`).
- Un `aria-label` per colonna con giorno per esteso e numero di eventi («Giovedì 3 dicembre, 2 eventi»).
- Per ogni evento un `pb-event pb-event--compact` con l'icona del tipo e le iniziali del paziente. Oltre quattro eventi, i primi tre e «+2».
- Sopra, un cambio periodo in variante settimana.

Su schermi più stretti di 360 px le colonne restano larghe 44 px e la settimana scorre in orizzontale dentro il proprio riquadro.
