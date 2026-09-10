'use client';

import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { FARM_ZONES, FarmZone } from '../../data/mockFarmData';
import {
  Sprout,
  Droplets,
  Bug,
  Activity,
  CloudRain,
  Mountain,
  Zap,
  Sparkles,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Info,
  X,
  Radio,
  Sliders,
  Gauge,
  AlertTriangle
} from 'lucide-react';

interface SensorNode {
  id: string;
  name: string;
  type: string;
  reading: string;
  status: 'Nominal' | 'Watch' | 'Warning';
  zone: string;
  x: number;
  y: number;
  depth?: string;
  battery: number;
  trend: string;
}

interface ValveNode {
  id: string;
  name: string;
  flowRate: string;
  status: 'Active' | 'Restricted' | 'Healthy' | 'Attention';
  statusColor: string;
  pressure: string;
  zone: string;
  x: number;
  y: number;
  percentage: number;
}

export const FarmTwinMap: React.FC<{ height?: string; showInspectorInline?: boolean }> = ({
  height = 'h-[680px]',
  showInspectorInline = true
}) => {
  const {
    mapLayers,
    toggleMapLayer,
    selectedZone,
    setSelectedZone,
    setActiveView,
    setStressInputs,
    setIrrigationModalOpen,
    showToast
  } = useFarm();

  // Map state
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [activeTabLayer, setActiveTabLayer] = useState<
    'cropHealth' | 'soilMoisture' | 'waterStress' | 'pestRisk' | 'irrigation' | 'rainfall' | 'elevation'
  >('cropHealth');

  // Modal / Tooltip inspect states
  const [activeSensor, setActiveSensor] = useState<SensorNode | null>(null);
  const [activeValve, setActiveValve] = useState<ValveNode | null>(null);
  const [aiInsightModalOpen, setAiInsightModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sensor Nodes
  const sensors: SensorNode[] = [
    {
      id: 'S-01',
      name: 'Sensor S-01',
      type: 'Soil Moisture & Temp',
      reading: '61%',
      status: 'Nominal',
      zone: 'Zone A',
      x: 230,
      y: 150,
      depth: '15 cm',
      battery: 96,
      trend: 'Stable (+0.4% 24h)'
    },
    {
      id: 'S-02',
      name: 'Sensor S-02',
      type: 'Soil Moisture',
      reading: '54%',
      status: 'Watch',
      zone: 'Zone B',
      x: 620,
      y: 160,
      depth: '20 cm',
      battery: 91,
      trend: 'Declining (-2.1% 24h)'
    },
    {
      id: 'S-03',
      name: 'Sensor S-03',
      type: 'Temperature & Leaf Sensor',
      reading: '28.4°C',
      status: 'Warning',
      zone: 'Zone C',
      x: 240,
      y: 410,
      depth: 'Surface',
      battery: 94,
      trend: 'Pest vulnerability high'
    },
    {
      id: 'S-04',
      name: 'Sensor S-04',
      type: 'Humidity & Moisture',
      reading: '67%',
      status: 'Nominal',
      zone: 'Zone D',
      x: 630,
      y: 440,
      depth: '15 cm',
      battery: 98,
      trend: 'Nominal'
    }
  ];

  // Valve Nodes
  const valves: ValveNode[] = [
    {
      id: 'V-01',
      name: 'Valve V-01',
      flowRate: '72 L/min',
      status: 'Active',
      statusColor: '#2F80ED',
      pressure: '2.1 bar',
      zone: 'Zone A',
      x: 270,
      y: 170,
      percentage: 72
    },
    {
      id: 'V-02',
      name: 'Valve V-02',
      flowRate: '54 L/min',
      status: 'Restricted',
      statusColor: '#F2B84B',
      pressure: '1.8 bar',
      zone: 'Zone B',
      x: 645,
      y: 180,
      percentage: 54
    },
    {
      id: 'V-03',
      name: 'Valve V-03',
      flowRate: '88 L/min',
      status: 'Healthy',
      statusColor: '#16A878',
      pressure: '2.4 bar',
      zone: 'Zone C',
      x: 275,
      y: 420,
      percentage: 88
    },
    {
      id: 'V-04',
      name: 'Valve V-04',
      flowRate: '35 L/min',
      status: 'Attention',
      statusColor: '#E45756',
      pressure: '1.2 bar',
      zone: 'Zone D',
      x: 650,
      y: 435,
      percentage: 35
    }
  ];

  // Signature bridge to Farm Stress Test
  const handleSimulateThisField = () => {
    setStressInputs({
      rainfall: -30,
      water: -40,
      temperature: 2.5,
      market: -20,
      pest: 'High'
    });
    showToast('⚡ Preloaded Live Field Twin telemetry (Water 72%, Health 88%, Risk 31%) into Stress Engine!');
    setActiveView('stresstest');
  };

  const handleSelectLayer = (
    layerKey: 'cropHealth' | 'soilMoisture' | 'waterStress' | 'pestRisk' | 'irrigation' | 'rainfall' | 'elevation'
  ) => {
    setActiveTabLayer(layerKey);
    toggleMapLayer(layerKey);
  };

  return (
    <div
      className={`relative w-full ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen bg-[#F5F7F3] p-6 overflow-auto' : `${height}`
      } bg-[#F7FAF7] rounded-3xl overflow-hidden border border-[#DCE5DF] shadow-md flex flex-col select-none transition-all duration-300`}
    >
      {/* 1. MAP HEADER & TOP NAVIGATION */}
      <div className="bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-[#DCE5DF] flex flex-wrap items-center justify-between gap-3 z-30 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#EAF8F1] text-[#16A878] border border-[#16A878]/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-base text-[#17231D] tracking-tight uppercase">LIVE FIELD TWIN</h3>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EAF8F1] text-[#16A878] border border-[#16A878]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A878] animate-ping" />
                <span>LIVE TELEMETRY</span>
              </span>
            </div>
            <p className="text-xs text-[#66756D] font-medium">Real-time zone telemetry for 2.4 Acre Pune Field</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3">
          {/* LIVE STATUS SUMMARY BADGE */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-bold bg-[#F5F7F3] border border-[#DCE5DF] px-3 py-1.5 rounded-full text-[#17231D]">
            <span className="w-2 h-2 rounded-full bg-[#16A878]" />
            <span>39 / 42 sensors online</span>
            <span className="text-[#66756D] font-normal">| Updated 18s ago</span>
          </div>

          {/* SIGNATURE FEATURE: SIMULATE THIS FIELD */}
          <button
            onClick={handleSimulateThisField}
            className="flex items-center space-x-2 bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold px-4 py-2 rounded-full text-xs shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>SIMULATE THIS FIELD</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Full GIS View Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-[#12372A] hover:text-[#16A878] bg-[#F5F7F3] hover:bg-[#EAEFEA] px-3 py-2 rounded-full border border-[#DCE5DF] transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isFullscreen ? 'EXIT FULLSCREEN' : 'FULL GIS MAP VIEW →'}</span>
          </button>
        </div>
      </div>

      {/* 2. FLOATING MAP TOOLBAR & CONTROLS CONTAINER */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* TOP-RIGHT FLOATING TOOLBAR: LAYERS */}
        <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#DCE5DF] shadow-sm max-w-full">
          <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#66756D] px-2.5 hidden md:inline">
            Layers:
          </span>
          {[
            { key: 'cropHealth', label: 'Crop Health', icon: Sprout },
            { key: 'soilMoisture', label: 'Soil Moisture', icon: Droplets },
            { key: 'waterStress', label: 'Water Stress', icon: Activity },
            { key: 'pestRisk', label: 'Pest Risk', icon: Bug },
            { key: 'irrigation', label: 'Irrigation', icon: Zap },
            { key: 'rainfall', label: 'Rainfall', icon: CloudRain },
            { key: 'elevation', label: 'Elevation', icon: Mountain }
          ].map((layer) => {
            const Icon = layer.icon;
            const isSelected = activeTabLayer === layer.key || mapLayers[layer.key as keyof typeof mapLayers];

            return (
              <button
                key={layer.key}
                onClick={() =>
                  handleSelectLayer(
                    layer.key as 'cropHealth' | 'soilMoisture' | 'waterStress' | 'pestRisk' | 'irrigation' | 'rainfall' | 'elevation'
                  )
                }
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#16A878] text-white shadow-xs'
                    : 'bg-white text-[#17231D] hover:bg-[#F5F7F3] border border-transparent hover:border-[#DCE5DF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#16A878]'}`} />
                <span className="whitespace-nowrap">{layer.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT VERTICAL MAP CONTROLS STACK */}
        <div className="absolute top-20 right-4 z-20 flex flex-col space-y-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#DCE5DF] shadow-sm text-[#17231D]">
          <button
            onClick={() => setZoomScale((prev) => Math.min(prev + 0.15, 1.4))}
            title="Zoom In"
            className="p-2 hover:bg-[#F5F7F3] rounded-xl font-bold transition-all text-[#17231D]"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomScale((prev) => Math.max(prev - 0.15, 0.8))}
            title="Zoom Out"
            className="p-2 hover:bg-[#F5F7F3] rounded-xl font-bold transition-all text-[#17231D]"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-[#DCE5DF]" />
          <button
            onClick={() => setZoomScale(1)}
            title="Center Farm"
            className="p-2 hover:bg-[#F5F7F3] rounded-xl font-bold transition-all text-[#16A878]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('📍 Farm Centered: 18.5204° N, 73.8567° E (Pune, MH)')}
            title="GPS Locate"
            className="p-2 hover:bg-[#F5F7F3] rounded-xl font-bold transition-all text-[#2F80ED]"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>

        {/* TOP-LEFT FLOATING FIELD TELEMETRY SUMMARY PANEL */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#DCE5DF] shadow-sm text-xs space-y-2.5 max-w-xs hidden sm:block">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-[#66756D] tracking-wider border-b border-[#DCE5DF] pb-1.5">
            <span>FIELD TELEMETRY</span>
            <span className="text-[#16A878]">2.4 ACRES</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
            <div className="bg-[#EAF8F1] p-2 rounded-xl border border-[#16A878]/30">
              <span className="text-[9px] uppercase text-[#66756D] font-extrabold block">FIELD HEALTH</span>
              <span className="text-base font-black text-[#16A878]">88%</span>
            </div>
            <div className="bg-[#E8F3FF] p-2 rounded-xl border border-[#2F80ED]/30">
              <span className="text-[9px] uppercase text-[#66756D] font-extrabold block">WATER STATUS</span>
              <span className="text-base font-black text-[#2F80ED]">72%</span>
            </div>
            <div className="bg-[#F5F7F3] p-2 rounded-xl border border-[#DCE5DF]">
              <span className="text-[9px] uppercase text-[#66756D] font-extrabold block">SOIL MOISTURE</span>
              <span className="text-base font-black text-[#17231D]">61%</span>
            </div>
            <div className="bg-[#FFF7E6] p-2 rounded-xl border border-[#F2B84B]/30">
              <span className="text-[9px] uppercase text-[#66756D] font-extrabold block">PEST RISK</span>
              <span className="text-base font-black text-[#F2B84B]">22%</span>
            </div>
          </div>
          <div className="text-[10px] text-[#66756D] font-medium text-center pt-0.5">
            Climate Risk Level: <strong className="text-[#17231D]">31% (Stable)</strong>
          </div>
        </div>

        {/* 3. SVG REALISTIC AGRICULTURAL GIS CANVAS */}
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <div
            style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
            className="w-full h-full transition-transform duration-300 ease-out"
          >
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 920 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Extremely faint GIS grid texture */}
                <pattern id="gisGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E3EBE6" strokeWidth="0.7" opacity="0.3" />
                </pattern>

                {/* Outer Field Emerald Glow Filter */}
                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.5" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Pest Risk Hotspot Radial Heatmap */}
                <radialGradient id="pestHotspot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E45756" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#F2B84B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFF7E6" stopOpacity="0" />
                </radialGradient>

                {/* Semantic Gradients for Zones */}
                {/* Zone A (Soybean - Healthy) */}
                <linearGradient id="zone-a-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAF8F1" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#CDEEDC" stopOpacity="0.9" />
                </linearGradient>

                {/* Zone B (Maize - Healthy Green) */}
                <linearGradient id="zone-b-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.9" />
                </linearGradient>

                {/* Zone C (Onion - Water Stressed / Watch) */}
                <linearGradient id="zone-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7E6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.85" />
                </linearGradient>

                {/* Zone D (Maize - Healthy) */}
                <linearGradient id="zone-d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAF8F1" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.8" />
                </linearGradient>

                {/* Layer Overlays */}
                <linearGradient id="moisture-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8F3FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6BB6FF" stopOpacity="0.75" />
                </linearGradient>

                <linearGradient id="stress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF0EE" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* BASE MAP BACKGROUND (#F7FAF7) */}
              <rect width="920" height="600" fill="#F7FAF7" />
              <rect width="920" height="600" fill="url(#gisGridPattern)" />

              {/* TOPOGRAPHIC ELEVATION CONTOUR LINES (BARELY VISIBLE REALISTIC GIS ISOLINES) */}
              <g stroke="#C8D6CD" strokeWidth="0.8" opacity="0.45" fill="none">
                <path d="M 0,120 Q 250,90 500,140 T 920,110" strokeDasharray="4 3" />
                <path d="M 0,220 Q 300,190 600,240 T 920,210" />
                <path d="M 0,340 Q 280,310 580,360 T 920,330" strokeDasharray="6 4" />
                <path d="M 0,470 Q 320,440 620,490 T 920,460" />

                {/* Elevation Isoline Height Tags */}
                {activeTabLayer === 'elevation' && (
                  <g fill="#66756D" fontSize="9" fontWeight="bold" opacity="0.9">
                    <text x="50" y="115">418m</text>
                    <text x="50" y="215">416m</text>
                    <text x="50" y="335">412m Elevation</text>
                    <text x="50" y="465">408m</text>
                  </g>
                )}
              </g>

              {/* FAINT OUTER FIELD BUFFER LINE */}
              <polygon
                points="65,60 495,35 855,85 885,395 815,565 475,595 115,555 45,255"
                fill="none"
                stroke="#16A878"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.25"
              />

              {/* IRREGULAR AGRICULTURAL CROP ZONES (LAND PARCEL POLYGONS) */}
              {/* ZONE A: Soybean (0.8 Acre) */}
              <g
                onClick={() => setSelectedZone(FARM_ZONES[0])}
                className="cursor-pointer group transition-all duration-200"
              >
                <polygon
                  points="75,70 485,45 455,305 68,265"
                  fill={
                    activeTabLayer === 'soilMoisture'
                      ? 'url(#moisture-grad)'
                      : activeTabLayer === 'waterStress'
                      ? '#EAF8F1'
                      : 'url(#zone-a-grad)'
                  }
                  stroke={selectedZone?.id === 'zone-a' ? '#16A878' : '#DCE5DF'}
                  strokeWidth={selectedZone?.id === 'zone-a' ? '3.5' : '1.8'}
                  className="transition-all duration-300"
                />
                {/* Crop Row Textures */}
                <g stroke="#16A878" strokeWidth="0.8" opacity="0.12">
                  <line x1="100" y1="100" x2="440" y2="80" />
                  <line x1="95" y1="140" x2="435" y2="120" />
                  <line x1="90" y1="180" x2="430" y2="160" />
                  <line x1="85" y1="220" x2="425" y2="200" />
                </g>
              </g>

              {/* ZONE B: Maize (0.6 Acre) */}
              <g
                onClick={() => setSelectedZone(FARM_ZONES[1])}
                className="cursor-pointer group transition-all duration-200"
              >
                <polygon
                  points="485,45 845,95 805,315 455,305"
                  fill={
                    activeTabLayer === 'soilMoisture'
                      ? 'url(#moisture-grad)'
                      : activeTabLayer === 'waterStress'
                      ? '#EFF6FF'
                      : 'url(#zone-b-grad)'
                  }
                  stroke={selectedZone?.id === 'zone-b' ? '#16A878' : '#DCE5DF'}
                  strokeWidth={selectedZone?.id === 'zone-b' ? '3.5' : '1.8'}
                  className="transition-all duration-300"
                />
                {/* Crop Row Textures */}
                <g stroke="#34D399" strokeWidth="0.8" opacity="0.12">
                  <line x1="500" y1="80" x2="820" y2="120" />
                  <line x1="490" y1="130" x2="810" y2="170" />
                  <line x1="480" y1="180" x2="800" y2="220" />
                  <line x1="470" y1="230" x2="790" y2="270" />
                </g>
              </g>

              {/* ZONE C: Onion (0.5 Acre) */}
              <g
                onClick={() => setSelectedZone(FARM_ZONES[2])}
                className="cursor-pointer group transition-all duration-200"
              >
                <polygon
                  points="68,265 455,305 460,565 125,545"
                  fill={
                    activeTabLayer === 'soilMoisture'
                      ? '#FFF7E6'
                      : activeTabLayer === 'waterStress'
                      ? 'url(#stress-grad)'
                      : 'url(#zone-c-grad)'
                  }
                  stroke={selectedZone?.id === 'zone-c' ? '#16A878' : '#DCE5DF'}
                  strokeWidth={selectedZone?.id === 'zone-c' ? '3.5' : '1.8'}
                  className="transition-all duration-300"
                />
                {/* Crop Row Textures */}
                <g stroke="#F59E0B" strokeWidth="0.8" opacity="0.15">
                  <line x1="85" y1="310" x2="445" y2="350" />
                  <line x1="95" y1="370" x2="448" y2="410" />
                  <line x1="105" y1="430" x2="450" y2="470" />
                  <line x1="115" y1="490" x2="452" y2="530" />
                </g>
              </g>

              {/* ZONE D: Maize Buffer (0.5 Acre) */}
              <g
                onClick={() => setSelectedZone(FARM_ZONES[3])}
                className="cursor-pointer group transition-all duration-200"
              >
                <polygon
                  points="455,305 805,315 875,385 805,555 460,565"
                  fill={
                    activeTabLayer === 'soilMoisture'
                      ? 'url(#moisture-grad)'
                      : activeTabLayer === 'waterStress'
                      ? '#EAF8F1'
                      : 'url(#zone-d-grad)'
                  }
                  stroke={selectedZone?.id === 'zone-d' ? '#16A878' : '#DCE5DF'}
                  strokeWidth={selectedZone?.id === 'zone-d' ? '3.5' : '1.8'}
                  className="transition-all duration-300"
                />
                {/* Crop Row Textures */}
                <g stroke="#10B981" strokeWidth="0.8" opacity="0.12">
                  <line x1="470" y1="340" x2="800" y2="350" />
                  <line x1="470" y1="400" x2="840" y2="420" />
                  <line x1="470" y1="460" x2="815" y2="480" />
                </g>
              </g>

              {/* PEST RISK OVERLAY HOTSPOT */}
              {(activeTabLayer === 'pestRisk' || mapLayers.pestRisk) && (
                <g>
                  <circle cx="275" cy="420" r="85" fill="url(#pestHotspot)" />
                  <circle cx="275" cy="420" r="14" fill="#E45756" opacity="0.25" className="animate-ping" />
                  <circle cx="275" cy="420" r="6" fill="#E45756" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="290" y="424" fill="#E45756" fontSize="10" fontWeight="900">
                    Pest Risk Hotspot (68%)
                  </text>
                </g>
              )}

              {/* RAINFALL CONTOURS LAYER */}
              {(activeTabLayer === 'rainfall' || mapLayers.rainfall) && (
                <g stroke="#2F80ED" strokeWidth="1.5" opacity="0.6" fill="none">
                  <path d="M 90,80 C 300,160 500,70 820,110" strokeDasharray="6 4" />
                  <path d="M 80,240 C 320,310 520,220 830,280" strokeDasharray="6 4" />
                  <path d="M 120,440 C 340,510 540,420 820,480" strokeDasharray="6 4" />
                  <g fill="#2F80ED" fontSize="10" fontWeight="extrabold">
                    <text x="680" y="105">Isohyet: 12.4mm</text>
                    <text x="680" y="275">7-Day Forecast: 46mm</text>
                  </g>
                </g>
              )}

              {/* MAIN FARM BOUNDARY STROKE WITH GREEN GLOW */}
              <polygon
                points="75,70 485,45 845,95 875,385 805,555 465,585 125,545 68,265"
                fill="none"
                stroke="#16A878"
                strokeWidth="3.5"
                filter="url(#emeraldGlow)"
              />

              {/* 4. WATER SYSTEM & IRRIGATION PIPELINE */}
              {(activeTabLayer === 'irrigation' || mapLayers.irrigation) && (
                <g>
                  {/* BOREWELL B-01 WATER SOURCE */}
                  <g className="cursor-pointer" onClick={() => showToast('💧 Borewell B-01: Aquifer Level 92%, Pump Nominal')}>
                    {/* Underground Aquifer Reservoir */}
                    <ellipse cx="845" cy="95" rx="42" ry="22" fill="#E8F3FF" stroke="#2F80ED" strokeWidth="1.8" />
                    {/* Water Storage Tank */}
                    <rect x="815" y="45" width="60" height="34" rx="8" fill="#FFFFFF" stroke="#2F80ED" strokeWidth="2" />
                    <text x="822" y="66" fill="#2F80ED" fontSize="9" fontWeight="900">WATER POND</text>
                    {/* Borewell Pump Node */}
                    <circle cx="845" cy="95" r="9" fill="#2F80ED" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="760" y="115" fill="#2F80ED" fontSize="10" fontWeight="800">BOREWELL B-01</text>
                  </g>

                  {/* IRRIGATION PIPELINE NETWORK (THIN BLUE LINES WITH DIRECTIONAL ARROWS) */}
                  <g stroke="#2F80ED" strokeWidth="2.5" fill="none" className="animate-water-flow">
                    <path d="M 845,95 L 645,180 L 270,170 L 275,420 L 650,435" />
                    <path d="M 645,180 L 650,435" />
                    <path d="M 270,170 L 645,180" />
                  </g>

                  {/* DIRECTIONAL FLOW ARROW INDICATORS */}
                  <g fill="#2F80ED" opacity="0.9">
                    <polygon points="760,132 770,138 760,144" />
                    <polygon points="460,170 470,175 460,180" />
                    <polygon points="268,290 274,300 280,290" />
                    <polygon points="460,422 470,427 460,432" />
                  </g>

                  {/* IRRIGATION VALVES (V-01, V-02, V-03, V-04) */}
                  {valves.map((v) => (
                    <g
                      key={v.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveValve(v);
                      }}
                      className="cursor-pointer group"
                    >
                      <circle cx={v.x} cy={v.y} r="10" fill="#FFFFFF" stroke={v.statusColor} strokeWidth="2.5" />
                      <circle cx={v.x} cy={v.y} r="4" fill={v.statusColor} />
                      <rect
                        x={v.x - 30}
                        y={v.y - 24}
                        width="60"
                        height="16"
                        rx="8"
                        fill="#FFFFFF"
                        stroke="#DCE5DF"
                        strokeWidth="1"
                        className="shadow-xs"
                      />
                      <text x={v.x} y={v.y - 12} textAnchor="middle" fill="#17231D" fontSize="8" fontWeight="800">
                        {v.name} ({v.percentage}%)
                      </text>
                    </g>
                  ))}
                </g>
              )}

              {/* 5. SENSOR NETWORK NODES (S-01, S-02, S-03, S-04) */}
              <g>
                {sensors.map((s) => {
                  const isWarning = s.status === 'Warning';
                  return (
                    <g
                      key={s.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSensor(s);
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Sensor Ring Glow */}
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="12"
                        fill="none"
                        stroke={isWarning ? '#E45756' : '#16A878'}
                        strokeWidth="1"
                        opacity="0.4"
                        className={isWarning ? 'animate-ping' : ''}
                      />
                      <circle cx={s.x} cy={s.y} r="6" fill={isWarning ? '#E45756' : '#16A878'} stroke="#FFFFFF" strokeWidth="2" />
                      <text x={s.x + 10} y={s.y + 3} fill="#17231D" fontSize="9" fontWeight="800">
                        {s.id}: {s.reading}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* 6. FLOATING ZONE LABELS (INSIDE FIELD PARCELS) */}
              {FARM_ZONES.map((zone, idx) => {
                let coords = { x: 250, y: 140 };
                if (zone.id === 'zone-b') coords = { x: 610, y: 150 };
                if (zone.id === 'zone-c') coords = { x: 240, y: 360 };
                if (zone.id === 'zone-d') coords = { x: 610, y: 440 };

                return (
                  <foreignObject key={zone.id} x={coords.x - 70} y={coords.y - 35} width="150" height="70">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedZone(zone);
                      }}
                      className={`cursor-pointer bg-white/92 backdrop-blur-md p-2 rounded-xl border border-[#DCE5DF] shadow-xs hover:border-[#16A878] transition-all text-[#17231D] ${
                        selectedZone?.id === zone.id ? 'ring-2 ring-[#16A878] shadow-sm' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-[#17231D] uppercase tracking-tight">{zone.name}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EAF8F1] text-[#16A878]">
                          {zone.area}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#66756D] font-semibold truncate mt-0.5">{zone.crop}</div>
                      <div className="flex items-center justify-between text-[9px] font-extrabold mt-1 pt-1 border-t border-[#EAEFEA]">
                        <span className="text-[#16A878]">Health {zone.cropHealth}%</span>
                        <span className="text-[#2F80ED]">Water {zone.soilMoisture}%</span>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 7. FLOATING AI INSIGHT CARD OVER MAP */}
        <div className="absolute bottom-4 right-4 z-20 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#16A878]/40 shadow-lg animate-pulse-glow text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase bg-[#EAF8F1] text-[#16A878] px-2.5 py-0.5 rounded-full border border-[#16A878]/30">
              <Sparkles className="w-3 h-3 text-[#16A878]" />
              <span>AI FARM INSIGHT</span>
            </span>
            <span className="text-[10px] font-bold text-[#66756D]">Confidence: 91%</span>
          </div>

          <p className="text-[#17231D] font-bold leading-relaxed">
            "Zone C may require irrigation within the next 18 hours due to declining soil moisture (48%)."
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-[#DCE5DF]">
            <button
              onClick={() => setIrrigationModalOpen(true)}
              className="flex items-center space-x-1.5 bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold px-3 py-1.5 rounded-xl text-[11px] transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>ACTION: Optimize Irrigation</span>
            </button>
            <button
              onClick={() => setAiInsightModalOpen(true)}
              className="text-[10px] text-[#66756D] font-bold underline hover:text-[#17231D]"
            >
              Why?
            </button>
          </div>
        </div>

        {/* 8. BOTTOM-LEFT COMPACT GIS LEGEND */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#DCE5DF] text-[10px] text-[#17231D] space-y-1.5 shadow-sm">
          <div className="font-extrabold uppercase tracking-wider text-[#66756D]">FIELD STATUS LEGEND</div>
          <div className="flex items-center space-x-3 font-bold">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A878]" />
              <span>Healthy (90%+)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2B84B]" />
              <span>Watch (75-89%)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E45756]" />
              <span>Stress Alert (&lt;75%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 9. INLINE FIELD ZONE INSPECTOR BAR */}
      {showInspectorInline && selectedZone && (
        <div className="bg-white p-4 border-t border-[#DCE5DF] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-30 shrink-0">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-2xl bg-[#EAF8F1] text-[#16A878] border border-[#16A878]/30">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-extrabold text-base text-[#17231D]">ZONE DETAILS — {selectedZone.name}</h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#EAF8F1] text-[#16A878] border border-[#16A878]/30">
                  {selectedZone.crop}
                </span>
                <span className="text-[10px] font-bold text-[#66756D]">{selectedZone.area}</span>
              </div>
              <p className="text-xs text-[#66756D] mt-1 font-medium">{selectedZone.recommendedAction}</p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#2F80ED] mt-2 font-bold">
                <span>Soil Moisture: <strong>{selectedZone.soilMoisture}%</strong></span>
                <span>Crop Health: <strong>{selectedZone.cropHealth}%</strong></span>
                <span>Water Stress: <strong>{selectedZone.waterStress}</strong></span>
                <span>Pest Risk: <strong>{selectedZone.pestRisk}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => setIrrigationModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 bg-[#16A878] hover:bg-[#128F66] text-white font-bold px-4 py-2.5 rounded-full text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-white" />
              <span>Schedule Irrigation</span>
            </button>
            <button
              onClick={() => setSelectedZone(null)}
              className="p-2 text-[#66756D] hover:text-[#17231D]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 10. SENSOR DETAILS MODAL / DRAWER */}
      {activeSensor && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#DCE5DF] pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#E8F3FF] text-[#2F80ED] rounded-2xl">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#17231D]">{activeSensor.name} Telemetry</h4>
                  <p className="text-xs text-[#66756D]">{activeSensor.type} • {activeSensor.zone}</p>
                </div>
              </div>
              <button onClick={() => setActiveSensor(null)} className="p-1 text-[#66756D] hover:text-[#17231D]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F5F7F3] p-3 rounded-2xl border border-[#DCE5DF]">
                <span className="text-[10px] font-extrabold uppercase text-[#66756D]">Current Reading</span>
                <div className="text-2xl font-black text-[#17231D] mt-1">{activeSensor.reading}</div>
                <span className="text-[10px] text-[#16A878] font-bold">{activeSensor.trend}</span>
              </div>

              <div className="bg-[#F5F7F3] p-3 rounded-2xl border border-[#DCE5DF]">
                <span className="text-[10px] font-extrabold uppercase text-[#66756D]">Sensor Battery</span>
                <div className="text-2xl font-black text-[#16A878] mt-1">{activeSensor.battery}%</div>
                <span className="text-[10px] text-[#66756D]">Solar Charging Active</span>
              </div>
            </div>

            <div className="bg-[#F5F7F3] p-3 rounded-2xl border border-[#DCE5DF] text-xs space-y-1">
              <div className="flex justify-between text-[#66756D]">
                <span>Installation Depth:</span>
                <strong className="text-[#17231D]">{activeSensor.depth}</strong>
              </div>
              <div className="flex justify-between text-[#66756D]">
                <span>Sensor Status:</span>
                <strong className="text-[#16A878]">{activeSensor.status}</strong>
              </div>
              <div className="flex justify-between text-[#66756D]">
                <span>Last Transmission:</span>
                <strong className="text-[#17231D]">18 seconds ago</strong>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Calibrated ${activeSensor.name} telemetry frequency.`);
                setActiveSensor(null);
              }}
              className="w-full bg-[#16A878] hover:bg-[#128F66] text-white font-bold py-2.5 rounded-full text-xs shadow-xs transition-all"
            >
              Re-calibrate Telemetry Node
            </button>
          </div>
        </div>
      )}

      {/* 11. IRRIGATION VALVE DETAILS MODAL */}
      {activeValve && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#DCE5DF] pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#E8F3FF] text-[#2F80ED] rounded-2xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#17231D]">{activeValve.name} Pipeline Node</h4>
                  <p className="text-xs text-[#66756D]">{activeValve.zone} Irrigation Lateral</p>
                </div>
              </div>
              <button onClick={() => setActiveValve(null)} className="p-1 text-[#66756D] hover:text-[#17231D]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F5F7F3] p-3 rounded-2xl border border-[#DCE5DF]">
                <span className="text-[10px] font-extrabold uppercase text-[#66756D]">Current Flow Rate</span>
                <div className="text-xl font-black text-[#2F80ED] mt-1">{activeValve.flowRate}</div>
              </div>

              <div className="bg-[#F5F7F3] p-3 rounded-2xl border border-[#DCE5DF]">
                <span className="text-[10px] font-extrabold uppercase text-[#66756D]">Pressure</span>
                <div className="text-xl font-black text-[#17231D] mt-1">{activeValve.pressure}</div>
              </div>
            </div>

            <div className="bg-[#EAF8F1] p-3.5 rounded-2xl border border-[#16A878]/30 text-xs text-[#12372A] space-y-1">
              <div className="font-extrabold text-[#16A878]">AI Recommended Schedule:</div>
              <p className="font-medium">Maintain 72% flow for 45 minutes tomorrow morning at 06:00 AM.</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  showToast(`Adjusted ${activeValve.name} flow rate.`);
                  setActiveValve(null);
                }}
                className="flex-1 bg-[#16A878] hover:bg-[#128F66] text-white font-bold py-2.5 rounded-full text-xs shadow-xs"
              >
                Set Remote Schedule
              </button>
              <button
                onClick={() => setActiveValve(null)}
                className="px-4 bg-[#F5F7F3] hover:bg-[#EAEFEA] text-[#17231D] font-bold py-2.5 rounded-full text-xs border border-[#DCE5DF]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. AI INSIGHT DETAIL MODAL */}
      {aiInsightModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] max-w-lg w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#DCE5DF] pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#EAF8F1] text-[#16A878] rounded-2xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#17231D]">AI Recommendation Diagnostic</h4>
                  <p className="text-xs text-[#66756D]">Zone C Irrigation & Moisture Prediction</p>
                </div>
              </div>
              <button onClick={() => setAiInsightModalOpen(false)} className="p-1 text-[#66756D] hover:text-[#17231D]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#F5F7F3] p-4 rounded-2xl border border-[#DCE5DF]">
                <strong className="font-extrabold text-[#17231D] block mb-1">Diagnostic Root Cause:</strong>
                <p className="text-[#66756D] leading-relaxed">
                  Zone C soil moisture has dropped to 48% due to high ambient temperature (28.4°C) and lack of precipitation over the past 72 hours.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#E8F3FF] p-3 rounded-2xl border border-[#2F80ED]/30">
                  <span className="text-[10px] font-extrabold uppercase text-[#2F80ED]">Expected Yield Loss if Delayed</span>
                  <div className="text-lg font-black text-[#17231D] mt-0.5">-8.4%</div>
                </div>

                <div className="bg-[#EAF8F1] p-3 rounded-2xl border border-[#16A878]/30">
                  <span className="text-[10px] font-extrabold uppercase text-[#16A878]">AI Confidence</span>
                  <div className="text-lg font-black text-[#16A878] mt-0.5">91%</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  setIrrigationModalOpen(true);
                  setAiInsightModalOpen(false);
                }}
                className="flex-1 bg-[#16A878] hover:bg-[#128F66] text-white font-bold py-2.5 rounded-full text-xs shadow-xs"
              >
                Execute Irrigation Plan
              </button>
              <button
                onClick={() => setAiInsightModalOpen(false)}
                className="px-4 bg-[#F5F7F3] hover:bg-[#EAEFEA] text-[#17231D] font-bold py-2.5 rounded-full text-xs border border-[#DCE5DF]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
