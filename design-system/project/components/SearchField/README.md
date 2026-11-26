Il campo di ricerca filtra un elenco mentre si scrive.

**Quando usarlo.** Sopra un elenco che può superare una schermata: pazienti, video, post. Filtra a ogni lettera, senza un pulsante «Cerca».

**Quando no.** Sopra elenchi di poche voci non serve. Per restringere per categoria usa le etichette selezionabili, anche insieme alla ricerca.

**Cosa fornisce chi lo usa.**
- Un `pb-input-group pb-input-group--search` con la lente in `pb-input-group__prefix` e un `input type="search"`.
- Un segnaposto che dice cosa si cerca («Cerca un paziente») e lo stesso testo come etichetta per i lettori di schermo.
- Quando c'è del testo, un pulsante a icona discreto per cancellarlo, con `aria-label`. Dopo il tocco il fuoco torna al campo.
- Se non trova nulla, uno stato vuoto senza pulsante: «Nessun paziente con questo nome».
