Il campo importo raccoglie una cifra in euro, scritta all'italiana.

**Quando usarlo.** Per costi, rate, stipendi, spese. Apre la tastiera numerica con la virgola e mostra «€» alla fine del campo.

**Quando no.** Per un numero che non è denaro (rate, giorni) usa un campo di testo con tastiera numerica o una scelta da elenco.

**Cosa fornisce chi lo usa.**
- Un `label` `pb-field` con un'etichetta che dice a cosa si riferisce l'importo e, se serve, a quale mese.
- Un `pb-input-group` con `input` di tipo `text`, `inputmode="decimal"`, classe `pb-input pb-num`, e «€» in `pb-input-group__suffix`.
- La virgola per i decimali e il punto per le migliaia, accettati entrambi in scrittura e sistemati all'uscita dal campo («900» diventa «900,00»).
- Nell'aiuto, la regola che vale per quel numero quando non è ovvia («Vale anche per i mesi dopo, finché non lo cambi»).
