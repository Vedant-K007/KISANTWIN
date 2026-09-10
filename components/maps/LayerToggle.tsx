'use client';

import React from 'react';
import { useFarm, FarmMapLayers } from '../../context/FarmContext';
import { Sprout, Droplets, Bug, GitMerge, CloudRain, Mountain } from 'lucide-react';

export const LayerToggle: React.FC = () => {
  const { mapLayers, toggleMapLayer } = useFarm();

  const layers: Array<{ key: keyof FarmMapLayers; label: string; icon: React.ElementType; color: string }> = [
    { key: 'cropHealth', label: 'Crop Health', icon: Sprout, color: 'text-[#16A878]' },
    { key: 'soilMoisture', label: 'Soil Moisture', icon: Droplets, color: 'text-[#2F80ED]' },
    { key: 'waterStress', label: 'Water Stress', icon: Droplets, color: 'text-[#2F80ED]' },
    { key: 'pestRisk', label: 'Pest Risk', icon: Bug, color: 'text-[#F2B84B]' },
    { key: 'irrigation', label: 'Irrigation Lines', icon: GitMerge, color: 'text-[#16A878]' },
    { key: 'rainfall', label: 'Rainfall', icon: CloudRain, color: 'text-[#2F80ED]' },
    { key: 'elevation', label: 'Elevation', icon: Mountain, color: 'text-[#66756D]' },
  ];

  return (
    <div className="bg-white p-2 rounded-full border border-[#DCE5DF] shadow-xs flex flex-wrap items-center gap-1.5 text-xs select-none">
      <span className="font-extrabold text-[10px] uppercase text-[#66756D] px-2">Twin Layers:</span>
      {layers.map((layer) => {
        const Icon = layer.icon;
        const isActive = mapLayers[layer.key];

        return (
          <button
            key={layer.key}
            onClick={() => toggleMapLayer(layer.key)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              isActive
                ? 'bg-[#17231D] text-white shadow-xs'
                : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#16A878]' : layer.color}`} />
            <span>{layer.label}</span>
          </button>
        );
      })}
    </div>
  );
};
