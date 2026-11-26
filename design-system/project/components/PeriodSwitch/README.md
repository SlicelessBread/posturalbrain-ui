Il cambio periodo sposta di un mese o di una settimana i dati mostrati nella pagina.

**Quando usarlo.** Sopra cifre e calendari che dipendono da un periodo: le cifre del mese in Home, lo stipendio di un collaboratore mese per mese, la settimana del calendario. Nella variante settimana (`pb-period--week`) compare «Oggi» quando non si sta guardando la settimana corrente.

**Quando no.** Per scegliere una data precisa usa il campo data. Per periodi fissi (mese / anno) usa la scelta a segmenti.

**Cosa fornisce chi lo usa.**
- Due pulsanti a icona discreti con `aria-label` («Mese precedente», «Mese successivo»).
- `pb-period__label` con il periodo scritto per esteso («Novembre 2026», «30 nov – 6 dic») e `aria-live="polite"`, così il cambio viene annunciato.
- Nella variante settimana, una seconda riga facoltativa con il numero della settimana.
