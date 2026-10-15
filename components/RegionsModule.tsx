'use client';

import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';
import { ExternalLink, ArrowUpDown, Search, Map as MapIcon, BarChart2 } from 'lucide-react';
import BulgariaInteractiveMap from './BulgariaInteractiveMap';
import regionsDataRaw from '@/data/regions.json';
import { RegionsDataset, CurrencyMode } from '@/types';

const regionsData = regionsDataRaw as RegionsDataset;

interface RegionsModuleProps {
  currency: CurrencyMode;
}

export default function RegionsModule({ currency }: RegionsModuleProps) {
  const [activeIndicatorId, setActiveIndicatorId] = useState<'salary' | 'population_change'>('salary');
  const [viewFormat, setViewFormat] = useState<'map' | 'chart'>('map');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('SOF');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentIndicator = useMemo(() => {
    return regionsData.indicators.find((ind) => ind.id === activeIndicatorId) || regionsData.indicators[0];
  }, [activeIndicatorId]);

  // Processed and sorted list for chart view
  const processedRegions = useMemo(() => {
    let list = [...regionsData.regions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      let valA: number;
      let valB: number;

      if (activeIndicatorId === 'salary') {
        valA = currency === 'EUR' ? a.salaryEUR : a.salaryBGN;
        valB = currency === 'EUR' ? b.salaryEUR : b.salaryBGN;
      } else {
        valA = a.populationChange;
        valB = b.populationChange;
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

    return list;
  }, [activeIndicatorId, sortOrder, searchQuery, currency]);

  // Selected province details
  const selectedProvince = useMemo(() => {
    return regionsData.regions.find((r) => r.code === selectedProvinceCode) || regionsData.regions[0];
  }, [selectedProvinceCode]);

  // Rank calculation
  const provinceRank = useMemo(() => {
    const sorted = [...regionsData.regions].sort((a, b) => {
      if (activeIndicatorId === 'salary') {
        return (currency === 'EUR' ? b.salaryEUR : b.salaryBGN) - (currency === 'EUR' ? a.salaryEUR : a.salaryBGN);
      } else {
        return b.populationChange - a.populationChange;
      }
    });
    const idx = sorted.findIndex((r) => r.code === selectedProvinceCode);
    return idx !== -1 ? idx + 1 : 1;
  }, [selectedProvinceCode, activeIndicatorId, currency]);

  const currencySymbol = currency === 'EUR' ? '€' : 'лв.';
  const nationalAvg = currency === 'EUR' ? currentIndicator.nationalAverageEUR : currentIndicator.nationalAverageBGN;

  return (
    <section id="regions" className="py-14 md:py-20 border-b border-[#E7E5E0] bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold mb-2">
              Модул 02 • Регионални различия
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight font-normal">
              Еднаква държава. Различни реалности.
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              Разгледай 28-те области на България чрез интерактивна географска карта или пълна класация.
            </p>
          </div>

          {/* View Mode Toggle: Map vs Chart */}
          <div className="inline-flex items-center bg-white border border-stone-300 p-1 text-xs font-mono self-start md:self-auto shadow-sm">
            <button
              onClick={() => setViewFormat('map')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-all ${
                viewFormat === 'map'
                  ? 'bg-blue-700 text-white font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Карта на България</span>
            </button>
            <button
              onClick={() => setViewFormat('chart')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-all ${
                viewFormat === 'chart'
                  ? 'bg-blue-700 text-white font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Класация (Графика)</span>
            </button>
          </div>
        </div>

        {/* Selected Area Highlight Strip */}
        <div className="mb-6 p-4 bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-400 uppercase">Избрана област:</span>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.2 border border-blue-100 font-semibold">
                Място #{provinceRank} от 28
              </span>
            </div>
            <span className="font-serif font-bold text-xl text-stone-900 mt-0.5 block">
              Област {selectedProvince.name}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-stone-400 block">Средна заплата:</span>
              <span className="text-stone-900 font-bold text-base">
                {currency === 'EUR' ? `${selectedProvince.salaryEUR.toLocaleString()} €` : `${selectedProvince.salaryBGN.toLocaleString()} лв.`}
              </span>
            </div>

            <div>
              <span className="text-stone-400 block">Промяна 2011–2021:</span>
              <span className={`font-bold text-base ${selectedProvince.populationChange > 0 ? 'text-emerald-700' : 'text-amber-800'}`}>
                {selectedProvince.populationChange > 0 ? `+${selectedProvince.populationChange}%` : `${selectedProvince.populationChange}%`}
              </span>
            </div>

            <div className="hidden sm:block">
              <span className="text-stone-400 block">Население (2021):</span>
              <span className="text-stone-700 font-medium">
                {selectedProvince.population2021.toLocaleString()} д.
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Box: Map OR Bar Chart */}
        <div className="bg-white border border-stone-200 p-4 sm:p-6 shadow-sm">
          
          {/* Controls Bar: Indicators & Search */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
            {/* Indicator Tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-500 uppercase mr-1">Показател:</span>
              <button
                onClick={() => setActiveIndicatorId('salary')}
                className={`px-3 py-1 text-xs font-mono transition-all ${
                  activeIndicatorId === 'salary'
                    ? 'bg-blue-700 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Средна заплата
              </button>
              <button
                onClick={() => setActiveIndicatorId('population_change')}
                className={`px-3 py-1 text-xs font-mono transition-all ${
                  activeIndicatorId === 'population_change'
                    ? 'bg-blue-700 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Демографска промяна (2011–2021)
              </button>
            </div>

            {/* If in chart view, show search & sort */}
            {viewFormat === 'chart' && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Търси област..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 pr-2 py-1 text-xs font-mono border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none w-32 sm:w-36"
                  />
                </div>

                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="p-1 border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900"
                  title="Смени подредбата"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* VIEW 1: Interactive SVG Map */}
          {viewFormat === 'map' ? (
            <BulgariaInteractiveMap
              activeIndicatorId={activeIndicatorId}
              currency={currency}
              selectedProvinceCode={selectedProvinceCode}
              onSelectProvince={setSelectedProvinceCode}
            />
          ) : (
            /* VIEW 2: Horizontal Bar Chart */
            <div 
              className="w-full pt-2 transition-all duration-300"
              style={{ height: `${processedRegions.length * 24 + 40}px` }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={processedRegions}
                  margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#9CA3AF"
                    tick={{ fill: '#4B5563', fontSize: 10, fontFamily: 'monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E2DA' }}
                    domain={
                      activeIndicatorId === 'salary'
                        ? (currency === 'EUR' ? [700, 2200] : [1400, 4200])
                        : [-30, 5]
                    }
                    tickFormatter={(v) => (activeIndicatorId === 'salary' ? `${v} ${currencySymbol}` : `${v}%`)}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9CA3AF"
                    tick={{ fill: '#1F2937', fontSize: 11, fontFamily: 'sans-serif' }}
                    tickLine={false}
                    axisLine={false}
                    width={120}
                  />
                  <ReferenceLine
                    x={nationalAvg}
                    stroke="#1D4ED8"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload;
                      const salaryVal = currency === 'EUR' ? `${d.salaryEUR.toLocaleString()} €` : `${d.salaryBGN.toLocaleString()} лв.`;
                      return (
                        <div className="bg-white border border-stone-200 p-2.5 shadow-md rounded-none text-xs font-mono space-y-1 min-w-[180px]">
                          <div className="font-bold text-stone-900 border-b border-stone-100 pb-1">
                            Област {d.name}
                          </div>
                          <div className="flex justify-between items-center text-blue-700">
                            <span>{activeIndicatorId === 'salary' ? 'Средна заплата:' : 'Промяна:'}</span>
                            <span className="font-bold tabular-nums">
                              {activeIndicatorId === 'salary' ? salaryVal : `${d.populationChange > 0 ? '+' : ''}${d.populationChange}%`}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-stone-500 text-[10px]">
                            <span>Население:</span>
                            <span className="tabular-nums">{d.population2021.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey={activeIndicatorId === 'salary' ? (currency === 'EUR' ? 'salaryEUR' : 'salaryBGN') : 'populationChange'}
                    radius={[0, 2, 2, 0]}
                    onClick={(entry) => setSelectedProvinceCode(entry.code)}
                    className="cursor-pointer"
                  >
                    {processedRegions.map((entry) => {
                      const isSelected = entry.code === selectedProvinceCode;
                      let fillColor = '#64748B';

                      if (activeIndicatorId === 'salary') {
                        if (isSelected) fillColor = '#1D4ED8';
                        else if ((currency === 'EUR' ? entry.salaryEUR : entry.salaryBGN) >= nationalAvg) fillColor = '#1E3A8A';
                        else fillColor = '#94A3B8';
                      } else {
                        if (isSelected) fillColor = '#1D4ED8';
                        else if (entry.populationChange > 0) fillColor = '#059669';
                        else if (entry.populationChange < -20) fillColor = '#991B1B';
                        else fillColor = '#B45309';
                      }

                      return (
                        <Cell
                          key={`cell-${entry.code}`}
                          fill={fillColor}
                          stroke={isSelected ? '#172554' : 'none'}
                          strokeWidth={isSelected ? 1.5 : 0}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Source Link */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Източник: {regionsData.source.name}</span>
            <a
              href={regionsData.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              <span>НСИ Данни</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
