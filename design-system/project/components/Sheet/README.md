Il foglio dal basso apre un compito breve sopra la pagina, senza far perdere il punto in cui si era.

**Quando usarlo.** Per aggiungere o modificare qualcosa con pochi campi (un collaboratore, una spesa, una rata), o per vedere un dettaglio. Sta in fondo allo schermo, ne copre al massimo il 90% e, se il contenuto è lungo, scorre al suo interno.

**Quando no.** Per un compito lungo o con più passi usa una pagina intera. Per una domanda secca («Eliminare?») usa la conferma. Mai un foglio aperto sopra un altro foglio.

**Cosa fornisce chi lo usa.**
- Il foglio `pb-sheet` è un elemento `dialog` aperto con `showModal()`, con `aria-labelledby` verso il titolo; dietro va il velo `pb-sheet-backdrop`, perché quello nativo non legge le variabili sui telefoni meno recenti. Il componente `Sheet` del pacchetto fa entrambe le cose.
- `pb-sheet__head`: un titolo che dice l'azione («Aggiungi collaboratore») e il pulsante a icona per chiudere.
- `pb-sheet__body`: il contenuto.
- `pb-sheet__actions`: il pulsante principale a tutta larghezza, con lo stesso verbo del titolo. Resta visibile in fondo anche quando il contenuto scorre.

Si chiude con il pulsante, toccando fuori dal foglio o con Esc. Sale dal bordo in basso e ci ritorna, insieme al velo; mentre scende mostra ancora ciò che conteneva, e l'app viene avvisata della chiusura quando è sparito. Se ci sono modifiche non salvate, l'app può tenerlo aperto e chiedere conferma. È uno dei pochi elementi con sfocatura vera.

Fuori dal componente `Sheet` l'uscita si ottiene mettendo `data-closing` sul foglio e sul velo e chiudendo il `dialog` quando la transizione è finita.
