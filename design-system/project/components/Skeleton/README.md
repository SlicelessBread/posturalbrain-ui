Le sagome di attesa occupano il posto del contenuto mentre arriva, così la pagina compare subito e non salta.

**Quando usarle.** Appena si apre una pagina i cui dati vengono dal server: la struttura (riquadri, righe, barre) è già al suo posto e le sagome stanno dove andranno testi e cifre. È la risposta alla sensazione di lentezza: toccando una sezione si vede subito la sua forma.

**Quando no.** Per un'azione avviata dalla persona (salvare, pubblicare) usa il pulsante in attesa o la barra di avanzamento. Non mostrare sagome per più di qualche secondo: oltre, serve un messaggio.

**Cosa fornisce chi lo usa.**
- Gli stessi contenitori della pagina vera (`pb-mini`, `pb-list-row`…), con dentro le sagome.
- `pb-skeleton--text` per una riga di testo (larghezza in percentuale, diversa da riga a riga), `pb-skeleton--circle` per un avatar, `pb-skeleton--block` per un riquadro intero.
- `aria-busy="true"` sul contenitore e un testo `pb-sr-only` «Caricamento in corso».

La pulsazione si ferma da sola se il telefono chiede meno movimento.
