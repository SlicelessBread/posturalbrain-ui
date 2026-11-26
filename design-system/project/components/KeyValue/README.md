Le coppie etichetta-valore elencano i dati di una scheda, uno per riga.

**Quando usarle.** Nella scheda di un paziente, di un percorso o di un collaboratore, per dati che si leggono e non si toccano. Sono dentro un riquadro unico, con un filo tra le righe.

**Quando no.** Per dati che si modificano sul posto usa i campi di modulo. Per elenchi di voci toccabili usa la riga di lista. Per una cifra che deve spiccare usa il riquadro con cifra.

**Cosa fornisce chi lo usa.**
- Una `dl` con classe `pb-kv` e, per ogni riga, un `div` con `dt` (l'etichetta) e `dd` (il valore).
- Etichette brevi, senza i due punti.
- `pb-num` sul `dd` quando il valore è un importo o un numero da confrontare con gli altri.
- Un trattino lungo «—» come valore quando il dato manca.
