Lo stato per piattaforma dice, social per social, a che punto è la pubblicazione di un post.

**Quando usarlo.** In SociAll, sotto ogni post: una riga per YouTube, Instagram, Facebook e TikTok. Lo stesso video può essere già uscito su una piattaforma e ancora in coda su un'altra.

**Gli stati.**
- `--pending`: in coda, con l'orario previsto.
- `--processing`: la piattaforma sta lavorando il video. Può durare qualche minuto: lo dice il testo.
- `--published`: pubblicato, con l'orario.
- `--failed`: non riuscito, con la causa in parole semplici e «Riprova».

**Cosa fornisce chi lo usa.**
- `pb-platform__mark` con la sigla di due lettere (YT, IG, FB, TT) e il nome scritto per esteso accanto. Non si usano i marchi delle piattaforme.
- Una riga che dice cosa sta succedendo o cosa è andato storto.
- Un'etichetta di stato con icona e parola, sulla stessa riga del nome dentro `pb-platform__head`.
- Per lo stato non riuscito, l'azione che risolve dentro `pb-platform__action`.
