import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'България, но в числа — Истории за страната ни, които се крият в данните',
  description:
    'Интерактивно дигитално издание, което разказва за заплатите, инфлацията, регионалните различия и мястото на България в Европа чрез проверени статистически данни от НСИ и Eurostat.',
  keywords: [
    'България в числа',
    'статистика България',
    'НСИ данни',
    'инфлация България',
    'средна заплата по области',
    'Евростат България',
    'БВП по ППС',
    'покупателна способност',
    'демография преброяване 2021',
  ],
  authors: [{ name: 'България, но в числа' }],
  openGraph: {
    title: 'България, но в числа — Истории за страната ни, които се крият в данните',
    description:
      'Разгледай как се променят парите, хората и животът в България — чрез данни, които разказват повече, отколкото изглежда.',
    url: 'https://bg-v-chisla.bg',
    siteName: 'България, но в числа',
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'България, но в числа',
    description: 'Истории за страната ни, които се крият в данните.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="font-sans antialiased bg-[#FAF9F5] text-stone-900 selection:bg-blue-100 selection:text-blue-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
