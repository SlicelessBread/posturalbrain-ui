Il riquadro con cifra mostra un numero che conta, con il suo nome e una riga che lo spiega.

**Quando usarlo.** Per le cifre del mese e dell'anno in Home, una sotto l'altra. La variante in evidenza (`pb-stat--highlight`) è il risultato finale, una sola per schermata, con la cifra in `text-figure-lg`. La variante negativa (`pb-stat--negative`) colora la cifra e cambia l'icona: una perdita non si riconosce dal solo colore, quindi il segno meno e la nota dicono la stessa cosa. La variante toccabile (`pb-stat--interactive`) è un `button` che apre un foglio di dettaglio.

**Quando no.** Per due numeri piccoli affiancati usa la cifra piccola. Per una cifra dentro una riga di lista scrivila nel testo della riga.

**Cosa fornisce chi lo usa.**
- `pb-stat__label`: il nome della cifra, senza abbreviazioni («Fatturato mensile lordo»).
- `pb-stat__value` con `pb-num`: la cifra in formato italiano, con il simbolo dopo e uno spazio che non va a capo («6.480,00 €»). Il meno è il segno «−», non il trattino.
- `pb-stat__hint`: da dove viene il numero o cosa succede toccando.
- `pb-stat__icon`: un'icona a 24 px che distingue le righe a colpo d'occhio.

Quando le cifre sono nascoste dall'utente, il valore diventa «•••• €» e mantiene l'altezza.
