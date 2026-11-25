L'indicatore di attesa dice che qualcosa è in corso quando non si può mostrare né la forma del contenuto né una percentuale.

**Quando usarlo.** Accanto a una riga di testo che dice cosa si sta facendo («Controllo gli account collegati…»), oppure grande al centro di un'area che si sta preparando, come il lettore video.

**Quando no.** Per una pagina o un elenco usa le sagome di attesa: mostrano già dove comparirà il contenuto. Per un pulsante usa `aria-busy` sul pulsante. Per un'attesa misurabile usa la barra di avanzamento.

**Cosa fornisce chi lo usa.**
- `role="status"` e un testo `pb-sr-only` che dice cosa si sta aspettando.
- Quando è in riga, la frase accanto al gerundio o al presente, con i tre puntini.
- `pb-spinner--lg` solo quando è l'unico elemento dell'area.
