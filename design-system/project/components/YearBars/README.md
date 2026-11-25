Le barre dell'anno mostrano l'andamento di una cifra mese per mese, da gennaio a dicembre.

**Quando usarle.** In Home, sotto le cifre annuali, per vedere a colpo d'occhio i mesi buoni e quelli deboli. Il mese in corso è in colore d'accento (`pb-bars__col--current`); i mesi futuri sono spenti (`pb-bars__col--future`).

**Quando no.** Per confrontare due sole cifre usa l'importo con il confronto. Non è un grafico da analisi: niente assi, griglie o più serie. Se servono i numeri esatti, vanno in una lista sotto.

**Cosa fornisce chi lo usa.**
- Un titolo e il totale dell'anno nella didascalia.
- Dodici voci in una lista ordinata, ognuna con `pb-bars__bar` e `style="--value: N"`, dove N va da 0 a 1 ed è la cifra del mese divisa per quella del mese più alto.
- L'iniziale del mese in `pb-bars__label` e, per chi usa un lettore di schermo, mese e importo per esteso in `pb-sr-only`.
- Un mese a zero mostra un filo alla base, non uno spazio vuoto. Un mese negativo vale 0 nelle barre e va detto nella lista.
