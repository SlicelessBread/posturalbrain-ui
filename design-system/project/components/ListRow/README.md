La riga di lista è una voce di un elenco che porta al suo dettaglio: un paziente, un collaboratore, un post, una notifica.

**Quando usarla.** Per elenchi di cose dello stesso tipo. Le righe stanno dentro una lista (`pb-list`), che è un unico riquadro con le righe separate da un filo. Tutta la riga è toccabile.

**Quando no.** Per due o tre coppie etichetta-valore usa le coppie (`pb-kv`). Per elementi con un'anteprima grande, come i video, usa la scheda video.

**Cosa fornisce chi lo usa.**
- `pb-avatar` con le iniziali (due lettere), oppure un'icona.
- `pb-list-row__title`: il nome per intero. Se è lungo va a capo: non si tronca mai un nome.
- `pb-list-row__meta`: una riga di contesto, con i fatti separati da « · ».
- `pb-list-row__status`: un'etichetta di stato sotto la meta, quando c'è qualcosa da sapere prima di aprire (rata in scadenza, percorso finito).
- `pb-list-row__trail`: la freccia a destra.

Quando l'elenco è vuoto, al posto della lista va uno stato vuoto. Mentre carica, vanno le sagome di attesa.
