# posturalbrain-ui

Design system POSTURALBRAIN: lo stile e i componenti React condivisi dalle app dello studio.

La pagina di riferimento, con anteprime e guide, è su Claude: https://claude.ai/artifact/VkzFRg5kULT3Rp9dJaSfqX (privata: si apre solo se condivisa dal proprietario). Le sue anteprime sono generate dai componenti di questo pacchetto.

## Installare in un'app (Next 16, React 19)

Il pacchetto non è su npm: si installa da GitHub, puntando a un'etichetta di versione.

```json
"dependencies": {
  "posturalbrain-ui": "github:SlicelessBread/posturalbrain-ui#v0.0.1"
}
```

Il pacchetto contiene codice TypeScript non compilato: lo compila l'app. In `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  transpilePackages: ['posturalbrain-ui'],
};
```

In `app/layout.tsx`: lo stile, i caratteri, il tema.

```tsx
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import { ThemeScript } from 'posturalbrain-ui';
import 'posturalbrain-ui/styles.css';

const display = Red_Hat_Display({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display', fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'] });
const text = Red_Hat_Text({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-text', fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`pb-app ${display.variable} ${text.variable}`}>{children}</body>
    </html>
  );
}
```

Da ricordare:

- `next/font` vuole i valori scritti per esteso dentro la chiamata: l'elenco `fallback` va ripetuto nelle due chiamate, non messo in una variabile.
- Le due classi dei caratteri vanno sul `body`, non su `html`: così prevalgono sui valori predefiniti del foglio di stile.
- `suppressHydrationWarning` su `html` serve perché `ThemeScript` scrive il tema su quell'elemento prima che React parta.
- Non impostare `themeColor` nei metadati di Next: il colore della barra del telefono lo aggiorna `ThemeScript` insieme al tema.
- Con npm 12 le dipendenze da GitHub vanno autorizzate: `allow-git=all` nel file `.npmrc` dell'app. Vercel oggi usa npm 10 o 11 e non lo richiede.

## Usare i componenti

```tsx
import Link from 'next/link';
import { Avatar, BottomNav, Button, List, ListRow, Page, PageHeader } from 'posturalbrain-ui';

export default function Pazienti() {
  return (
    <>
      <Page>
        <PageHeader title="Pazienti" subtitle="24 attivi su 31">
          <Button variant="primary" icon="plus" href="/pazienti/nuovo" as={Link}>Aggiungi</Button>
        </PageHeader>
        <List>
          <ListRow href="/pazienti/12" as={Link} avatar={<Avatar>AC</Avatar>} title="Anna Colombo" meta="Semestrale · rata il 28 novembre" />
        </List>
      </Page>
      <BottomNav linkAs={Link} items={[{ href: '/pazienti', label: 'Pazienti', icon: 'users', current: true }, { href: '/', label: 'Home', icon: 'house' }]} />
    </>
  );
}
```

- **Link.** Un componente con `href` è un link. Per la navigazione senza ricaricare la pagina passagli `Link` di Next con `as` (o `linkAs` dove i link sono più d'uno, come nella barra in basso).
- **Componenti server.** Tutto si importa da `posturalbrain-ui` anche in un componente server. I componenti che tengono uno stato o reagiscono al tocco (`Segmented`, `Tabs`, `Switch`, `Sheet`, `ConfirmDialog`, `WeekColumns`, `MonthGrid`, `UploadZone`, `ThemeSwitch`) dichiarano da soli `"use client"`; per dar loro una funzione (`onChange`, `onClose`) il file che li usa deve essere a sua volta un componente client.
- **Testi e cifre.** I componenti non formattano nulla: importi, date e testi arrivano già pronti dall'app. Le etichette che il componente possiede («Chiudi», «Annulla», «Oggi») sono in italiano e si possono sostituire.
- **Icone.** `icon="plus"` disegna un'icona del pacchetto (l'elenco è il tipo `IconName`); in alternativa si passa un elemento proprio.
- **Tema.** `ThemeSwitch` è il controllo pronto; `useTheme()` dà la scelta, il tema risultante e `setChoice`.
- **Classi.** Dove un componente non arriva restano le classi del foglio di stile: `pb-muted`, `pb-subtle`, `pb-num`, `pb-sr-only` e gli stili di testo `text-title`, `text-section`, `text-label`…

Ogni proprietà è descritta nel codice del componente (`src/`), e l'editor la mostra mentre si scrive.

## Aggiornare

1. Si cambia qui: valori in `design-system/project/tokens.json`, stile in `design-system/project/components/bundle.css`, componenti in `src/`, esempi in `examples/`.
2. `npm run build:package && npm run build:previews`, poi `npm run typecheck`, `npm test` e `npm run test:example`.
3. Si aumenta `version` in `package.json`, si unisce su `main` e si crea l'etichetta corrispondente (`v0.0.2`).
4. Si ripubblicano sulla pagina di Claude i file cambiati sotto `design-system/project/`.
5. Ogni app passa alla nuova etichetta quando vuole, cambiando la riga in `package.json`.

## Quando il repository diventerà privato

Vercel e npm non potranno più scaricarlo senza credenziali. La via documentata da Vercel è un indirizzo con una chiave di sola lettura limitata a questo repository:

```json
"posturalbrain-ui": "git+https://<utente>:<chiave>@github.com/SlicelessBread/posturalbrain-ui.git#v0.0.1"
```

La chiave finisce così in `package.json` e nel file di blocco dell'app: chi legge quel repository può usarla. Per tenerla fuori dal codice l'alternativa è pubblicare il pacchetto su un registro privato e autenticarsi con `NPM_TOKEN`.

## Cosa c'è qui

- `src/`: i componenti. `src/index.ts` è l'unico ingresso.
- `styles.css`: generato, le variabili dei due temi seguite da `bundle.css`. È l'unico file di stile per le app.
- `design-system/project/`: i file pubblicati nella pagina (`tokens.json`, `components/bundle.css`, anteprime e guide dei componenti, icone, marchio).
- `examples/`: un esempio React per ogni scheda della pagina; le anteprime nascono da qui. `design-system/previews/Cover.html` è l'unico frammento scritto a mano.
- `example/`: un'app Next 16 di prova, che installa il pacchetto come lo installerà un'app vera.
- `scripts/`, `test/`: generatori e controlli.

## Comandi

```bash
npm run typecheck        # tipi del pacchetto e degli esempi
npm test                 # variabili, contrasto, struttura, resa di ogni anteprima, componenti, tema
npm run test:example     # compila l'app di prova e la apre in Chromium
npm run build:package    # rigenera styles.css, la tabella delle icone e i colori del tema
npm run build:previews   # rigenera le anteprime dagli esempi
npm run check:render     # apre le anteprime in Chromium (schermate in .render/)
```

`npm test` e `npm run test:example` richiedono Playwright con Chromium, che non è tra le dipendenze: va installato a parte dove manca. Per aggiungere un'icona: `LUCIDE_DIR=<cartella icons di lucide-static> npm run build:previews`, poi `npm run build:package`.

## Licenze

Le icone in `design-system/project/assets/Icone` vengono da Lucide (licenza ISC).
