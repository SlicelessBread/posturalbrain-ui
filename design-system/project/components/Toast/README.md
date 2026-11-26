Il messaggio temporaneo conferma che un'azione è andata a buon fine, o dice subito che non è riuscita.

**Quando usarlo.** Dopo un salvataggio, una copia, un'eliminazione: compare in basso, sopra la barra, e sparisce da solo dopo quattro secondi. Quello di errore resta finché non si chiude o si riprova.

**Quando no.** Per qualcosa che la persona deve leggere con calma o che riguarda tutta la pagina usa una fascia. Per chiedere conferma usa la conferma. Mai per un errore di un campo: quello va sotto il campo.

**Cosa fornisce chi lo usa.**
- `pb-toast--ok` o `pb-toast--danger`, con l'icona corrispondente; senza variante per un messaggio neutro.
- `role="status"` per le conferme, `role="alert"` per gli errori.
- Un testo al passato per le conferme («Percorso salvato»). Per gli errori, cosa è successo e perché, senza scuse («Non sono riuscito a salvare: manca la connessione»).
- Al massimo un'azione, discreta e piccola («Riprova», «Annulla»).

Compare salendo di poco con una dissolvenza. Per toglierlo il componente `Toast` riceve `open={false}`: sfuma e poi esce dalla pagina (fuori dal componente: `data-closing`, poi si toglie l'elemento a transizione finita).

È uno dei pochi elementi con sfocatura vera, perché galleggia sul contenuto.
