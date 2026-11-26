La barra di avanzamento mostra quanto manca alla fine di qualcosa che si può misurare.

**Quando usarla.** Per il caricamento di un video, per le rate incassate di un percorso, per i giorni trascorsi. Quando la durata non si conosce (una pubblicazione in corso sui social) usa la variante senza misura (`pb-progress--indeterminate`).

**Quando no.** Per un'attesa breve dopo un tocco usa il pulsante in attesa. Per una pagina che sta caricando usa le sagome di attesa.

**Cosa fornisce chi lo usa.**
- `role="progressbar"` con `aria-label`, `aria-valuemin`, `aria-valuemax` e `aria-valuenow`.
- `style="--value: N"` con N da 0 a 1.
- Sopra la barra, cosa sta avanzando e il valore in cifre («40%», «3 di 3»): la barra da sola non basta.
