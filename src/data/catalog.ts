import type { CoinType, Period } from './types'

export const PERIODS: Period[] = [
  {
    slug: 'prvni-republika',
    name: 'První republika',
    yearsLabel: '1918–1938',
    description:
      'Mince Československé republiky od jejího vzniku po Mnichovskou dohodu. Oběživo navržené předními českými umělci, ražené převážně v Kremnici, doplněné o slavné svatováclavské dukáty.',
  },
  {
    slug: 'protektorat',
    name: 'Protektorát Čechy a Morava',
    yearsLabel: '1939–1945',
    description:
      'Nouzové zinkové oběživo ražené během německé okupace. Mince přebíraly prvorepublikové motivy bez státního znaku republiky a dnes patří mezi sběratelsky vyhledávané doklady válečné éry.',
  },
]

export const COIN_TYPES: CoinType[] = [
  {
    slug: '10-korun',
    periodSlug: 'prvni-republika',
    name: '10 Korun',
    subtitle: 'Tomáš Garrigue Masaryk',
    metal: 'Ag',
    parameters: {
      denomination: '10 Kč',
      composition: 'Stříbro 700/1000',
      weightGrams: 10,
      diameterMm: 30,
      edge: 'Vroubkovaná',
      designer: 'Otakar Španiel',
      mint: 'Kremnica',
    },
    description:
      'Stříbrná desetikoruna s portrétem prezidenta T. G. Masaryka patří k nejoblíbenějším mincím první republiky. Ražena byla ve státní mincovně v Kremnici a v oběhu doplňovala vyšší stříbrné nominály. Ročníky se liší nákladem i dostupností ve špičkových stavech.',
    issues: [
      { year: 1928, mintage: 2_001_000, variants: ['MS', 'PL'], note: 'Jubilejní ražba k 10. výročí vzniku republiky.' },
      { year: 1930, mintage: 3_199_000, variants: ['MS', 'PL'] },
      { year: 1931, mintage: 2_000_000, variants: ['MS', 'PL'] },
      { year: 1932, mintage: 1_981_000, variants: ['MS', 'PL'] },
    ],
  },
  {
    slug: '20-haleru',
    periodSlug: 'prvni-republika',
    name: '20 Haléřů',
    metal: 'CuNi',
    parameters: {
      denomination: '20 h',
      composition: 'Měďnikl (CuNi 80/20)',
      weightGrams: 3.33,
      diameterMm: 20,
      edge: 'Hladká',
      designer: 'Otakar Španiel',
      mint: 'Kremnica',
    },
    description:
      'Měďniklový dvacetihaléř byl základním oběživem první republiky a razil se téměř po celou dobu její existence. Většina ročníků je běžně dostupná, ve stavech MS65 a lepších však jde o vyhledávané mince.',
    issues: [
      { year: 1921, mintage: 24_000_000, variants: ['MS'] },
      { year: 1922, mintage: 18_705_000, variants: ['MS'] },
      { year: 1924, mintage: 13_333_000, variants: ['MS'] },
      { year: 1926, mintage: 12_705_000, variants: ['MS'] },
      { year: 1928, mintage: 17_854_000, variants: ['MS'] },
      { year: 1933, mintage: 5_240_000, variants: ['MS'], note: 'Nejnižší náklad meziválečných ročníků.' },
      { year: 1937, mintage: 20_191_000, variants: ['MS'] },
      { year: 1938, mintage: 28_387_000, variants: ['MS'] },
    ],
  },
  {
    slug: '1-dukat',
    periodSlug: 'prvni-republika',
    name: '1 Dukát',
    subtitle: 'Svatováclavský dukát',
    metal: 'Au',
    parameters: {
      denomination: '1 dukát',
      composition: 'Zlato 986/1000',
      weightGrams: 3.49,
      diameterMm: 19.75,
      edge: 'Hladká',
      designer: 'Otakar Španiel / Jaroslav Benda',
      mint: 'Kremnica',
    },
    description:
      'Svatováclavský dukát je nejslavnější českou zlatou ražbou 20. století. Nejde o oběžnou minci, ale o obchodní ražbu navazující na středověkou dukátovou tradici. Nízké náklady pozdějších ročníků z nich činí mimořádné rarity.',
    issues: [
      { year: 1923, mintage: 61_861, variants: ['MS', 'PL'], note: 'První ročník svatováclavských dukátů.' },
      { year: 1925, mintage: 17_010, variants: ['MS', 'PL'] },
      { year: 1929, mintage: 17_348, variants: ['MS', 'PL'] },
      { year: 1931, mintage: 8_351, variants: ['MS', 'PL'] },
      { year: 1933, mintage: 8_519, variants: ['MS', 'PL'] },
    ],
  },
  {
    slug: '1-koruna',
    periodSlug: 'protektorat',
    name: '1 Koruna',
    metal: 'Zn',
    parameters: {
      denomination: '1 K',
      composition: 'Zinek 100/100',
      weightGrams: 4.5,
      diameterMm: 23,
      edge: 'Hladká',
      designer: 'Otakar Španiel (úprava)',
      mint: 'Lysá nad Labem',
    },
    description:
      'Zinková koruna protektorátu vychází z prvorepublikové jednokoruny, lipovou ratolest však doplňuje dvojjazyčný opis. Zinek snadno koroduje, proto jsou kusy v bezvadném mincovním stavu výrazně vzácnější, než napovídá vysoký náklad.',
    issues: [
      { year: 1941, mintage: 64_924_000, variants: ['MS'] },
      { year: 1942, mintage: 76_074_000, variants: ['MS'] },
      { year: 1943, mintage: 56_168_000, variants: ['MS'] },
      { year: 1944, mintage: 35_000_000, variants: ['MS'] },
    ],
  },
  {
    slug: '20-haleru',
    periodSlug: 'protektorat',
    name: '20 Haléřů',
    metal: 'Zn',
    parameters: {
      denomination: '20 h',
      composition: 'Zinek 100/100',
      weightGrams: 2.63,
      diameterMm: 20,
      edge: 'Hladká',
      designer: 'Otakar Španiel (úprava)',
      mint: 'Lysá nad Labem',
    },
    description:
      'Drobný zinkový dvacetihaléř protektorátu, ražený v letech 1940–1944. Vinou měkkého kovu a válečného oběhu se ve sbírkové kvalitě dochoval jen zlomek nákladu.',
    issues: [
      { year: 1940, mintage: 36_392_000, variants: ['MS'] },
      { year: 1941, mintage: 60_815_000, variants: ['MS'] },
      { year: 1942, mintage: 41_836_000, variants: ['MS'] },
      { year: 1943, mintage: 31_615_000, variants: ['MS'] },
      { year: 1944, mintage: 21_327_000, variants: ['MS'] },
    ],
  },
  {
    slug: '50-haleru',
    periodSlug: 'protektorat',
    name: '50 Haléřů',
    metal: 'Zn',
    parameters: {
      denomination: '50 h',
      composition: 'Zinek 100/100',
      weightGrams: 3.7,
      diameterMm: 22,
      edge: 'Hladká',
      designer: 'Otakar Španiel (úprava)',
      mint: 'Lysá nad Labem',
    },
    description:
      'Padesátihaléř s lipovými lístky patří k typickým protektorátním ražbám. Ročník 1942 vyniká citelně nižším nákladem a ve vyšších stavech patří k nejhledanějším mincím období.',
    issues: [
      { year: 1940, mintage: 29_050_000, variants: ['MS'] },
      { year: 1941, mintage: 49_002_000, variants: ['MS'] },
      { year: 1942, mintage: 8_360_000, variants: ['MS'], note: 'Klíčový ročník typu s nejnižším nákladem.' },
      { year: 1943, mintage: 26_050_000, variants: ['MS'] },
      { year: 1944, mintage: 15_825_000, variants: ['MS'] },
    ],
  },
]
