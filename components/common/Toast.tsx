'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useFarm();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#051C15] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center space-x-3 text-xs animate-bounce">
      <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
        <Sparkles className="w-4 h-4" />
      </div>
      <span className="font-semibold text-slate-100">{toastMessage}</span>
    </div>
  );
};
