L'intestazione di pagina dà il titolo alla schermata e tiene l'azione principale di quella pagina.

**Quando usarla.** In cima a ogni pagina, sotto la barra in alto. Nelle pagine di primo livello ha solo titolo e azione. Nelle pagine di dettaglio aggiunge a sinistra il ritorno indietro.

**Quando no.** Dentro un foglio dal basso usa l'intestazione del foglio (`pb-sheet__head`). Per il titolo di un gruppo dentro la pagina usa il titolo di sezione.

**Cosa fornisce chi lo usa.**
- Il titolo in un `h1` con `pb-page-head__title text-title`: se è lungo va a capo, non si tronca.
- Un sottotitolo facoltativo in `pb-page-head__sub text-label`: un dato utile (quanti, fino a quando), non una descrizione.
- `pb-page-head__back`: un link con pulsante a icona discreto e `aria-label` che dice dove torna («Torna ai pazienti»).
- `pb-page-head__actions`: un solo pulsante, a icona principale per aggiungere o piccolo con testo per modificare.
