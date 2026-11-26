Il campo di testo raccoglie una riga o più righe scritte dalla persona.

**Quando usarlo.** Per nomi, telefoni, note, descrizioni. Ogni campo ha la sua etichetta sopra, sempre visibile: il segnaposto è solo un esempio e sparisce scrivendo. Per più righe usa un `textarea` con la stessa classe.

**Quando no.** Per una data usa il campo data; per un importo il campo importo; per una scelta tra voci note la scelta da elenco o la scelta a segmenti.

**Cosa fornisce chi lo usa.**
- Un `label` con classe `pb-field` che contiene tutto: così toccando l'etichetta si entra nel campo.
- `pb-field__label`: cosa scrivere, in due o tre parole, senza i due punti.
- `pb-input`: il campo, con il tipo giusto (`tel`, `email`…) per far comparire la tastiera adatta.
- `pb-field__help`: una riga di aiuto, se serve dire perché lo chiediamo o un limite.
- In caso di errore: `pb-field--invalid` sul `label`, `aria-invalid="true"` sul campo e `pb-field__error` con icona e una frase che dice cosa correggere («servono almeno 9 cifre»), mai solo «non valido».

Il testo nei campi è a 16 px: sotto questa misura l'iPhone ingrandisce la pagina quando si tocca il campo.
