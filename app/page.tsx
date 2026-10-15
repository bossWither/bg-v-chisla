'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SalaryModule from '@/components/SalaryModule';
import RegionsModule from '@/components/RegionsModule';
import EuropeModule from '@/components/EuropeModule';
import KeyFactSection from '@/components/KeyFactSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import { CurrencyMode } from '@/types';

export default function HomePage() {
  const [currency, setCurrency] = useState<CurrencyMode>('EUR');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Header */}
      <Header currency={currency} onCurrencyChange={setCurrency} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Section A: Hero */}
        <Hero currency={currency} />

        {/* Module 1: Заплати и инфлация */}
        <SalaryModule currency={currency} />

        {/* Module 2: Региони */}
        <RegionsModule currency={currency} />

        {/* Module 3: България в Европа */}
        <EuropeModule />

        {/* Section C: Числа, които си струва да знаеш */}
        <KeyFactSection />

        {/* Section D: Откъде идват числата? */}
        <SourcesSection />
      </main>

      {/* Section E: Minimal Footer */}
      <Footer />
    </div>
  );
}
