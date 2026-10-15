'use client';

import { useState, useMemo } from 'react';
import mapPathsData from '@/data/bulgaria-svg-paths.json';
import regionsDataRaw from '@/data/regions.json';
import { RegionsDataset, CurrencyMode } from '@/types';

const regionsData = regionsDataRaw as RegionsDataset;

interface BulgariaInteractiveMapProps {
  activeIndicatorId: 'salary' | 'population_change';
  currency: CurrencyMode;
  selectedProvinceCode: string;
  onSelectProvince: (code: string) => void;
}

export default function BulgariaInteractiveMap({
  activeIndicatorId,
  currency,
  selectedProvinceCode,
  onSelectProvince,
}: BulgariaInteractiveMapProps) {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // Quick lookup for region data by code
  const regionLookup = useMemo(() => {
    const map = new Map<string, (typeof regionsData.regions)[0]>();
    regionsData.regions.forEach((r) => map.set(r.code, r));
    return map;
  }, []);

  // Compute min, max, average for coloring
  const stats = useMemo(() => {
    if (activeIndicatorId === 'salary') {
      const values = regionsData.regions.map((r) =>
        currency === 'EUR' ? r.salaryEUR : r.salaryBGN
      );
      const min = Math.min(...values);
      const max = Math.max(...values);
      return { min, max };
    } else {
      const values = regionsData.regions.map((r) => r.populationChange);
      const min = Math.min(...values);
      const max = Math.max(...values);
      return { min, max };
    }
  }, [activeIndicatorId, currency]);

  // Color generator for choropleth
  const getFillColor = (code: string) => {
    const r = regionLookup.get(code);
    if (!r) return '#94A3B8';

    const isSelected = code === selectedProvinceCode;
    const isHovered = code === hoveredCode;

    if (activeIndicatorId === 'salary') {
      const val = currency === 'EUR' ? r.salaryEUR : r.salaryBGN;
      // Normalize between 0 and 1
      const t = Math.max(0, Math.min(1, (val - stats.min) / (stats.max - stats.min)));
      
      // Interpolate from light soft blue to deep cobalt
      if (isSelected) return '#1D4ED8';
      if (isHovered) return '#2563EB';

      // 4 discrete color steps for editorial cleanliness
      if (t > 0.8) return '#1E3A8A'; // Top (Sofia)
      if (t > 0.4) return '#3B82F6'; // Above average (Varna, Plovdiv, Stara Zagora)
      if (t > 0.2) return '#93C5FD'; // Average
      return '#BFDBFE';              // Lowest
    } else {
      // Population change: Green for Sofia (+1.2%), then shades of amber/red
      const val = r.populationChange;
      if (isSelected) return '#1D4ED8';
      if (isHovered) return '#2563EB';

      if (val > 0) return '#059669';       // Sofia positive
      if (val > -10) return '#D97706';     // Moderate decline
      if (val > -18) return '#DC2626';     // Strong decline
      return '#991B1B';                    // Severe decline (> -20%)
    }
  };

  const hoveredRegion = hoveredCode ? regionLookup.get(hoveredCode) : null;

  return (
    <div className="relative w-full">
      {/* SVG Map Container */}
      <div className="relative w-full bg-[#FAF9F5] border border-stone-200 p-2 sm:p-4 rounded-none overflow-hidden select-none">
        
        {/* Floating Tooltip inside map */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none bg-stone-900/95 text-white p-3 shadow-lg border border-stone-700 text-xs font-mono max-w-[220px]">
            <div className="font-bold text-sm font-serif text-white border-b border-stone-800 pb-1 mb-1.5">
              Област {hoveredRegion.name}
            </div>
            {activeIndicatorId === 'salary' ? (
              <div>
                <div className="text-blue-400 font-bold text-sm tabular-nums">
                  {currency === 'EUR'
                    ? `${hoveredRegion.salaryEUR.toLocaleString()} €`
                    : `${hoveredRegion.salaryBGN.toLocaleString()} лв.`}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  ({currency === 'EUR' ? `${hoveredRegion.salaryBGN.toLocaleString()} лв.` : `${hoveredRegion.salaryEUR.toLocaleString()} €`})
                </div>
              </div>
            ) : (
              <div>
                <div className={`font-bold text-sm tabular-nums ${hoveredRegion.populationChange > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {hoveredRegion.populationChange > 0 ? `+${hoveredRegion.populationChange}%` : `${hoveredRegion.populationChange}%`}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Население: {hoveredRegion.population2021.toLocaleString()} д.
                </div>
              </div>
            )}
            <div className="mt-1.5 pt-1.5 border-t border-stone-800 text-[10px] text-stone-400 italic">
              Кликни за избор
            </div>
          </div>
        )}

        {/* The SVG element */}
        <svg
          viewBox={mapPathsData.viewBox}
          className="w-full h-auto max-h-[500px] drop-shadow-sm transition-all"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mapPathsData.regions.map((pathItem) => {
            const isSelected = pathItem.code === selectedProvinceCode;
            const isHovered = pathItem.code === hoveredCode;
            const fillColor = getFillColor(pathItem.code);

            return (
              <g key={pathItem.code}>
                <path
                  id={pathItem.id}
                  d={pathItem.d}
                  fill={fillColor}
                  stroke={isSelected ? '#172554' : '#FFFFFF'}
                  strokeWidth={isSelected ? 2.5 : 1}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-all duration-150 hover:opacity-90"
                  onMouseEnter={() => setHoveredCode(pathItem.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onClick={() => onSelectProvince(pathItem.code)}
                />
              </g>
            );
          })}
        </svg>

        {/* Legend strip at bottom */}
        <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Легенда:</span>
            {activeIndicatorId === 'salary' ? (
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3.5 h-3.5 bg-[#BFDBFE] border border-stone-300" />
                <span>По-ниски</span>
                <span className="inline-block w-3.5 h-3.5 bg-[#93C5FD] border border-stone-300 ml-2" />
                <span className="inline-block w-3.5 h-3.5 bg-[#3B82F6] border border-stone-300" />
                <span className="inline-block w-3.5 h-3.5 bg-[#1E3A8A] border border-stone-300" />
                <span>Най-високи (София)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3.5 h-3.5 bg-[#059669] border border-stone-300" />
                <span>Ръст (София)</span>
                <span className="inline-block w-3.5 h-3.5 bg-[#D97706] border border-stone-300 ml-2" />
                <span>Спад до -10%</span>
                <span className="inline-block w-3.5 h-3.5 bg-[#DC2626] border border-stone-300 ml-2" />
                <span>Спад до -20%</span>
                <span className="inline-block w-3.5 h-3.5 bg-[#991B1B] border border-stone-300 ml-2" />
                <span>Спад над -20%</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-stone-400">
            💡 Кликни на област върху картата, за да я избереш
          </div>
        </div>

      </div>
    </div>
  );
}
