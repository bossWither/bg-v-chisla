import { ExternalLink } from 'lucide-react';
import sourcesRaw from '@/data/sources.json';
import { SourcesDataset } from '@/types';

const sourcesData = sourcesRaw as SourcesDataset;

export default function SourcesSection() {
  return (
    <section id="sources" className="py-14 md:py-16 border-b border-[#E7E5E0] bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold mb-1">
            Секция D • Достоверност
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight font-normal">
            Откъде идват числата?
          </h2>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed font-light">
            Всички стойности в изданието идват от официални държавни и европейски регистри. За всяка графика се посочват източникът, периодът и мерната единица.
          </p>
        </div>

        {/* 3 Institution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sourcesData.institutions.map((inst) => (
            <div
              key={inst.abbr}
              className="bg-white border border-stone-200 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <span className="font-mono text-xs font-bold text-stone-900">
                    {inst.abbr}
                  </span>
                  <a
                    href={inst.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 hover:text-blue-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="font-serif font-bold text-base text-stone-900 mb-1">
                  {inst.name}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {inst.role}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100">
                <a
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-700 hover:underline font-mono inline-flex items-center gap-1"
                >
                  <span>Официален сайт</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
