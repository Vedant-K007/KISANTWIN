'use client';

import React from 'react';
import { useFarm, ViewType } from '../../context/FarmContext';
import {
  LayoutDashboard,
  Map,
  Sprout,
  Droplets,
  CloudSun,
  Sparkles,
  CheckSquare,
  TrendingUp,
  BarChart3,
  Bell,
  FileText,
  Building,
  Landmark,
  UserCheck
} from 'lucide-react';

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isHero?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, role, actionPlan, setReportModalOpen, setNotifOpen, notifOpen } = useFarm();

  const pendingActionsCount = actionPlan.filter((a) => !a.completed).length;

  const farmerNavItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'twin', label: 'My Farm Twin', icon: Map },
    { id: 'water', label: 'Water Intelligence', icon: Droplets },
    { id: 'climate', label: 'Climate Risk', icon: CloudSun },
    { id: 'health', label: 'Farm Health', icon: Sprout },
    { id: 'stresstest', label: 'Farm Stress Test', icon: Sparkles, badge: 'HERO SIMULATOR', isHero: true },
    { id: 'actions', label: 'AI Action Plan', icon: CheckSquare, badge: pendingActionsCount > 0 ? `${pendingActionsCount}` : undefined },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#12372A] text-[#D6E5DE] flex flex-col h-screen sticky top-0 border-r border-[#1E523F] shadow-xl z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1E523F] bg-[#0C261D]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#16A878] flex items-center justify-center shadow-md shadow-[#16A878]/30">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-xl tracking-tight text-white font-sans">KisanTwin</h1>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#16A878]/20 text-[#65C18C] border border-[#16A878]/30">
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-[#D6E5DE]/80 font-medium italic">Simulate Before You Cultivate</p>
          </div>
        </div>
      </div>

      {/* Role Navigation View Filter */}
      {role === 'fpo' && (
        <div className="p-3 bg-[#0C261D]/80 border-b border-[#1E523F]">
          <button
            onClick={() => setActiveView('fpo')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'fpo' ? 'bg-[#16A878] text-white shadow-sm' : 'text-[#D6E5DE] hover:bg-[#1E523F]/40'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>FPO Regional Dashboard</span>
          </button>
        </div>
      )}

      {role === 'officer' && (
        <div className="p-3 bg-[#0C261D]/80 border-b border-[#1E523F]">
          <button
            onClick={() => setActiveView('officer')}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'officer' ? 'bg-[#16A878] text-white shadow-sm' : 'text-[#D6E5DE] hover:bg-[#1E523F]/40'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Govt District Command</span>
          </button>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#65C18C]/80 mb-2">
          Decision Intelligence
        </div>
        {farmerNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={`${item.id}-${item.label}`}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? item.isHero
                    ? 'bg-[#16A878] text-white font-bold shadow-md shadow-[#16A878]/30'
                    : 'bg-[#16A878]/16 text-white border border-[#16A878]/40 shadow-xs'
                  : 'text-[#D6E5DE] hover:bg-[#1E523F]/40 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'text-[#16A878] group-hover:text-white'
                      : 'text-[#D6E5DE]/70 group-hover:text-[#16A878]'
                  }`}
                  style={{ color: isActive ? (item.isHero ? '#FFFFFF' : '#16A878') : undefined }}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                    item.isHero
                      ? isActive
                        ? 'bg-white text-[#12372A]'
                        : 'bg-[#16A878] text-white animate-pulse'
                      : 'bg-[#E45756] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Nav: Notifications, Reports, Role Indicator */}
      <div className="p-4 border-t border-[#1E523F] bg-[#0C261D] space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="flex items-center space-x-2 text-[#D6E5DE] hover:text-white transition-colors bg-[#12372A] p-2 rounded-xl border border-[#1E523F]"
          >
            <Bell className="w-3.5 h-3.5 text-[#F2B84B]" />
            <span>Alerts</span>
          </button>
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center space-x-2 text-[#D6E5DE] hover:text-white transition-colors bg-[#12372A] p-2 rounded-xl border border-[#1E523F]"
          >
            <FileText className="w-3.5 h-3.5 text-[#2F80ED]" />
            <span>Reports</span>
          </button>
        </div>

        {/* Current Active Role Badge */}
        <div className="rounded-xl bg-[#12372A] p-2.5 border border-[#1E523F] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-[#16A878]" />
            <div>
              <div className="text-[10px] text-[#D6E5DE]/60 font-bold uppercase">Active Mode</div>
              <div className="text-xs font-extrabold text-white capitalize">{role} Mode</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#16A878] animate-ping" />
        </div>
      </div>
    </aside>
  );
};
