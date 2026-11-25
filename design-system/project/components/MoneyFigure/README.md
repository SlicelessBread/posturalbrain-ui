L'importo mostra una cifra in euro grande, con il confronto rispetto al periodo precedente.

**Quando usarlo.** Per la cifra più importante di una schermata o di un foglio: il guadagno del mese, l'incassato dell'anno. Il confronto sotto dice di quanto è cambiata e rispetto a cosa.

**Quando no.** Per più cifre in fila usa i riquadri con cifra. Per un importo dentro una frase scrivilo nel testo. Mai più di un importo grande per schermata.

**Cosa fornisce chi lo usa.**
- `pb-money__label`: cosa misura e in quale periodo.
- `pb-money__value` con `pb-num`: l'importo in formato italiano (punto per le migliaia, virgola per i decimali, «€» dopo).
- `pb-money__delta` con `--up` o `--down`: la differenza con segno, la freccia e il termine di paragone («rispetto a ottobre»). Colore e freccia dicono la stessa cosa.
- `pb-money--negative` quando l'importo stesso è sotto zero.
