'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { FPO_DATA, FarmCluster } from '../../data/mockFarmData';
import { StatusBadge } from '../common/StatusBadge';
import { Building, Users, Droplets, MapPin, Send } from 'lucide-react';

export const RegionalClusterMap: React.FC = () => {
  const { showToast } = useFarm();
  const [selectedCluster, setSelectedCluster] = React.useState<FarmCluster>(FPO_DATA.clusters[0]);

  return (
    <div className="bg-[#051C15] text-white rounded-3xl p-5 border border-emerald-900/60 shadow-xl space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
            <Building className="w-5 h-5 text-emerald-400" />
            <span>FPO Regional Farm Cluster Spatial Map</span>
          </h3>
          <p className="text-xs text-emerald-200/70">
            Monitoring 1,284 farmers across 8,420 acres in Pune District.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800">
          3 Major Clusters Active
        </span>
      </div>

      {/* Map SVG Canvas */}
      <div className="relative h-[320px] w-full bg-[#03130E] rounded-2xl overflow-hidden border border-emerald-900/40">
        <svg className="w-full h-full" viewBox="0 0 500 280">
          {/* Contour Lines */}
          <path d="M 50,40 Q 150,120 300,80 T 450,160" fill="none" stroke="#0E382C" strokeWidth="2" strokeDasharray="4,4" />
          <path d="M 80,180 Q 220,140 380,220" fill="none" stroke="#0E382C" strokeWidth="2" strokeDasharray="4,4" />

          {/* Cluster Hotspot Nodes */}
          {FPO_DATA.clusters.map((cluster) => {
            const isSelected = selectedCluster.id === cluster.id;

            return (
              <g
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className="cursor-pointer group"
              >
                <circle
                  cx={cluster.x * 5}
                  cy={cluster.y * 2.8}
                  r={isSelected ? 24 : 18}
                  fill={cluster.status === 'Critical' ? '#EF4444' : cluster.status === 'Watch' ? '#F59E0B' : '#10B981'}
                  opacity="0.3"
                  className="animate-ping"
                />
                <circle
                  cx={cluster.x * 5}
                  cy={cluster.y * 2.8}
                  r={isSelected ? 16 : 12}
                  fill={cluster.status === 'Critical' ? '#EF4444' : cluster.status === 'Watch' ? '#F59E0B' : '#10B981'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <text
                  x={cluster.x * 5 - 20}
                  y={cluster.y * 2.8 + 28}
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {cluster.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Cluster Inspector Card */}
      {selectedCluster && (
        <div className="bg-[#08231B] p-4 rounded-2xl border border-emerald-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-black text-sm text-white">{selectedCluster.name}</h4>
              <StatusBadge status={selectedCluster.status} />
            </div>
            <p className="text-emerald-200/80 text-[11px] mt-0.5">
              Farmers: <strong>{selectedCluster.farmersCount}</strong> • Area: <strong>{selectedCluster.acreage} acres</strong> • Crop: <strong>{selectedCluster.crop}</strong>
            </p>
            <div className="text-[11px] text-cyan-300 mt-2 font-medium">
              Intervention Directive: {selectedCluster.intervention}
            </div>
          </div>

          <button
            onClick={() => showToast(`Issued FPO intervention advisory to ${selectedCluster.farmersCount} farmers in ${selectedCluster.name}!`)}
            className="flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Issue Cluster Advisory</span>
          </button>
        </div>
      )}
    </div>
  );
};
