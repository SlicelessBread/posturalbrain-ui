Il foglio dal basso apre un compito breve sopra la pagina, senza far perdere il punto in cui si era.

**Quando usarlo.** Per aggiungere o modificare qualcosa con pochi campi (un collaboratore, una spesa, una rata), o per vedere un dettaglio. Sale dal basso, copre al massimo il 90% dello schermo e, se il contenuto è lungo, scorre al suo interno.

**Quando no.** Per un compito lungo o con più passi usa una pagina intera. Per una domanda secca («Eliminare?») usa la conferma. Mai un foglio aperto sopra un altro foglio.

**Cosa fornisce chi lo usa.**
- Il velo `pb-sheet-backdrop` dietro e il foglio `pb-sheet` con `role="dialog"`, `aria-modal="true"` e `aria-labelledby` verso il titolo. Si può usare un elemento `dialog` aperto con `showModal()`: il velo è già previsto.
- `pb-sheet__head`: un titolo che dice l'azione («Aggiungi collaboratore») e il pulsante a icona per chiudere.
- `pb-sheet__body`: il contenuto.
- `pb-sheet__actions`: il pulsante principale a tutta larghezza, con lo stesso verbo del titolo. Resta visibile in fondo anche quando il contenuto scorre.

Si chiude con il pulsante, toccando il velo o con Esc; se ci sono modifiche non salvate, chiede prima conferma. È uno dei pochi elementi con sfocatura vera.
