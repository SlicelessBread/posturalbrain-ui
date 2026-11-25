La cornice del lettore tiene il video che si sta guardando, orizzontale o verticale, e i suoi stati prima della riproduzione.

**Quando usarla.** Nella pagina di un esercizio, in cima, con titolo e dati sotto. In SociAll, per rivedere il video prima di pubblicarlo (`pb-player--portrait`, 9:16).

**Come si riproduce.** Dentro `pb-player__frame` va un elemento `video` con `controls` e `playsinline`: i comandi di riproduzione sono quelli del telefono, che già gestiscono schermo intero, AirPlay e sottotitoli. Il design system non li ridisegna.

**Cosa fornisce chi lo usa.**
- Prima dell'avvio: l'anteprima, il pulsante `pb-player__play` con `aria-label="Riproduci"` e la durata.
- Mentre il video si prepara: un indicatore di attesa grande al centro.
- Se il video non c'è più: `pb-player__frame--error` con icona e una frase («Il video non è più disponibile.»).
- Sotto, in `pb-player__caption`, il titolo in `text-section` e una riga di dati.

La cornice mantiene le proporzioni anche prima che il video arrivi, così la pagina non salta.
