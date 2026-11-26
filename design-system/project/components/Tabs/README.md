Le linguette dividono il contenuto di una pagina in sezioni dello stesso livello, una visibile alla volta.

**Quando usarle.** Quando una pagina ha da due a cinque sezioni che la persona alterna spesso (Assegnati / Preferiti; Dati / Percorsi / Rate). Se non stanno nello schermo, la fila scorre in orizzontale dentro il proprio contenitore.

**Quando no.** Per una scelta che cambia solo il modo di vedere gli stessi dati usa la scelta a segmenti. Per le sezioni principali dell'app usa la barra in basso.

**Cosa fornisce chi lo usa.**
- Un contenitore `pb-tabs` con `role="tablist"` e `aria-label`.
- Un `button` con `role="tab"` per sezione, `aria-selected="true"` su quella aperta.
- Il pannello mostrato sotto, con `role="tabpanel"`.

La riga sotto la linguetta aperta scivola verso quella nuova dove il browser lo consente (iOS 26 e successivi); altrove salta.
