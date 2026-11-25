Il campo data fa scegliere un giorno con il calendario del telefono.

**Quando usarlo.** Per l'inizio di un percorso, la scadenza di una rata, la data di nascita, il giorno di pubblicazione di un post. Tutto il campo è toccabile e apre il selettore del sistema.

**Quando no.** Per spostarsi di mese in mese o di settimana in settimana usa il cambio periodo. Per un orario aggiungi accanto un campo di tipo `time`.

**Cosa fornisce chi lo usa.**
- Un `label` `pb-field` con la sua etichetta.
- Un `pb-input-group` con dentro `input type="date"` e l'icona del calendario in `pb-input-group__suffix`.
- Nell'aiuto, la conseguenza della data scelta quando esiste («Finisce il 14 maggio 2027»): evita un calcolo a mente.

Nei testi le date si scrivono per esteso («14 maggio 2027») o nel formato GG/MM/AAAA; il campo usa il formato del telefono.
