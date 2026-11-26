L'etichetta selezionabile accende o spegne una voce di un gruppo: una piattaforma, un filtro, un suggerimento.

**Quando usarlo.** Quando si possono scegliere più voci insieme, o nessuna, e le voci sono corte. Le etichette vanno a capo da sole su più righe.

**Quando no.** Per una scelta sola tra due o tre opzioni usa la scelta a segmenti. Per mostrare uno stato che non si tocca usa l'etichetta di stato (`pb-badge`).

**Cosa fornisce chi lo usa.**
- Un gruppo con `role="group"` e `aria-label`.
- Un `button` con classe `pb-chip` per voce, con `aria-pressed` vero o falso.
- Sulle voci accese, un segno di spunta a 18 px prima del testo: lo stato non deve dipendere dal solo colore.
