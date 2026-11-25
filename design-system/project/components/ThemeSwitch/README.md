Il cambio tema fa scegliere tra tema chiaro, tema scuro e l'impostazione del telefono.

**Quando usarlo.** Nelle impostazioni di ogni app, una volta sola. Alla prima apertura vale «Automatico»: l'app segue il telefono, e cambia da sola quando il telefono passa dal giorno alla notte.

**Cosa fornisce chi lo usa.**
- Una scelta a segmenti con tre voci: «Automatico», «Chiaro», «Scuro».
- L'applicazione della scelta: `data-theme="light"` o `data-theme="dark"` sull'elemento `html`; con «Automatico» si legge `prefers-color-scheme` e lo si riapplica quando cambia.
- Il ricordo della scelta sul dispositivo, così resta alla prossima apertura.

I componenti non sanno quale tema è attivo: leggono le variabili, che cambiano valore con `data-theme`.
