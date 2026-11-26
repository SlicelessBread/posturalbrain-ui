POSTURALBRAIN è il linguaggio visivo delle app dello studio: il Client Manager per gestire pazienti, percorsi e incassi, SociAll per pubblicare i video sui social, e l'app con cui i clienti guardano gli esercizi assegnati. Sono app da telefono, installate sulla schermata principale e usate con una mano.

## Come si usa

- Carica `tokens.css` e poi `components/bundle.css`. Metti la classe `pb-app` sul `body`: dà il fondo sfumato, il carattere e il colore del testo.
- Usa solo le classi `pb-…` e gli stili di testo `text-…`. Non scrivere colori, raggi o ombre a mano: se manca una variabile, manca nel sistema e va aggiunta lì.
- Il tema è l'attributo `data-theme` sull'elemento `html`: `dark` o `light`. I componenti non sanno quale tema è attivo, leggono le variabili.
- Il contenuto che scorre sta in `pb-page`, tra `pb-topbar` e `pb-bottomnav`.

## Testi

- Italiano, dando del tu. Frasi corte, nessun punto esclamativo, nessuna emoji.
- I pulsanti sono un verbo e il suo oggetto: «Salva percorso», «Aggiungi paziente», «Programma il post». Mai «OK» o «Invia».
- Maiuscola solo sulla prima parola di titoli e pulsanti: «Scadenze entro 7 giorni».
- Gli errori dicono cosa è successo e cosa fare: «Il numero è incompleto: servono almeno 9 cifre.» Niente scuse, niente «Ops».
- Le cifre sono all'italiana, con il simbolo dopo e uno spazio che non va a capo: «6.480,00 €». Il negativo usa il segno «−», non il trattino: «−412,50 €».
- Le date si scrivono per esteso nei testi («14 maggio 2027», «Lunedì 30 novembre») e GG/MM/AAAA nelle schede. I fatti di una riga si separano con « · ».
- I nomi delle persone non si troncano mai: vanno a capo.

## Colore

- Il fondo è una sfumatura verticale da `--bg-0` a `--bg-2`, con un alone `--glow` in alto. Non mettere testo direttamente su `--glow` fuori da un riquadro.
- Il testo usa tre livelli: `--text` per ciò che si legge, `--text-2` per ciò che accompagna, `--text-3` per segnaposto e didascalie. Tutti e tre reggono 4,5:1 su fondo, vetro, barre e fogli, nei due temi.
- `--accent` è per testo, icone e bordi di ciò che è attivo o scelto. I riempimenti d'accento usano la sfumatura da `--accent-hi` a `--accent-strong`, e sopra ci va solo `--on-accent`: nel tema scuro è inchiostro scuro su blu chiaro, nel tema chiaro è bianco su blu pieno.
- Un solo pulsante principale (`pb-btn--primary`) per schermata. L'accento pieno non si usa per decorare.
- I colori di stato hanno un significato fisso: `--ok` per ciò che è concluso bene (pagata, pubblicato, inizio percorso), `--warn` per ciò che chiede attenzione a breve (rata in scadenza, in pubblicazione), `--danger` per errori, eliminazioni, fine percorso e cifre negative, `--info` per ciò che è programmato. Ogni stato porta sempre una parola o un'icona: mai il solo colore.
- I fondi tenui (`--ok-soft`, `--warn-soft`, `--danger-soft`, `--info-soft`, `--accent-soft`) stanno dietro il testo del colore corrispondente.

## Vetro e sfocatura

- I riquadri sono vetro senza sfocatura: riempimento `--glass`, bordo `--glass-border` e un filo di luce `--glass-highlight` in alto. Campi e riquadri in rilievo usano `--glass-strong`.
- La sfocatura vera (`--blur-bar`) è solo su barra in alto, barra in basso, fogli dal basso e messaggi temporanei, con i riempimenti `--bar` e `--overlay`. Il velo dietro i fogli usa `--scrim` con `--blur-scrim`.
- Non aggiungere `backdrop-filter` altrove: una schermata con dieci riquadri sfocati scorre a scatti sul telefono.
- Non annidare un riquadro in un altro.

## Carattere

- Titoli e cifre in Red Hat Display (`--font-display`), testo in Red Hat Text (`--font-text`).
- Usa gli stili con nome: `text-display` una volta per schermata, `text-title` per il titolo di pagina, `text-section` per sezioni, riquadri e fogli, `text-body` e `text-body-strong` per il testo, `text-label` per etichette e meta, `text-caption` per didascalie.
- Le cifre usano `text-figure` e `text-figure-lg` con la classe `pb-num`, che allinea le cifre in colonna.
- Il testo dei campi è a 16 px: sotto, l'iPhone ingrandisce la pagina.

