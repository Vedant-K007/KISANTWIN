'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'normal' | 'warning' | 'critical' | 'info' | 'safe' | 'prepared';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'info',
  size = 'md'
}) => {
  const normalized = status.toLowerCase();

  let colorClasses = 'bg-[#F5F7F3] text-[#17231D] border-[#DCE5DF]';
  if (normalized.includes('safe') || normalized.includes('healthy') || normalized.includes('normal') || normalized.includes('good') || normalized.includes('available') || type === 'safe') {
    colorClasses = 'bg-[#EAF8F1] text-[#16A878] border-[#16A878]/30 font-bold';
  } else if (normalized.includes('prepared') || normalized.includes('stable') || type === 'prepared') {
    colorClasses = 'bg-[#E8F3FF] text-[#2F80ED] border-[#2F80ED]/30 font-bold';
  } else if (normalized.includes('warn') || normalized.includes('elevated') || normalized.includes('moderate') || normalized.includes('watch') || type === 'warning') {
    colorClasses = 'bg-[#FFF7E6] text-[#F2B84B] border-[#F2B84B]/40 font-bold';
  } else if (normalized.includes('high') || normalized.includes('critical') || normalized.includes('severe') || type === 'critical') {
    colorClasses = 'bg-[#FDE8E8] text-[#E45756] border-[#E45756]/40 font-extrabold animate-pulse';
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border ${padding} ${colorClasses} tracking-tight`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};
