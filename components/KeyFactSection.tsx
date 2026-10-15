'use client';

import { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import keyFactsRaw from '@/data/key-facts.json';
import { KeyFactsDataset } from '@/types';

const keyFactsData = keyFactsRaw as KeyFactsDataset;

export default function KeyFactSection() {
  const [activeFactIndex, setActiveFactIndex] = useState(0);

  const activeFact = keyFactsData.facts[activeFactIndex];

  const handlePrev = () => {
    setActiveFactIndex((prev) => (prev === 0 ? keyFactsData.facts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveFactIndex((prev) => (prev === keyFactsData.facts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="key-fact" className="py-16 md:py-20 border-b border-[#E7E5E0] bg-[#111827] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-800">
          <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
            Секция C • Числа, които си струва да знаеш
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500 mr-2">
              {activeFactIndex + 1} от {keyFactsData.facts.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1.5 border border-stone-800 hover:border-stone-600 text-stone-300"
              aria-label="Предишен факт"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 border border-stone-800 hover:border-stone-600 text-stone-300"
              aria-label="Следващ факт"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Fact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              {activeFact.period} • {activeFact.tag}
            </div>

            <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white tabular-nums">
              {activeFact.bigNumber}
              {activeFact.suffix && <span className="text-2xl sm:text-3xl font-normal ml-2 text-stone-300">{activeFact.suffix}</span>}
            </div>

            <p className="font-serif text-lg sm:text-xl text-stone-200 leading-snug font-normal pt-1">
              {activeFact.label}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-stone-800 lg:pl-8">
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {activeFact.detail}
            </p>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
              <a
                href={activeFact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1"
              >
                <span>{activeFact.sourceName}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Indicator dots */}
            <div className="flex items-center gap-2 pt-1">
              {keyFactsData.facts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFactIndex(i)}
                  className={`h-1.5 transition-all ${
                    activeFactIndex === i ? 'w-6 bg-blue-500' : 'w-2 bg-stone-700 hover:bg-stone-500'
                  }`}
                  aria-label={`Към факт ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
