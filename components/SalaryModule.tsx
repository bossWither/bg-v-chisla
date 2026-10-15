'use client';

import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { ExternalLink } from 'lucide-react';
import salaryDataRaw from '@/data/salary-inflation.json';
import { SalaryDataset, CurrencyMode } from '@/types';

const salaryData = salaryDataRaw as SalaryDataset;

interface SalaryModuleProps {
  currency: CurrencyMode;
}

export default function SalaryModule({ currency }: SalaryModuleProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'index' | 'nominal'>('index');

  const currentPeriodConfig = useMemo(() => {
    return salaryData.periods.find((p) => p.id === selectedPeriod) || salaryData.periods[0];
  }, [selectedPeriod]);

  const filteredData = useMemo(() => {
    return salaryData.series.filter(
      (item) => item.year >= currentPeriodConfig.start && item.year <= currentPeriodConfig.end
    );
  }, [currentPeriodConfig]);

  // Dynamically calculate metrics from filtered data
  const dynamicMetrics = useMemo(() => {
    if (filteredData.length < 2) return null;
    const startPoint = filteredData[0];
    const endPoint = filteredData[filteredData.length - 1];

    const startWage = currency === 'EUR' ? startPoint.nominalWageEUR : startPoint.nominalWageBGN;
    const endWage = currency === 'EUR' ? endPoint.nominalWageEUR : endPoint.nominalWageBGN;

    const wageGrowth = (((endWage - startWage) / startWage) * 100).toFixed(1);
    const cpiGrowth = (((endPoint.cpiIndex - startPoint.cpiIndex) / startPoint.cpiIndex) * 100).toFixed(1);
    const realGrowth = (((endPoint.realWageIndex - startPoint.realWageIndex) / startPoint.realWageIndex) * 100).toFixed(1);

    return {
      startYear: startPoint.year,
      endYear: endPoint.year,
      startWage,
      endWage,
      wageGrowth,
      cpiGrowth,
      realGrowth,
    };
  }, [filteredData, currency]);

  const currencySymbol = currency === 'EUR' ? '€' : 'лв.';

  return (
    <section id="salaries" className="py-14 md:py-20 border-b border-[#E7E5E0] bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold mb-2">
            Модул 01 • Доходи и покупателна способност
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight font-normal">
            Печелим повече. А можем ли да си позволим повече?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
            Сравнение между ръста на средната брутна заплата и инфлацията (ИПЦ). Приравнени към базова 2015 г. = 100, данните показват реалната покупателна способност на доходите.
          </p>
        </div>

        {/* Chart Card */}
        <div className="bg-white border border-stone-200 p-4 sm:p-6 shadow-sm">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
            {/* Period Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-stone-500 uppercase mr-1">Период:</span>
              {salaryData.periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-3 py-1 text-xs font-mono transition-all ${
                    selectedPeriod === period.id
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('index')}
                className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                  viewMode === 'index'
                    ? 'border-b-2 border-blue-700 text-blue-800 font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Индекс (2015=100)
              </button>
              <span className="text-stone-300">|</span>
              <button
                onClick={() => setViewMode('nominal')}
                className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                  viewMode === 'nominal'
                    ? 'border-b-2 border-blue-700 text-blue-800 font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Заплата в {currencySymbol}
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          {dynamicMetrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-3 bg-stone-50 border border-stone-100 text-xs font-mono">
              <div>
                <span className="text-stone-500 block">Номинален ръст на заплатите:</span>
                <span className="text-xl font-serif font-bold text-blue-700 tabular-nums">
                  +{dynamicMetrics.wageGrowth}%
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  ({dynamicMetrics.startWage.toLocaleString()} {currencySymbol} → {dynamicMetrics.endWage.toLocaleString()} {currencySymbol})
                </span>
              </div>

              <div>
                <span className="text-stone-500 block">Натрупана инфлация (ИПЦ):</span>
                <span className="text-xl font-serif font-bold text-amber-700 tabular-nums">
                  +{dynamicMetrics.cpiGrowth}%
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  общо поскъпване на живота
                </span>
              </div>

              <div>
                <span className="text-stone-500 block">Реален ръст на парите:</span>
                <span className="text-xl font-serif font-bold text-emerald-700 tabular-nums">
                  +{dynamicMetrics.realGrowth}%
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  чиста покупателна печалба
                </span>
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="h-[320px] sm:h-[380px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'index' ? (
                <LineChart
                  data={filteredData}
                  margin={{ top: 15, right: 20, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="#9CA3AF"
                    tick={{ fill: '#4B5563', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E2DA' }}
                  />
                  <YAxis
                    domain={[80, 340]}
                    stroke="#9CA3AF"
                    tick={{ fill: '#4B5563', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ReferenceLine
                    y={100}
                    stroke="#D1D5DB"
                    strokeDasharray="4 4"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = salaryData.series.find(item => item.year === payload[0].payload.year) || payload[0].payload;
                      const wageVal = currency === 'EUR' ? d.nominalWageEUR : d.nominalWageBGN;
                      const otherVal = currency === 'EUR' ? d.nominalWageBGN : d.nominalWageEUR;
                      const otherSym = currency === 'EUR' ? 'лв.' : '€';
                      return (
                        <div className="bg-white border border-stone-200 p-2.5 shadow-md rounded-none text-xs font-mono space-y-1 min-w-[200px]">
                          <div className="font-bold text-stone-900 border-b border-stone-100 pb-1">
                            {d.periodLabel || `${d.year} година`}
                          </div>
                          <div className="flex justify-between items-center text-blue-700">
                            <span>Индекс заплата:</span>
                            <span className="font-bold tabular-nums">{d.wageIndex}</span>
                          </div>
                          <div className="flex justify-between items-center text-amber-700">
                            <span>Индекс цени (ИПЦ):</span>
                            <span className="font-bold tabular-nums">{d.cpiIndex}</span>
                          </div>
                          <div className="flex justify-between items-center text-emerald-700">
                            <span>Реална покупателност:</span>
                            <span className="font-bold tabular-nums">{d.realWageIndex}</span>
                          </div>
                          <div className="pt-1 border-t border-stone-100 flex justify-between text-stone-600">
                            <span>Ср. заплата:</span>
                            <span className="font-bold text-stone-900">{wageVal.toLocaleString()} {currencySymbol} ({otherVal.toLocaleString()} {otherSym})</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Line
                    type="monotone"
                    name="Индекс на брутната заплата"
                    dataKey="wageIndex"
                    stroke="#1D4ED8"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#1D4ED8' }}
                  />
                  <Line
                    type="monotone"
                    name="Индекс на потребителските цени (ИПЦ)"
                    dataKey="cpiIndex"
                    stroke="#B45309"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#B45309' }}
                  />
                  <Line
                    type="monotone"
                    name="Реална покупателна способност"
                    dataKey="realWageIndex"
                    stroke="#047857"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#047857' }}
                  />
                </LineChart>
              ) : (
                <LineChart
                  data={filteredData}
                  margin={{ top: 15, right: 20, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="#9CA3AF"
                    tick={{ fill: '#4B5563', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E2DA' }}
                  />
                  <YAxis
                    domain={currency === 'EUR' ? [350, 1600] : [700, 3100]}
                    stroke="#9CA3AF"
                    tick={{ fill: '#4B5563', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v} ${currencySymbol}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = salaryData.series.find(item => item.year === payload[0].payload.year) || payload[0].payload;
                      const wageVal = currency === 'EUR' ? d.nominalWageEUR : d.nominalWageBGN;
                      const otherVal = currency === 'EUR' ? d.nominalWageBGN : d.nominalWageEUR;
                      const otherSym = currency === 'EUR' ? 'лв.' : '€';
                      return (
                        <div className="bg-white border border-stone-200 p-2.5 shadow-md rounded-none text-xs font-mono space-y-1 min-w-[190px]">
                          <div className="font-bold text-stone-900 border-b border-stone-100 pb-1">
                            {d.periodLabel || `${d.year} година`}
                          </div>
                          <div className="flex justify-between items-center text-blue-700">
                            <span>Средна работна заплата:</span>
                            <span className="font-bold tabular-nums">{wageVal.toLocaleString()} {currencySymbol}</span>
                          </div>
                          <div className="flex justify-between items-center text-stone-500 text-[11px]">
                            <span>Равностойност:</span>
                            <span className="tabular-nums">{otherVal.toLocaleString()} {otherSym}</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '15px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Line
                    type="monotone"
                    name={`Средна работна заплата (${currencySymbol})`}
                    dataKey={currency === 'EUR' ? 'nominalWageEUR' : 'nominalWageBGN'}
                    stroke="#1D4ED8"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#1D4ED8' }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Simple Editorial Conclusion */}
          <div className="mt-5 p-3.5 bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
            <span className="font-semibold text-stone-900">Извод от данните: </span>
            {salaryData.insights[selectedPeriod] || salaryData.insights['all']}
          </div>

          {/* Source Link */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Източник: {salaryData.source.name}</span>
            <a
              href={salaryData.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              <span>НСИ Портал</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
