# posturalbrain-ui

Design system POSTURALBRAIN: variabili, stile e componenti condivisi dalle app.

La pagina di riferimento, con anteprime e guide, è su Claude: https://claude.ai/artifact/VkzFRg5kULT3Rp9dJaSfqX (privata: si apre solo se condivisa dal proprietario).

## Cosa c'è qui

- `design-system/project/`: i file pubblicati nella pagina, nella forma che la pagina si aspetta.
  - `tokens.json`: colori nei due temi, stili di testo, spaziature, raggi, ombre. È l'unica fonte dei valori.
  - `components/bundle.css`: lo stile dei componenti. Ogni colore è una variabile.
  - `components/<Nome>/preview.html` e `README.md`: anteprima e guida di ogni componente.
  - `assets/`: icona attuale dell'app e icone a tratto (Lucide, licenza ISC).
- `design-system/previews/`: i frammenti da cui si generano le anteprime.
- `design-system/contrast-pairs.json`: le coppie testo/fondo verificate in entrambi i temi.
- `scripts/`: generatore del foglio delle variabili, generatore delle anteprime, controlli.

## Comandi

```bash
npm test                 # forma delle variabili, contrasto, struttura, resa di ogni anteprima
npm run build:previews   # rigenera le anteprime dopo aver cambiato un frammento
npm run check:render     # apre le anteprime in Chromium (schermate in .render/)
npm run tokens:css       # stampa il CSS delle variabili
```

`npm test` richiede Playwright con Chromium. Per aggiungere un'icona: `LUCIDE_DIR=<cartella icons di lucide-static> npm run build:previews`.

## Stato

Fase A (la pagina) completa. Il pacchetto React che le app installeranno è la fase successiva.
