L'interruttore accende o spegne subito un'impostazione, senza bisogno di salvare.

**Quando usarlo.** Nelle impostazioni: notifiche, email del mattino, accesso con Face ID, tema. L'effetto si vede appena lo si tocca.

**Quando no.** Dentro un modulo che si conferma con «Salva» usa la casella. Per avviare un'azione usa un pulsante.

**Cosa fornisce chi lo usa.**
- Una riga `pb-switch-row` con il testo a sinistra e l'interruttore a destra; più righe stanno in una `pb-list`.
- Un `button` con classe `pb-switch`, `role="switch"`, `aria-checked` vero o falso e `aria-labelledby` che punta al testo della riga.
- Un testo che nomina la cosa accesa («Notifiche sul telefono»), con una seconda riga facoltativa che dice quando o perché.
- Se non si può usare, `disabled` e il motivo nella seconda riga.

Acceso e spento si distinguono per la posizione del pomello oltre che per il colore.
