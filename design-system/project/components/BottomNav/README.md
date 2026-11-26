La barra in basso porta alle sezioni principali dell'app con un tocco del pollice.

**Quando usarla.** In ogni app, sempre visibile in fondo allo schermo, con tre voci e mai più di cinque. Ogni voce ha un'icona e una parola. La voce della sezione corrente porta `aria-current="page"`.

**Quando no.** Non metterci azioni (aggiungere, salvare): solo destinazioni. Dentro un foglio o una schermata di dettaglio la barra resta dov'è, non si sostituisce.

**Cosa fornisce chi lo usa.**
- Un `nav` con classe `pb-bottomnav` e `aria-label`.
- Un link per sezione, con icona a 24 px e l'etichetta dentro uno `span`: una parola sola.
- Lo spazio in fondo alla pagina perché l'ultimo contenuto non resti sotto la barra: `padding-bottom: calc(var(--nav-h) + env(safe-area-inset-bottom))` sul contenitore che scorre.

La barra è fissa in fondo, rispetta l'area sicura del telefono ed è uno dei pochi elementi con sfocatura vera.