## Spazio, raggi, ombre

- Margine laterale di pagina e rientro dei riquadri: `--space-4`. Tra riquadri: `--space-3` o `--space-4`. Tra sezioni: `--space-6`.
- `--radius-lg` per riquadri, fogli e liste; `--radius-md` per pulsanti, campi e anteprime; `--radius-sm` per etichette ed eventi; `--radius-pill` per pulsanti a icona, etichette selezionabili e avatar.
- `--shadow-1` solo sui riquadri in rilievo, `--shadow-2` su ciò che galleggia, `--shadow-accent` solo sotto il pulsante principale.

## Tocco, tastiera, movimento

- Ogni elemento toccabile misura almeno `--tap-min` (44 px) per lato, anche quando sembra più piccolo.
- Il fuoco da tastiera è un anello pieno di 2 px in `--focus`. Non toglierlo.
- Le animazioni sono brevi (120 e 200 ms) e spariscono se il telefono chiede meno movimento.
- Mentre i dati arrivano si mostrano le sagome di attesa nella forma della pagina, mai una schermata vuota.

## Icone

Icone a tratto della raccolta Lucide, in `assets/Icone`: 24 px, tratto 2 px, colore del testo che le contiene. Sono incorporate nel codice come SVG con classe `pb-icon`. Nessuna emoji e nessun marchio di terzi: le piattaforme social si indicano con una sigla di due lettere e il nome scritto.

## Marchio

L'icona in `assets/Marchio` è quella attuale dell'app ed è provvisoria. Non esiste un logo con il nome: il nome si scrive in `text-display`.

## Aggiunte volute

L'app da cui nasce il sistema ha pulsanti, riquadri, cifre, liste, campi, fogli, etichette di stato ed eventi di calendario. Questi componenti sono stati aggiunti perché servono alle tre app:

- **Tema chiaro**: richiesto oltre a quello scuro.
- **Settimana a colonne e griglia mensile**: il calendario settimanale chiesto per il Client Manager, il mese per SociAll.
- **Barre dell'anno e importo con confronto**: le cifre annuali e le spese in Home.
- **Sagome di attesa**: per far comparire subito le pagine mentre i dati arrivano.
- **Scheda video, cornice del lettore, linguette, ricerca**: l'app dei clienti.
- **Area di caricamento, stato per piattaforma, fascia**: SociAll.
- **Schermata di accesso con Face ID, interruttore, cambio tema**: accesso e impostazioni di tutte e tre.
- **Conferma, messaggio temporaneo, barra di avanzamento, indicatore di attesa**: oggi fatti caso per caso.

## Cambiare le grafiche

Le grafiche dello studio cambieranno. Per un nuovo colore d'accento si cambiano `--accent`, `--accent-hi`, `--accent-strong`, `--accent-soft`, `--on-accent`, `--focus`, `--glow` e `--shadow-accent`, nei due temi, e si ricontrolla il contrasto. Per un nuovo fondo si cambiano `--bg-0`, `--bg-1`, `--bg-2`. Per un nuovo carattere si cambiano le due famiglie in `tokens.json`. I componenti non si toccano.

## Nel codice

Le app non copiano questi file: installano il pacchetto `posturalbrain-ui`, che contiene lo stesso foglio di stile, le stesse variabili e un componente React per ogni scheda di questa pagina. Le anteprime che vedi qui sono generate da quei componenti: ciò che la pagina mostra è ciò che il pacchetto disegna.

- Lo stile entra con una riga, `import 'posturalbrain-ui/styles.css'`, e la classe `pb-app` sul `body`.
- I componenti hanno il nome della scheda: `Button`, `ListRow`, `Sheet`, `WeekColumns`. Le classi `pb-…` restano il modo per comporre ciò che un componente non copre (`pb-muted`, `pb-num`, gli stili di testo `text-…`).
- Il tema scelto dalla persona («Automatico», «Chiaro», «Scuro») è ricordato sul telefono; `ThemeScript` lo applica prima che la pagina si veda.

Installazione, righe da copiare e modo di aggiornare sono nel README del repository `SlicelessBread/posturalbrain-ui`. Quando qualcosa cambia, cambia lì: poi si rigenerano le anteprime e si ripubblica questa pagina.
