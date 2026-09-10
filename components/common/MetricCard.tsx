'use client';

import React from 'react';
import { StatusBadge } from './StatusBadge';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: string;
  statusType?: 'normal' | 'warning' | 'critical' | 'info' | 'safe' | 'prepared';
  subtitle?: string;
  trend?: string;
  icon?: React.ElementType;
  highlight?: boolean;
  themeCategory?: 'crop' | 'water' | 'climate' | 'profit' | 'default';
  sparklineData?: number[];
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  status,
  statusType = 'info',
  subtitle,
  trend,
  icon: Icon,
  highlight = false,
  themeCategory = 'default',
  sparklineData = [35, 48, 62, 54, 72, 68, 85],
  onClick
}) => {
  // Determine semantic colors for icon container & sparkline based on category/title
  let iconBg = 'bg-[#EAF8F1]';
  let iconColor = 'text-[#16A878]';
  let barColor = 'bg-[#16A878]';

  const titleLower = title.toLowerCase();
  if (titleLower.includes('water') || titleLower.includes('rain') || themeCategory === 'water') {
    iconBg = 'bg-[#E8F3FF]';
    iconColor = 'text-[#2F80ED]';
    barColor = 'bg-[#2F80ED]';
  } else if (titleLower.includes('climate') || titleLower.includes('temp') || themeCategory === 'climate') {
    iconBg = 'bg-[#FFF7E6]';
    iconColor = 'text-[#F2B84B]';
    barColor = 'bg-[#F2B84B]';
  } else if (titleLower.includes('profit') || titleLower.includes('yield') || themeCategory === 'profit' || highlight) {
    iconBg = 'bg-[#EAF8F1]';
    iconColor = 'text-[#16A878]';
    barColor = 'bg-[#16A878]';
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 bg-white border border-[#DCE5DF] shadow-xs transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-[#16A878]/50 hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#66756D]">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${iconBg} ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl font-extrabold tracking-tight text-[#17231D]">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-semibold text-[#66756D]">
              {unit}
            </span>
          )}
        </div>
        <StatusBadge status={status} type={statusType} />
      </div>

      {/* Mini Sparkline Visualization */}
      <div className="mt-3 flex items-center justify-between">
        <div className="h-5 flex items-end space-x-1">
          {sparklineData.map((val, idx) => (
            <div
              key={idx}
              className={`w-1 rounded-t opacity-70 ${barColor}`}
              style={{ height: `${(val / 100) * 100}%` }}
            />
          ))}
        </div>

        {trend && (
          <span
            className={`text-xs font-extrabold ${
              trend.includes('↑') || trend.includes('+')
                ? 'text-[#16A878]'
                : 'text-[#F2B84B]'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-2 pt-2 border-t border-[#DCE5DF]/60 text-[11px] text-[#66756D] font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );
};
