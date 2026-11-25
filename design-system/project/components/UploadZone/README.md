L'area di caricamento fa scegliere un file e mostra come procede fino alla fine.

**Quando usarla.** Per caricare un video in SociAll o nella libreria degli esercizi. Sul telefono si tocca e si sceglie dalla galleria; sul computer si può anche trascinare il file.

**Gli stati.**
- `--idle`: in attesa di un file. È un `label` che contiene l'`input type="file"`, quindi tutta l'area è toccabile. Dice quali formati e quale dimensione massima.
- `--dragging`: mentre si trascina un file sopra l'area.
- `--uploading`: nome del file, quanto è stato caricato in cifre, barra di avanzamento e un pulsante per annullare.
- `--done`: nome, dimensione, durata e orientamento del video, e «Sostituisci».
- `--error`: cosa è successo e a che punto, che il file non è andato perso, e «Riprova».

**Cosa fornisce chi lo usa.**
- I limiti veri (formati, dimensione) scritti nello stato in attesa.
- L'avanzamento in megabyte oltre che nella barra.
- Un messaggio di errore che dice la causa, non «Errore di caricamento».

Durante il caricamento il resto del modulo resta utilizzabile.
