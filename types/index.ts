export type CurrencyMode = 'EUR' | 'BGN';

export interface SalaryDataPoint {
  year: number;
  periodLabel?: string;
  nominalWageBGN: number;
  nominalWageEUR: number;
  wageIndex: number;
  cpiIndex: number;
  realWageIndex: number;
  annualInflation: number;
  // Everyday purchasing metrics (how many units 1 average monthly net wage buys)
  purchasingBreadLoaves: number; // Брой хлябове
  purchasingFuelLiters: number;  // Литри гориво (A95)
}

export interface PeriodOption {
  id: string;
  label: string;
  start: number;
  end: number;
}

export interface SalaryDataset {
  indicator: string;
  shortTitle: string;
  baseYear: number;
  baseValue: number;
  unitEUR: string;
  unitBGN: string;
  source: {
    name: string;
    dataset: string;
    url: string;
    lastVerified: string;
  };
  methodologicalNote: string;
  series: SalaryDataPoint[];
  periods: PeriodOption[];
  insights: Record<string, string>;
}

export interface RegionIndicator {
  id: 'salary' | 'population_change' | 'housing_affordability';
  name: string;
  shortName: string;
  unitEUR: string;
  unitBGN: string;
  period: string;
  nationalAverageEUR: number;
  nationalAverageBGN: number;
  nationalLabelEUR: string;
  nationalLabelBGN: string;
  description: string;
  methodologicalNote: string;
}

export interface RegionDataPoint {
  code: string;
  name: string;
  salaryBGN: number;
  salaryEUR: number;
  populationChange: number;
  population2021: number;
  sqmPriceEUR: number; // Цена на кв.м жилище в евро
  salaryPerSqmMonths: number; // Колко месечни заплати са нужни за 1 кв.м
}

export interface RegionsDataset {
  title: string;
  source: {
    name: string;
    dataset: string;
    url: string;
    lastVerified: string;
  };
  indicators: RegionIndicator[];
  regions: RegionDataPoint[];
}

export interface EuropeIndicator {
  id: 'gdp_pps' | 'aic_pps';
  name: string;
  shortName: string;
  unit: string;
  period: string;
  euAverage: number;
  bulgariaValue: number;
  description: string;
  explanation: string;
  whatItDoesNotShow: string;
}

export interface CountryDataPoint {
  code: string;
  name: string;
  gdp_pps: number;
  aic_pps: number;
  isBulgaria?: boolean;
  isAverage?: boolean;
}

export interface EuropeDataset {
  title: string;
  source: {
    name: string;
    dataset: string;
    url: string;
    lastVerified: string;
  };
  indicators: EuropeIndicator[];
  countries: CountryDataPoint[];
}

export interface KeyFact {
  id: string;
  tag: string;
  bigNumber: string;
  prefix?: string;
  suffix?: string;
  label: string;
  humanAnalogy: string; // Разбираемо обяснение за всеки човек
  detail: string;
  period: string;
  sourceName: string;
  sourceUrl: string;
}

export interface KeyFactsDataset {
  title: string;
  subtitle: string;
  facts: KeyFact[];
}

export interface SourceInstitution {
  name: string;
  abbr: string;
  role: string;
  url: string;
  directPortals: { title: string; url: string }[];
}

export interface SourcesDataset {
  title: string;
  subtitle: string;
  statement: string;
  institutions: SourceInstitution[];
}
