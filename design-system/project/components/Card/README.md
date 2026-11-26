Il riquadro raggruppa informazioni che vanno lette insieme: un percorso, un avviso, un riepilogo.

**Quando usarlo.** Per contenuto che ha un titolo e poche righe. È vetro senza sfocatura: un riempimento translucido (`--glass`) con bordo sottile, che lascia intravedere il fondo sfumato. La variante in rilievo (`pb-card--raised`) è per ciò che chiede attenzione adesso: una per schermata. La variante toccabile (`pb-card--interactive`) è un link intero e porta a una pagina di dettaglio.

**Quando no.** Non annidare un riquadro in un altro. Per un elenco di voci dello stesso tipo usa la lista. Per una cifra usa il riquadro con cifra. Non mettere `backdrop-filter` sui riquadri: rallenta lo scorrimento sul telefono.

**Cosa fornisce chi lo usa.**
- Un titolo in `text-section` e il contenuto; il testo secondario usa `pb-muted`.
- Al massimo due azioni in fondo, con pulsanti piccoli.
- Per la variante toccabile, un elemento `a` con la freccia a destra del titolo.
