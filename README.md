# ČNDB – Česká Numismatická Databáze

Katalog českých a československých mincí s populačními reporty (PCGS/NGC),
odhady cen a aukčními výsledky. Česká obdoba [PCGS CoinFacts](https://www.pcgs.com/coinfacts).

## Vývoj

```bash
npm install
npm run dev       # dev server na http://localhost:5173
npm run build     # typecheck + produkční build do dist/
npm run preview   # lokální náhled produkčního buildu
```

## Struktura

```
src/
├── data/          # doménový model, katalog mincí, generátor ukázkových dat
├── components/
│   ├── layout/    # hlavička, patička, drobečková navigace
│   ├── coin/      # komponenty karty mince (populace, galerie, aukce…)
│   └── ui/        # obecné prvky (vyhledávání, placeholder mince)
├── pages/         # stránky napojené na router
├── lib/           # pomocné funkce (formátování)
└── styles/        # design tokeny + globální styly
resources/         # Python scrapery NGC censů + stažená data (mimo aplikaci)
```

Populační, cenová a aukční data jsou zatím **ukázková** — generuje je
deterministicky `src/data/mock.ts`. Po napojení reálných dat stačí nahradit
tento modul.
