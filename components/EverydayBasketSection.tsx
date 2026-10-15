'use client';

import { useState } from 'react';
import { ShoppingBag, Fuel, Coffee, Home, Utensils, ArrowRight, Sparkles } from 'lucide-react';
import { CurrencyMode } from '@/types';

interface EverydayBasketProps {
  currency: CurrencyMode;
}

export default function EverydayBasketSection({ currency }: EverydayBasketProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const yearsData = [
    {
      year: 2015,
      label: '2015 г.',
      wageEUR: 449,
      wageBGN: 878,
      breadPriceEUR: 0.51,
      breadPriceBGN: 1.00,
      breadUnits: 680,
      fuelPriceEUR: 1.10,
      fuelPriceBGN: 2.15,
      fuelLiters: 315,
      coffeePriceEUR: 0.50,
      coffeePriceBGN: 1.00,
      coffeeCups: 700,
      electricityKwhPriceEUR: 0.09,
      electricityKwhPriceBGN: 0.18,
      electricityKwh: 3900,
      headline: 'Скромно начало',
      summary: 'Ниски цени в лева, но и ниски заплати. Една средна заплата покриваше основните нужди, но за пътуване или по-скъпа техника се пестеше с месеци.'
    },
    {
      year: 2020,
      label: '2020 г.',
      wageEUR: 709,
      wageBGN: 1387,
      breadPriceEUR: 0.56,
      breadPriceBGN: 1.10,
      breadUnits: 975,
      fuelPriceEUR: 0.95,
      fuelPriceBGN: 1.86,
      fuelLiters: 560,
      coffeePriceEUR: 0.70,
      coffeePriceBGN: 1.35,
      coffeeCups: 780,
      electricityKwhPriceEUR: 0.11,
      electricityKwhPriceBGN: 0.22,
      electricityKwh: 4900,
      headline: 'Златният баланс преди бурята',
      summary: 'Цените бяха все още спокойни, а заплатите растяха бързо. Покупателната сила скочи осезаемо в цялата страна.'
    },
    {
      year: 2022,
      label: '2022 г. (Пик инфлация)',
      wageEUR: 904,
      wageBGN: 1768,
      breadPriceEUR: 0.77,
      breadPriceBGN: 1.50,
      breadUnits: 960,
      fuelPriceEUR: 1.69,
      fuelPriceBGN: 3.30,
      fuelLiters: 420,
      coffeePriceEUR: 1.00,
      coffeePriceBGN: 1.95,
      coffeeCups: 720,
      electricityKwhPriceEUR: 0.15,
      electricityKwhPriceBGN: 0.29,
      electricityKwh: 4800,
      headline: 'Инфлационният шок',
      summary: 'Бензинът прескочи 3.30 лв. (1.69 €), храните поскъпнаха с 25-30%. Заплатите номинално скочиха, но в магазина парите се топяха мигновено.'
    },
    {
      year: 2026,
      label: '2026 г. (Днес в евро)',
      wageEUR: 1424,
      wageBGN: 2785,
      breadPriceEUR: 0.82,
      breadPriceBGN: 1.60,
      breadUnits: 1310,
      fuelPriceEUR: 1.35,
      fuelPriceBGN: 2.64,
      fuelLiters: 770,
      coffeePriceEUR: 1.25,
      coffeePriceBGN: 2.45,
      coffeeCups: 910,
      electricityKwhPriceEUR: 0.16,
      electricityKwhPriceBGN: 0.31,
      electricityKwh: 7100,
      headline: 'Двойно по-висока реална кошница',
      summary: 'Цените са по-високи от всякога, но заплатите са се утроили. Днес със средно възнаграждение се купува почти два пъти повече гориво и храна спрямо 2015 г.'
    }
  ];

  const currentYearData = yearsData.find((y) => y.year === selectedYear) || yearsData[3];
  const base2015 = yearsData[0];

  const formatMoney = (eur: number, bgn: number) => {
    return currency === 'EUR' ? `${eur.toLocaleString()} €` : `${bgn.toLocaleString()} лв.`;
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#E7E5E0] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold mb-2 bg-emerald-50 px-3 py-1 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Реален живот • Кошницата на българина</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight font-normal">
            Какво всъщност купуваха парите ни тогава и сега?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed font-light">
            Статистиката става най-ясна, когато слезем от сложните проценти до обикновения пазар. Виж колко хляба, гориво, кафета и битов ток може да си позволи едно средно българско възнаграждение през годините.
          </p>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider mr-2">
            Избери година за съпоставка:
          </span>
          {yearsData.map((y) => (
            <button
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              className={`px-4 py-2 text-xs sm:text-sm font-mono transition-all ${
                selectedYear === y.year
                  ? 'bg-blue-700 text-white font-bold shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        {/* Big Visual Basket Card */}
        <div className="bg-[#FAF9F5] border border-stone-200 p-6 sm:p-8 shadow-sm">
          
          {/* Top Banner of Selected Year */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-wider font-semibold">
                Средна брутна заплата за {currentYearData.year} г.
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tabular-nums mt-1">
                {formatMoney(currentYearData.wageEUR, currentYearData.wageBGN)}
                <span className="text-xs font-mono text-stone-500 font-normal ml-3">
                  ({currency === 'EUR' ? `${currentYearData.wageBGN.toLocaleString()} лв.` : `${currentYearData.wageEUR.toLocaleString()} €`})
                </span>
              </div>
            </div>

            <div className="max-w-md bg-white border border-stone-200 p-3 text-xs text-stone-700 font-light leading-relaxed">
              <span className="font-bold text-stone-900 font-serif block mb-0.5">
                {currentYearData.headline}
              </span>
              {currentYearData.summary}
            </div>
          </div>

          {/* 4 Everyday Relatable Goods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Хляб */}
            <div className="bg-white border border-stone-200 p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-stone-500">Брой самуни бял хляб</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                  {currentYearData.breadUnits.toLocaleString()} бр.
                </div>
                <div className="text-xs text-stone-500 font-mono mt-1">
                  при ср. цена {formatMoney(currentYearData.breadPriceEUR, currentYearData.breadPriceBGN)} / бр.
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Спрямо 2015 г.:</span>
                <span className="text-emerald-700 font-bold">
                  {currentYearData.year === 2015 ? 'Базова' : `+${(((currentYearData.breadUnits - base2015.breadUnits) / base2015.breadUnits) * 100).toFixed(0)}% повече`}
                </span>
              </div>
            </div>

            {/* 2. Гориво */}
            <div className="bg-white border border-stone-200 p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <Fuel className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-stone-500">Литри бензин А-95</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                  {currentYearData.fuelLiters.toLocaleString()} л.
                </div>
                <div className="text-xs text-stone-500 font-mono mt-1">
                  при ср. цена {formatMoney(currentYearData.fuelPriceEUR, currentYearData.fuelPriceBGN)} / литър
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Спрямо 2015 г.:</span>
                <span className="text-emerald-700 font-bold">
                  {currentYearData.year === 2015 ? 'Базова' : `+${(((currentYearData.fuelLiters - base2015.fuelLiters) / base2015.fuelLiters) * 100).toFixed(0)}% повече`}
                </span>
              </div>
            </div>

            {/* 3. Кафе */}
            <div className="bg-white border border-stone-200 p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-stone-100 text-stone-700 flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-stone-500">Чаши кафе еспресо</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                  {currentYearData.coffeeCups.toLocaleString()} чаши
                </div>
                <div className="text-xs text-stone-500 font-mono mt-1">
                  при ср. цена {formatMoney(currentYearData.coffeePriceEUR, currentYearData.coffeePriceBGN)} / чаша
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Спрямо 2015 г.:</span>
                <span className="text-emerald-700 font-bold">
                  {currentYearData.year === 2015 ? 'Базова' : `+${(((currentYearData.coffeeCups - base2015.coffeeCups) / base2015.coffeeCups) * 100).toFixed(0)}% повече`}
                </span>
              </div>
            </div>

            {/* 4. Електроенергия */}
            <div className="bg-white border border-stone-200 p-5 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-stone-500">Битов ток (киловатчаса)</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                  {currentYearData.electricityKwh.toLocaleString()} kWh
                </div>
                <div className="text-xs text-stone-500 font-mono mt-1">
                  при ср. цена {formatMoney(currentYearData.electricityKwhPriceEUR, currentYearData.electricityKwhPriceBGN)} / kWh
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Спрямо 2015 г.:</span>
                <span className="text-emerald-700 font-bold">
                  {currentYearData.year === 2015 ? 'Базова' : `+${(((currentYearData.electricityKwh - base2015.electricityKwh) / base2015.electricityKwh) * 100).toFixed(0)}% повече`}
                </span>
              </div>
            </div>

          </div>

          {/* Educational Note */}
          <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-mono text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              💡 Изчисленията се базират на средните цени на дребно от бюлетините на НСИ и средната нетна работна заплата.
            </div>
            <div>
              Валутен курс: 1 EUR = 1.95583 BGN
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
