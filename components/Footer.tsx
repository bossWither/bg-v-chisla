export default function Footer() {
  return (
    <footer className="bg-[#FAF9F5] py-8 text-stone-500 text-xs font-mono border-t border-[#E7E5E0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-serif font-bold text-sm text-stone-900 mr-2">
            България, но в числа
          </span>
          <span>— Истории за страната ни, които се крият в данните.</span>
        </div>

        <div>
          © {new Date().getFullYear()} • Данни от НСИ и Eurostat
        </div>
      </div>
    </footer>
  );
}
