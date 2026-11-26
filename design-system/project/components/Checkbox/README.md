La casella accende o spegne un'opzione dentro un modulo; vale quando si salva.

**Quando usarla.** Per opzioni indipendenti di un modulo: «Rinnovo del percorso precedente», «Rata già pagata». Si può toccare tutta la riga, non solo il quadratino.

**Quando no.** Se l'effetto è immediato, senza un «Salva», usa l'interruttore. Per scegliere una sola voce tra alcune usa la scelta a segmenti.

**Cosa fornisce chi lo usa.**
- Un `label` con classe `pb-check` che contiene `input type="checkbox"` e il testo.
- Un testo che descrive lo stato acceso, in forma affermativa («Rata già pagata», non «Non ancora pagata»).
- Una seconda riga facoltativa dentro `pb-check__text` per dire cosa comporta.
- Per un'opzione non disponibile, `disabled` e il motivo scritto nel testo.
