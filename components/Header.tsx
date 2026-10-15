'use client';

import { CurrencyMode } from '@/types';

interface HeaderProps {
  currency: CurrencyMode;
  onCurrencyChange: (c: CurrencyMode) => void;
}

export default function Header({ currency, onCurrencyChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E5E0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Only: БЪЛГАРИЯ, НО В ЧИСЛА */}
        <a href="#" className="font-serif font-bold text-lg sm:text-xl tracking-tight text-stone-900 hover:text-blue-700 transition-colors">
          България, но в числа
        </a>

        {/* Minimal Currency Switcher: € EUR / лв. BGN */}
        <div className="flex items-center text-xs font-mono border border-stone-300 bg-white">
          <button
            type="button"
            onClick={() => onCurrencyChange('EUR')}
            className={`px-3 py-1 transition-colors ${
              currency === 'EUR'
                ? 'bg-blue-700 text-white font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            € EUR
          </button>
          <button
            type="button"
            onClick={() => onCurrencyChange('BGN')}
            className={`px-3 py-1 transition-colors ${
              currency === 'BGN'
                ? 'bg-stone-900 text-white font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            лв. BGN
          </button>
        </div>

      </div>
    </header>
  );
}
