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
import { ExternalLink } from 'lucide-react';
import europeDataRaw from '@/data/europe-comparison.json';
import { EuropeDataset } from '@/types';

const europeData = europeDataRaw as EuropeDataset;

export default function EuropeModule() {
  const [activeIndicatorId, setActiveIndicatorId] = useState<'gdp_pps' | 'aic_pps'>('gdp_pps');

  const currentIndicator = useMemo(() => {
    return europeData.indicators.find((ind) => ind.id === activeIndicatorId) || europeData.indicators[0];
  }, [activeIndicatorId]);

  // Processed and sorted countries list (including EU27 average for visual benchmark)
  const processedCountries = useMemo(() => {
    const list = [...europeData.countries];
    list.sort((a, b) => {
      const valA = activeIndicatorId === 'gdp_pps' ? a.gdp_pps : a.aic_pps;
      const valB = activeIndicatorId === 'gdp_pps' ? b.gdp_pps : b.aic_pps;
      return valB - valA;
    });
    return list;
  }, [activeIndicatorId]);

  // Calculate rank strictly over the 27 EU member states (excluding EU27 average)
  const bgData = useMemo(() => {
    const memberStates = europeData.countries.filter((c) => !c.isAverage);
    memberStates.sort((a, b) => {
      const valA = activeIndicatorId === 'gdp_pps' ? a.gdp_pps : a.aic_pps;
      const valB = activeIndicatorId === 'gdp_pps' ? b.gdp_pps : b.aic_pps;
      return valB - valA;
    });
    const rank = memberStates.findIndex((c) => c.isBulgaria) + 1;
    const total = memberStates.length;
    const bgEntry = memberStates.find((c) => c.isBulgaria);
    const value = bgEntry ? (activeIndicatorId === 'gdp_pps' ? bgEntry.gdp_pps : bgEntry.aic_pps) : 68;
    return { rank, total, value };
  }, [activeIndicatorId]);

  return (
    <section id="europe" className="py-14 md:py-20 border-b border-[#E7E5E0] bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold mb-2">
            Модул 03 • Европейски контекст
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight font-normal">
            Къде се намираме спрямо Европа?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
            Сравнение на България с 27-те държави в ЕС по паритет на покупателната способност (ППС). Чрез премахване на разликите в цените виждаме реалния обем на икономиката и потреблението.
          </p>
        </div>

        {/* Bulgaria Highlights KPI Card */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-stone-200 p-4">
            <div className="text-xs font-mono uppercase text-stone-500">Позиция в ЕС</div>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
              #{bgData.rank} от {bgData.total}
            </div>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              {activeIndicatorId === 'gdp_pps' ? 'Преди Гърция (67%)' : 'Преди Унгария (71%)'}
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-4">
            <div className="text-xs font-mono uppercase text-stone-500">Стойност за България</div>
            <div className="text-2xl font-serif font-bold text-blue-700 mt-1 tabular-nums">
              {bgData.value}%
            </div>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              Спрямо средното за ЕС (100%)
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-4">
            <div className="text-xs font-mono uppercase text-stone-500">Ръст от 2007 г.</div>
            <div className="text-2xl font-serif font-bold text-emerald-700 mt-1 tabular-nums">
              +24 п.п.
            </div>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              От 44% при присъединяването
            </div>
          </div>
        </div>

        {/* Chart Box */}
        <div className="bg-white border border-stone-200 p-4 sm:p-6 shadow-sm">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-500 uppercase mr-1">Показател:</span>
              {europeData.indicators.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndicatorId(ind.id as 'gdp_pps' | 'aic_pps')}
                  className={`px-3 py-1 text-xs font-mono transition-all ${
                    activeIndicatorId === ind.id
                      ? 'bg-blue-700 text-white font-medium'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {ind.shortName}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-400 font-mono">
              ЕС-27 Средно = 100
            </div>
          </div>

          {/* Chart Canvas */}
          <div 
            className="w-full pt-2 transition-all duration-300"
            style={{ height: `${processedCountries.length * 24 + 40}px` }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={processedCountries}
                margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#9CA3AF"
                  tick={{ fill: '#4B5563', fontSize: 10, fontFamily: 'monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2DA' }}
                  domain={[0, 250]}
                  tickFormatter={(v) => `${v}%`}
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
                  x={100}
                  stroke="#111827"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const d = payload[0].payload;
                    const val = activeIndicatorId === 'gdp_pps' ? d.gdp_pps : d.aic_pps;
                    return (
                      <div className="bg-white border border-stone-200 p-2.5 shadow-md rounded-none text-xs font-mono space-y-1 min-w-[180px]">
                        <div className="font-bold text-stone-900 border-b border-stone-100 pb-1">
                          {d.name} {d.isBulgaria && '(България)'}
                        </div>
                        <div className="flex justify-between items-center text-blue-700">
                          <span>{currentIndicator.shortName}:</span>
                          <span className="font-bold tabular-nums">{val}%</span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey={activeIndicatorId === 'gdp_pps' ? 'gdp_pps' : 'aic_pps'}
                  radius={[0, 2, 2, 0]}
                >
                  {processedCountries.map((entry) => {
                    let fillColor = '#94A3B8';
                    if (entry.isBulgaria) fillColor = '#1D4ED8';
                    else if (entry.isAverage) fillColor = '#111827';
                    else if ((activeIndicatorId === 'gdp_pps' ? entry.gdp_pps : entry.aic_pps) >= 100) fillColor = '#475569';

                    return (
                      <Cell
                        key={`cell-${entry.code}`}
                        fill={fillColor}
                        stroke={entry.isBulgaria ? '#172554' : 'none'}
                        strokeWidth={entry.isBulgaria ? 1.5 : 0}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Simple Explanation Note */}
          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-light">
            <span className="font-semibold text-stone-900">Обяснение: </span>
            {currentIndicator.explanation}
          </div>

          {/* Source Link */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Източник: {europeData.source.name}</span>
            <a
              href={europeData.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              <span>Eurostat Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
