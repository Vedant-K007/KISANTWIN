'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { Hotspot } from '../../data/mockData';
import {
  Droplets,
  AlertTriangle,
  Radio,
  Wind,
  Bus,
  CheckCircle,
  ShieldAlert,
  ArrowRight,
  Send,
  X
} from 'lucide-react';

interface PuneCityMapProps {
  height?: string;
  showDetailPanelInline?: boolean;
}

export const PuneCityMap: React.FC<PuneCityMapProps> = ({
  height = 'h-[500px]',
  showDetailPanelInline = true
}) => {
  const {
    mapLayers,
    currentHotspots,
    selectedHotspot,
    setSelectedHotspot,
    openDispatchModal,
    showToast
  } = useResilience();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return { bg: 'bg-rose-600', ring: 'ring-rose-500', text: 'text-rose-600', border: 'border-rose-400', fill: '#EF4444' };
      case 'High':
        return { bg: 'bg-rose-500', ring: 'ring-rose-400', text: 'text-rose-500', border: 'border-rose-300', fill: '#F43F5E' };
      case 'Moderate':
        return { bg: 'bg-amber-500', ring: 'ring-amber-400', text: 'text-amber-600', border: 'border-amber-300', fill: '#F59E0B' };
      default:
        return { bg: 'bg-emerald-500', ring: 'ring-emerald-400', text: 'text-emerald-600', border: 'border-emerald-300', fill: '#10B981' };
    }
  };

  return (
    <div className={`relative w-full ${height} bg-[#0A2229] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl flex flex-col select-none`}>
      {/* SVG City Canvas */}
      <div className="relative flex-1 w-full h-full">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Background Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#163842" strokeWidth="0.8" />
            </pattern>

            {/* Heatmap Risk Gradients */}
            <radialGradient id="grad-kharadi" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="grad-hadapsar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="grad-baner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="grad-air" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Canvas Background Grid */}
          <rect width="1000" height="600" fill="#091E24" />
          <rect width="1000" height="600" fill="url(#grid)" />

          {/* AIR QUALITY HEATMAP LAYER */}
          {mapLayers.airQuality && (
            <g opacity="0.7">
              <circle cx="700" cy="380" r="140" fill="url(#grad-hadapsar)" />
              <circle cx="480" cy="480" r="160" fill="url(#grad-air)" />
              <circle cx="280" cy="300" r="110" fill="url(#grad-air)" />
            </g>
          )}

          {/* FLOOD & WATER RISK HEATMAP OVERLAYS */}
          {mapLayers.waterRisk && (
            <g>
              <circle cx="750" cy="228" r="130" fill="url(#grad-kharadi)" className="animate-pulse" />
              <circle cx="700" cy="390" r="100" fill="url(#grad-hadapsar)" />
              <circle cx="280" cy="180" r="90" fill="url(#grad-baner)" />
            </g>
          )}

          {/* PUNE ROAD & ARTERIAL HIGHWAY NETWORK */}
          <g stroke="#1D4B57" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            {/* NH4 / Mumbai-Pune Bypass */}
            <path d="M 100,100 Q 250,200 480,280 T 800,450" fill="none" strokeDasharray="6,4" />
            {/* Solapur Highway */}
            <path d="M 480,280 L 950,420" fill="none" />
            {/* Nagar Road (Kharadi Expressway) */}
            <path d="M 480,280 L 900,180" fill="none" stroke="#22D3EE" strokeWidth="3" opacity="0.6" />
            {/* Pashan-Baner Arterial */}
            <path d="M 150,220 L 480,280" fill="none" />
            {/* Swargate South Ring Road */}
            <path d="M 480,280 L 450,550" fill="none" />
          </g>

          {/* DRAINAGE NETWORK LINES */}
          {mapLayers.drainageNetwork && (
            <g stroke="#06B6D4" strokeWidth="2" strokeDasharray="4,3" opacity="0.75">
              <path d="M 750,228 L 650,210 L 620,210" fill="none" />
              <path d="M 700,390 L 620,260" fill="none" />
              <path d="M 280,180 L 400,210" fill="none" />
              <path d="M 220,250 L 400,210" fill="none" />
            </g>
          )}

          {/* MULA & MUTHA RIVER GEOMETRY & RESERVOIRS */}
          <g>
            {/* Pashan Lake Reservoir */}
            <ellipse cx="220" cy="250" rx="35" ry="25" fill="#0284C7" opacity="0.75" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="200" y="254" fill="#E0F2FE" fontSize="9" fontWeight="bold">Pashan Lake</text>

            {/* Khadakwasla Reservoir (South-West) */}
            <path d="M 50,520 Q 150,480 300,550 L 250,590 Z" fill="#0284C7" opacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="120" y="525" fill="#E0F2FE" fontSize="9" fontWeight="bold">Khadakwasla Dam</text>

            {/* Mula River Branch */}
            <path
              d="M 100,160 Q 250,140 400,210 T 620,210"
              fill="none"
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Mutha River Branch */}
            <path
              d="M 300,550 Q 420,400 620,210"
              fill="none"
              stroke="#0284C7"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Mula-Mutha Confluence River Flow to Kharadi */}
            <path
              d="M 620,210 Q 720,200 950,240"
              fill="none"
              stroke="#0284C7"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.9"
            />
            <text x="760" y="200" fill="#7DD3FC" fontSize="10" fontWeight="bold" letterSpacing="1 font-sans">
              Mula-Mutha River
            </text>
          </g>

          {/* MOBILE VEHICLE FLEET MARKERS */}
          {mapLayers.vehicleFleet && (
            <g>
              <circle cx="520" cy="240" r="5" fill="#A855F7" className="animate-ping" />
              <circle cx="520" cy="240" r="6" fill="#A855F7" />
              <text x="530" y="243" fill="#E9D5FF" fontSize="9" fontWeight="bold">Bus #102 (IoT)</text>

              <circle cx="710" cy="210" r="5" fill="#F43F5E" />
              <text x="720" y="213" fill="#FECDD3" fontSize="9" fontWeight="bold">Waste Truck #45</text>
            </g>
          )}

          {/* WATER LEVEL & RAINFALL SENSOR NODES */}
          {mapLayers.waterSensors && (
            <g>
              {/* WS-204 Mutha River Sensor */}
              <circle cx="620" cy="210" r="7" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="590" y="195" fill="#06B6D4" fontSize="9" fontWeight="bold">Gauge WS-204 (3.2m)</text>

              {/* Pump Station PS-07 */}
              <rect x="685" y="375" width="14" height="14" rx="3" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="660" y="370" fill="#F59E0B" fontSize="9" fontWeight="bold">PS-07 Pump (92%)</text>
            </g>
          )}
        </svg>

        {/* INTERACTIVE HOTSPOT OVERLAY MARKERS */}
        {currentHotspots.map((spot) => {
          const colors = getRiskColor(spot.riskLevel);
          const isSelected = selectedHotspot?.id === spot.id;

          return (
            <div
              key={spot.id}
              onClick={() => setSelectedHotspot(spot)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group transition-all duration-300 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              {/* Outer Pulsing Ring for High/Critical */}
              {(spot.riskLevel === 'Critical' || spot.riskLevel === 'High') && (
                <div
                  className={`absolute -inset-2 rounded-full ${colors.bg} opacity-50 animate-ping`}
                />
              )}

              {/* Marker Badge */}
              <div
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-lg border ${
                  colors.bg
                } ${colors.border} ${isSelected ? 'ring-4 ring-cyan-400/60' : ''}`}
              >
                <Droplets className="w-3 h-3 text-white" />
                <span>{spot.name}</span>
                <span className="text-[9px] bg-black/30 px-1 py-0.2 rounded font-extrabold">
                  {spot.riskLevel}
                </span>
              </div>
            </div>
          );
        })}

        {/* MAP LEGEND OVERLAY */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 text-[10px] text-slate-200 space-y-1 z-10 shadow-lg">
          <div className="font-bold uppercase tracking-wider text-slate-400">Risk Severity</div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Low</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Moderate</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>High / Critical</span>
            </span>
          </div>
        </div>
      </div>

      {/* INLINE HOTSPOT DETAIL PANEL (When a marker is selected) */}
      {showDetailPanelInline && selectedHotspot && (
        <div className="bg-slate-900 text-white p-4 border-t border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-20 animate-fadeIn">
          <div className="flex items-start space-x-3">
            <div
              className={`p-2.5 rounded-xl ${
                selectedHotspot.riskLevel === 'Critical' || selectedHotspot.riskLevel === 'High'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-extrabold text-base text-white">{selectedHotspot.name} Sector</h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500 text-white">
                  Risk: {selectedHotspot.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{selectedHotspot.aiForecast}</p>
              <div className="flex items-center space-x-4 text-[11px] text-cyan-300 mt-2 font-medium">
                <span>Rainfall: <strong>{selectedHotspot.rainfall}</strong></span>
                <span>Water Level: <strong>{selectedHotspot.waterLevel}</strong></span>
                <span>Drainage Load: <strong>{selectedHotspot.drainageCapacity}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => openDispatchModal(selectedHotspot)}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Response</span>
            </button>
            <button
              onClick={() => showToast(`Hotspot ${selectedHotspot.name} telemetry marked as acknowledged.`)}
              className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-2 rounded-xl text-xs border border-slate-700"
            >
              Mark Resolved
            </button>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
