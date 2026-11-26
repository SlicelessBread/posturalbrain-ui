La barra in alto dice in quale app ci si trova e tiene le azioni che valgono per tutta l'app.

**Quando usarla.** Una per app, sempre visibile in cima, sopra il contenuto che scorre. A sinistra il nome dell'app con il suo segno; a destra al massimo tre azioni: notifiche, mostra o nascondi le cifre, uscita.

**Quando no.** Il titolo della pagina non va qui: sta nell'intestazione di pagina, sotto la barra. Le azioni della singola pagina (aggiungere un paziente) stanno nell'intestazione di pagina.

**Cosa fornisce chi lo usa.**
- `pb-topbar__brand` con il segno dentro `pb-topbar__mark` e il nome dell'app scritto come nel resto dell'app.
- `pb-topbar__actions` con pulsanti a icona discreti (`pb-icon-btn--ghost`), ognuno con `aria-label`.
- Un `pb-dot` nel pulsante delle notifiche quando ce ne sono di non lette, e il numero nell'`aria-label`.

La barra resta attaccata in alto (`position: sticky`), aggiunge da sola lo spazio dell'area sicura del telefono ed è uno dei pochi elementi con sfocatura vera.
