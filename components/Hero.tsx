import { ArrowDown } from 'lucide-react';
import { CurrencyMode } from '@/types';

interface HeroProps {
  currency: CurrencyMode;
}

export default function Hero({ currency }: HeroProps) {
  return (
    <section className="pt-10 pb-12 md:pt-16 md:pb-16 border-b border-[#E7E5E0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 tracking-tight leading-[1.1] font-normal">
              Позната България. <br />
              <span className="italic text-blue-700">Неочаквани числа.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light max-w-xl">
              Разгледай как се променят парите, цените и хората в страната ни — чрез официални данни от Националния статистически институт (НСИ) и Eurostat.
            </p>

            <div className="pt-2">
              <a
                href="#salaries"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm transition-colors"
              >
                <span>Разгледай данните</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Clean 4 Key Numbers */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 bg-white border border-stone-200">
              <div className="text-xs text-stone-500 font-mono">Ср. заплата (2026)</div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">
                {currency === 'EUR' ? '1 424 €' : '2 785 лв.'}
              </div>
              <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                {currency === 'EUR' ? '(2 785 лв.)' : '(1 424 €)'}
              </div>
            </div>

            <div className="p-4 bg-white border border-stone-200">
              <div className="text-xs text-stone-500 font-mono">БВП на човек (ППС)</div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">68%</div>
              <div className="text-[11px] text-stone-400 font-mono mt-0.5">от средното за ЕС</div>
            </div>

            <div className="p-4 bg-white border border-stone-200">
              <div className="text-xs text-stone-500 font-mono">Собствен дом</div>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1 tabular-nums">85.2%</div>
              <div className="text-[11px] text-stone-400 font-mono mt-0.5">Топ 3 в целия ЕС</div>
            </div>

            <div className="p-4 bg-white border border-stone-200">
              <div className="text-xs text-stone-500 font-mono">Реален ръст (2015–2026)</div>
              <div className="text-2xl font-serif font-bold text-emerald-700 mt-1 tabular-nums">+103.6%</div>
              <div className="text-[11px] text-stone-400 font-mono mt-0.5">удвоена покупателност</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
