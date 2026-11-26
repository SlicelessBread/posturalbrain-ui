Il pulsante avvia un'azione: salvare, aggiungere, confermare, eliminare.

**Quando usarlo.** Un solo pulsante principale (`pb-btn--primary`) per schermata o per foglio: è l'azione che la persona è venuta a fare. Le altre azioni usano il pulsante semplice (`pb-btn`) o quello discreto (`pb-btn--ghost`), che sta bene accanto a un titolo di sezione. Il distruttivo (`pb-btn--danger`) è solo per eliminare, e apre sempre una conferma.

**Quando no.** Per passare da una pagina all'altra usa la barra in basso o una riga di lista. Per scegliere tra due o tre viste usa la scelta a segmenti. Un'azione con sola icona è un pulsante a icona.

**Cosa fornisce chi lo usa.**
- Il testo: un verbo e, se serve, l'oggetto («Salva percorso», «Aggiungi paziente»). Mai «OK» o «Invia».
- Un'icona facoltativa prima del testo, a 24 px.
- `disabled` quando l'azione non è possibile, con il motivo scritto vicino.
- `aria-busy="true"` insieme a `disabled` mentre l'azione è in corso: compare l'indicatore, il testo cambia nel gerundio («Salvataggio…») e il pulsante non si può premere una seconda volta, nemmeno da tastiera. Mantiene il suo aspetto: non si attenua come un pulsante disabilitato.
- `pb-btn--block` per occupare tutta la larghezza, in fondo a un modulo o a un foglio.

L'altezza è sempre di 44 px, anche nella variante piccola (`pb-btn--small`), che riduce solo testo e rientri.
