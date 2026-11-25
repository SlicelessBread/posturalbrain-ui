L'elenco per giorno mette gli eventi uno sotto l'altro, raggruppati per data.

**Quando usarlo.** Sotto la settimana a colonne, per il giorno scelto; in Home, per le scadenze dei prossimi sette giorni; su schermi molto stretti, al posto della settimana a colonne.

**Quando no.** Per capire a colpo d'occhio come è distribuita la settimana o il mese usa la settimana a colonne o la griglia mensile.

**Cosa fornisce chi lo usa.**
- Una `section` `pb-daylist__day` per giorno, con la data scritta per esteso in `pb-daylist__date` («Lunedì 30 novembre · oggi»).
- Gli eventi del giorno come `pb-event`, ordinati: prima le rate da incassare, poi le fine percorso, poi gli inizi, poi ciò che è già concluso.
- Per un giorno senza eventi, `pb-daylist__empty` con «Nessun evento»: i giorni vuoti si mostrano, così la settimana resta leggibile.
