La scelta a segmenti fa scegliere una sola tra due o tre opzioni che stanno sulla stessa riga.

**Quando usarlo.** Per cambiare vista (Lista / Calendario) o per una scelta corta dentro un modulo (Trimestrale / Semestrale / Annuale). La scelta ha effetto subito, senza un pulsante di conferma.

**Quando no.** Con più di tre opzioni, o con etichette più lunghe di una parola, usa una scelta da elenco. Per scelte multiple usa le etichette selezionabili. Per passare tra sezioni di una pagina usa le linguette.

**Cosa fornisce chi lo usa.**
- Un contenitore `pb-segmented` con `role="group"` e `aria-label` che dice cosa si sta scegliendo.
- Un `button` per opzione, con `aria-pressed="true"` su quella attiva e `"false"` sulle altre.
- Etichette di una parola, tutte della stessa lunghezza circa: i segmenti hanno larghezza uguale.
