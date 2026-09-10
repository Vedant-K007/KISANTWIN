import type { Metadata } from 'next';
import './globals.css';
import { FarmProvider } from '../context/FarmContext';

export const metadata: Metadata = {
  title: 'KISANTWIN • AI Farm Decision & Water Resilience Platform',
  description: 'Simulate Before You Cultivate. An AI decision twin that helps farmers predict water, climate, crop and market risks — and choose the best action before problems become losses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        <FarmProvider>
          {children}
        </FarmProvider>
      </body>
    </html>
  );
}
