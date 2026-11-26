La scheda video presenta un esercizio: anteprima, durata, titolo e il cuore per metterlo tra i preferiti.

**Quando usarla.** Nella libreria del cliente e negli elenchi di video dello studio. In griglia (due per riga, dentro `pb-grid-2`) per sfogliare; in riga (`pb-video-card--row`) per elenchi lunghi o risultati di ricerca.

**Quando no.** Per il video che si sta guardando usa la cornice del lettore. Per un video in caricamento usa l'area di caricamento.

**Cosa fornisce chi lo usa.**
- `pb-video-card__thumb`: un link con l'anteprima come immagine di sfondo o `img`, la durata in `pb-video-card__duration` e un `aria-label` «Guarda: titolo». Senza anteprima resta la campitura `--media`.
- `pb-video-card__title`: il titolo per intero; va a capo fino a tre righe, poi si tronca con i puntini.
- `pb-video-card__meta`: la zona del corpo e la data di assegnazione.
- `pb-video-card__fav`: un pulsante a icona con `aria-pressed` e un `aria-label` fisso che nomina il video («Nei preferiti: titolo»): è lo stato premuto a dire se lo è. Il cuore pieno è il preferito.
