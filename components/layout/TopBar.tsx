'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  MapPin,
  Clock,
  Sun,
  Sparkles,
  ChevronDown,
  UserCheck,
  Search,
  Lock,
  Radio,
  Sliders,
  ShieldCheck,
  Building,
  Landmark,
  User
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    role,
    setRole,
    currentUser,
    setLoginModalOpen,
    selectedFarmName,
    setSelectedFarmName,
    setActiveView,
    showToast
  } = useFarm();

  const [roleMenuOpen, setRoleMenuOpen] = useState<boolean>(false);

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#DCE5DF] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs select-none">
      {/* 1. LEFT GROUP: FARM SELECTOR & TELEMETRY LIVE STATUS */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* Farm Selector White Pill */}
        <div className="flex items-center space-x-2 bg-white border border-[#DCE5DF] hover:border-[#16A878] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#17231D] shadow-xs transition-all">
          <MapPin className="w-4 h-4 text-[#16A878] shrink-0" />
          <select
            value={selectedFarmName}
            onChange={(e) => {
              setSelectedFarmName(e.target.value);
              showToast(`Selected Active Field: ${e.target.value}`);
            }}
            className="bg-transparent font-extrabold text-[#17231D] focus:outline-hidden cursor-pointer text-xs"
          >
            <option value="2.4 Acre — Pune District">2.4 Acre — Pune District (Rahul's Field)</option>
            <option value="4.1 Acre — Junnar Catchment">4.1 Acre — Junnar Catchment</option>
            <option value="1.8 Acre — Baramati Canal Patch">1.8 Acre — Baramati Canal Patch</option>
          </select>
        </div>

        {/* Live Telemetry Pill */}
        <div className="hidden md:flex items-center space-x-2 text-xs bg-[#EAF8F1] border border-[#16A878]/30 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#16A878] animate-pulse" />
          <span className="font-semibold text-[#66756D]">Status:</span>
          <span className="font-extrabold text-[#16A878]">Farm Twin Active</span>
        </div>

        {/* Updated Timestamp */}
        <div className="hidden xl:flex items-center space-x-1.5 text-xs text-[#66756D]">
          <Clock className="w-3.5 h-3.5 text-[#66756D]" />
          <span>Updated: <strong className="text-[#17231D] font-medium">18s ago</strong></span>
        </div>
      </div>

      {/* 2. CENTER GROUP: GLOBAL AI SEARCH & COMMAND BAR */}
      <div className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm mx-4">
        <button
          onClick={() => showToast('💡 KisanTwin AI Search: Type queries like "Water stress Zone C" or "Onion price forecast"')}
          className="w-full flex items-center justify-between bg-[#F5F7F3] hover:bg-[#EAEFEA] border border-[#DCE5DF] px-3.5 py-1.5 rounded-full text-xs text-[#66756D] font-medium transition-all group"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#16A878] group-hover:scale-110 transition-transform" />
            <span className="truncate">Search farm twin, crops or AI...</span>
          </div>
          <kbd className="hidden lg:inline-block text-[9px] font-mono font-bold bg-white border border-[#DCE5DF] px-1.5 py-0.5 rounded text-[#66756D] shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 3. RIGHT GROUP: WEATHER, HERO STRESS TEST & USER AUTH ADDON */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Weather Very Light Blue Pill */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#E8F3FF] border border-[#2F80ED]/30 px-3 py-1.5 rounded-full text-xs font-extrabold text-[#2F80ED]">
          <Sun className="w-4 h-4 text-[#F2B84B]" />
          <span>28°C • Partly Cloudy</span>
        </div>

        {/* Hero Farm Stress Test Button */}
        <button
          onClick={() => setActiveView('stresstest')}
          className="flex items-center space-x-1.5 bg-[#16A878] hover:bg-[#128F66] text-white font-black px-4 py-2 rounded-full text-xs shadow-sm transition-all transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Farm Stress Test</span>
          <span className="sm:hidden">Stress Test</span>
        </button>

        {/* USER AUTH & PROFILE ADDON BUTTON */}
        <div className="relative flex items-center space-x-1">
          <button
            onClick={() => setLoginModalOpen(true)}
            className="flex items-center space-x-2.5 bg-[#12372A] hover:bg-[#1A4A39] text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm border border-[#1E523F] cursor-pointer group"
          >
            {/* User Avatar Initials Badge */}
            <div className="w-6 h-6 rounded-full bg-[#16A878] text-white font-black text-[11px] flex items-center justify-center border border-white/20 shrink-0">
              {currentUser.initials}
            </div>

            <div className="text-left hidden lg:block leading-tight">
              <div className="font-extrabold text-white text-[11px] truncate max-w-[110px]">
                {currentUser.name}
              </div>
              <div className="text-[9px] text-[#65C18C] font-semibold capitalize">
                {currentUser.role} Mode
              </div>
            </div>

            <Lock className="w-3.5 h-3.5 text-[#16A878] group-hover:scale-110 transition-transform" />
          </button>

          {/* Quick Dropdown Toggle for Role Perspective */}
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="p-1.5 text-[#66756D] hover:text-[#17231D] hover:bg-[#F5F7F3] rounded-full transition-all"
            title="Switch Perspective"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Perspective Dropdown Menu */}
          {roleMenuOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white border border-[#DCE5DF] rounded-2xl shadow-xl z-50 p-2 text-xs space-y-1 animate-fadeIn">
              <div className="px-3 py-2 text-[10px] font-extrabold uppercase text-[#66756D] border-b border-[#DCE5DF] flex items-center justify-between">
                <span>Active Perspective</span>
                <span className="text-[#16A878]">Auth Active</span>
              </div>

              <button
                onClick={() => {
                  setRole('farmer');
                  setRoleMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-all ${
                  role === 'farmer' ? 'bg-[#EAF8F1] text-[#16A878]' : 'text-[#17231D] hover:bg-[#F5F7F3]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#16A878]" />
                  <span>Farmer Mode (Rahul)</span>
                </div>
                {role === 'farmer' && <span className="w-1.5 h-1.5 rounded-full bg-[#16A878]" />}
              </button>

              <button
                onClick={() => {
                  setRole('fpo');
                  setRoleMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-all ${
                  role === 'fpo' ? 'bg-[#E8F3FF] text-[#2F80ED]' : 'text-[#17231D] hover:bg-[#F5F7F3]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-[#2F80ED]" />
                  <span>FPO / Advisor Mode</span>
                </div>
                {role === 'fpo' && <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" />}
              </button>

              <button
                onClick={() => {
                  setRole('officer');
                  setRoleMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition-all ${
                  role === 'officer' ? 'bg-[#EAF8F1] text-[#12372A]' : 'text-[#17231D] hover:bg-[#F5F7F3]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Landmark className="w-4 h-4 text-[#12372A]" />
                  <span>Agricultural Officer Mode</span>
                </div>
                {role === 'officer' && <span className="w-1.5 h-1.5 rounded-full bg-[#12372A]" />}
              </button>

              <div className="pt-1.5 border-t border-[#DCE5DF]">
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setRoleMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-1.5 bg-[#12372A] hover:bg-[#1A4A39] text-white p-2 rounded-xl font-extrabold text-[11px] transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A878]" />
                  <span>Manage Login & Auth Addon</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
