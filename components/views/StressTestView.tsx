'use client';

import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Brain,
  GitBranch,
  Droplets,
  CloudRain,
  Thermometer,
  DollarSign,
  Bug
} from 'lucide-react';

export const StressTestView: React.FC = () => {
  const {
    stressInputs,
    setStressInputs,
    isSimulating,
    simulationStepText,
    hasRunSimulation,
    runStressSimulation,
    isOptimized,
    runAIOptimization,
    resetStressTest
  } = useFarm();

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#F0F9F4] via-white to-[#EAF8F1] p-6 md:p-8 rounded-3xl border border-[#DCE5DF] shadow-xs space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#EAF8F1] text-[#16A878] px-3 py-1 rounded-full border border-[#16A878]/30">
            HERO SIMULATION ENGINE • DIGITAL TWIN STRESS TEST
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#17231D]">
          Farm Stress Test
        </h2>
        <p className="text-sm text-[#66756D] font-medium max-w-3xl">
          Test your farm against tomorrow's uncertainties before they happen. Simulate climate events, water scarcity, market crashes, and pest pressure in real time.
        </p>
      </div>

      {/* Main Grid: Controls (Left 5 Cols) & Simulation Results (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: SCENARIO CONTROLS */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#DCE5DF] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#DCE5DF]/60 pb-3">
            <h3 className="font-extrabold text-base text-[#17231D] flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#16A878]" />
              <span>SCENARIO BUILDER</span>
            </h3>
            <button
              onClick={resetStressTest}
              className="text-xs text-[#66756D] hover:text-[#17231D] font-bold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Controls</span>
            </button>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Control 1: Rainfall */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#17231D]">
                <span className="flex items-center space-x-1.5">
                  <CloudRain className="w-4 h-4 text-[#2F80ED]" />
                  <span>Rainfall Deficit:</span>
                </span>
                <span className="font-extrabold text-[#E45756]">{stressInputs.rainfall}%</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {[0, -10, -20, -30, -50].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStressInputs((prev) => ({ ...prev, rainfall: val }))}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      stressInputs.rainfall === val
                        ? 'bg-[#16A878] text-white shadow-xs'
                        : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {val === 0 ? 'Normal' : `${val}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Water Availability (Blue Selection State) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#17231D]">
                <span className="flex items-center space-x-1.5">
                  <Droplets className="w-4 h-4 text-[#2F80ED]" />
                  <span>Water Availability:</span>
                </span>
                <span className="font-extrabold text-[#2F80ED]">{stressInputs.water}%</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, -20, -40].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStressInputs((prev) => ({ ...prev, water: val }))}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      stressInputs.water === val
                        ? 'bg-[#2F80ED] text-white shadow-xs'
                        : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {val === 0 ? 'Normal' : `${val}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#17231D]">
                <span className="flex items-center space-x-1.5">
                  <Thermometer className="w-4 h-4 text-[#F2B84B]" />
                  <span>Temperature Increase:</span>
                </span>
                <span className="font-extrabold text-[#F2B84B]">+{stressInputs.temperature}°C</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStressInputs((prev) => ({ ...prev, temperature: val }))}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      stressInputs.temperature === val
                        ? 'bg-[#F2B84B] text-slate-950 shadow-xs'
                        : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {val === 0 ? 'Normal' : `+${val}°C`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Market Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#17231D]">
                <span className="flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4 text-[#16A878]" />
                  <span>Market Price Shock:</span>
                </span>
                <span className="font-extrabold text-[#E45756]">{stressInputs.market}%</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, -10, -20, -30].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStressInputs((prev) => ({ ...prev, market: val }))}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      stressInputs.market === val
                        ? 'bg-[#17231D] text-white shadow-xs'
                        : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {val === 0 ? 'Normal' : `${val}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 5: Pest Pressure */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#17231D]">
                <span className="flex items-center space-x-1.5">
                  <Bug className="w-4 h-4 text-[#E45756]" />
                  <span>Pest Pressure:</span>
                </span>
                <span className="font-extrabold text-[#E45756]">{stressInputs.pest}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Normal', 'Moderate', 'High', 'Severe'] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => setStressInputs((prev) => ({ ...prev, pest: val }))}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      stressInputs.pest === val
                        ? 'bg-[#E45756] text-white shadow-xs'
                        : 'bg-[#F5F7F3] text-[#66756D] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RUN FARM SIMULATION BUTTON */}
          <button
            onClick={runStressSimulation}
            disabled={isSimulating}
            className="w-full flex items-center justify-center space-x-2 bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold py-4 rounded-full text-sm shadow-xs transition-all transform active:scale-95 disabled:opacity-50"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{isSimulating ? 'SIMULATING TWIN...' : '[RUN FARM SIMULATION]'}</span>
          </button>
        </div>

        {/* RIGHT PANEL: SIMULATION RESULTS & AI OPTIMIZER */}
        <div className="lg:col-span-7 space-y-6">
          {/* SIMULATION LOADING INTERACTION */}
          {isSimulating && (
            <div className="bg-[#12372A] text-white p-8 rounded-3xl border border-[#1E523F] text-center space-y-4 shadow-xl animate-pulse">
              <Sparkles className="w-10 h-10 text-[#16A878] mx-auto animate-spin" />
              <div>
                <h4 className="font-extrabold text-lg text-white">Running KisanTwin Farm Stress Test</h4>
                <p className="text-xs text-[#65C18C] mt-1 font-bold">{simulationStepText}</p>
              </div>
            </div>
          )}

          {/* SIMULATION RESULTS (BEFORE vs AFTER) */}
          {hasRunSimulation && !isSimulating && (
            <div className="bg-white rounded-3xl p-6 border border-[#DCE5DF] shadow-xs space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCE5DF]/60 pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#E45756] bg-[#FDE8E8] px-2.5 py-0.5 rounded-full border border-[#E45756]/30">
                    SIMULATION IMPACT RESULT
                  </span>
                  <h3 className="font-extrabold text-xl text-[#17231D] mt-1">
                    Uncertainty Scenario Impact
                  </h3>
                </div>
                <div className="text-xs font-extrabold text-[#17231D] bg-[#F5F7F3] px-3 py-1 rounded-full border border-[#DCE5DF]">
                  Rainfall {stressInputs.rainfall}% • Water {stressInputs.water}% • Temp +{stressInputs.temperature}°C
                </div>
              </div>

              {/* BEFORE → AFTER IMPACT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#DCE5DF]">
                  <div className="text-[10px] font-extrabold text-[#66756D] uppercase">Expected Yield</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-[#66756D] line-through font-bold">18.4 q</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66756D]" />
                    <span className="text-xl font-black text-[#E45756]">15.2 q</span>
                  </div>
                  <div className="text-[10px] text-[#E45756] font-extrabold mt-1">↓ 17.4% Loss</div>
                </div>

                <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#DCE5DF]">
                  <div className="text-[10px] font-extrabold text-[#66756D] uppercase">Water Requirement</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-[#66756D] line-through font-bold">6,920 L</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66756D]" />
                    <span className="text-xl font-black text-[#E45756]">8,140 L</span>
                  </div>
                  <div className="text-[10px] text-[#E45756] font-extrabold mt-1">↓ 17.6% Deficit</div>
                </div>

                <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#DCE5DF]">
                  <div className="text-[10px] font-extrabold text-[#66756D] uppercase">Crop Risk Level</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-[#66756D] line-through font-bold">Medium</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66756D]" />
                    <span className="text-xl font-black text-[#E45756]">Critical</span>
                  </div>
                  <div className="text-[10px] text-[#E45756] font-extrabold mt-1">High Stress Alert</div>
                </div>

                <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#DCE5DF]">
                  <div className="text-[10px] font-extrabold text-[#66756D] uppercase">Expected Revenue</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-[#66756D] line-through font-bold">₹58,000</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66756D]" />
                    <span className="text-xl font-black text-[#E45756]">₹46,000</span>
                  </div>
                  <div className="text-[10px] text-[#E45756] font-extrabold mt-1">↓ ₹12,000 Loss</div>
                </div>

                <div className="p-4 bg-[#F5F7F3] rounded-2xl border border-[#DCE5DF]">
                  <div className="text-[10px] font-extrabold text-[#66756D] uppercase">Expected Profit</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-[#66756D] line-through font-bold">₹46,800</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66756D]" />
                    <span className="text-xl font-black text-[#E45756]">₹28,600</span>
                  </div>
                  <div className="text-[10px] text-[#E45756] font-extrabold mt-1">↓ 38.8% Crash</div>
                </div>

                <div className="p-4 bg-[#FDE8E8] rounded-2xl border border-[#E45756]/30 flex flex-col justify-between">
                  <div className="text-[10px] font-extrabold text-[#E45756] uppercase">Overall Threat</div>
                  <div className="text-lg font-black text-[#E45756]">CRITICAL RISK</div>
                  <div className="text-[10px] text-[#E45756] font-bold">Optimization Needed</div>
                </div>
              </div>

              {/* LET KISANTWIN OPTIMIZE BUTTON */}
              {!isOptimized && (
                <div className="pt-2">
                  <button
                    onClick={runAIOptimization}
                    className="w-full flex items-center justify-center space-x-2 bg-[#16A878] hover:bg-[#128F66] text-white font-extrabold py-4 rounded-full text-sm shadow-sm transition-all transform active:scale-95"
                  >
                    <Brain className="w-5 h-5 text-white" />
                    <span>[OPTIMIZE FARM PLAN WITH KISANTWIN AI]</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* AI OPTIMIZATION RESULT & INTERVENTION DIRECTIVES */}
          {isOptimized && (
            <div className="bg-[#EAF8F1] border border-[#16A878]/40 text-[#17231D] rounded-3xl p-6 shadow-sm space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#16A878]/20 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#16A878] text-white rounded-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#16A878]">
                      KISANTWIN OPTIMIZED FARM PLAN
                    </span>
                    <h4 className="text-lg font-extrabold text-[#17231D]">
                      AI Recommended Resilient Strategy
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-extrabold bg-[#16A878] text-white px-3.5 py-1 rounded-full shadow-xs">
                  +19 Resilience Points
                </span>
              </div>

              {/* 5-Step Intervention Directives */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-2xl border border-[#16A878]/30 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#16A878] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="font-extrabold text-[#17231D]">Reduce irrigation frequency by 18%</strong>
                    <p className="text-[11px] text-[#66756D]">Shift to micro-drip cycles at early morning hours (05:30 - 07:30) to reduce evaporation loss.</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#16A878]/30 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#16A878] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="font-extrabold text-[#17231D]">Move 0.6 acre to drought-resilient crop strain</strong>
                    <p className="text-[11px] text-[#66756D]">Substitute high-water requirement vegetable patch with short-duration drought cultivar.</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#16A878]/30 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#16A878] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="font-extrabold text-[#17231D]">Shift fertilizer application by 5 days</strong>
                    <p className="text-[11px] text-[#66756D]">Align potassium spray with Day 5 rain forecast (12mm) to maximize root absorption.</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#16A878]/30 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#16A878] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="font-extrabold text-[#17231D]">Prioritize Zone B pod-fill irrigation</strong>
                    <p className="text-[11px] text-[#66756D]">Reallocate 600L from Zone D fodder to prevent soybean yield drop.</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-[#16A878]/30 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#16A878] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">5</span>
                  <div>
                    <strong className="font-extrabold text-[#17231D]">Delay harvest by 3 days based on market projection</strong>
                    <p className="text-[11px] text-[#66756D]">Mandi price model predicts +10% price rebound post-weekend arrival drop.</p>
                  </div>
                </div>
              </div>

              {/* WITHOUT KISANTWIN vs WITH KISANTWIN COMPARISON BOX */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 bg-white rounded-2xl border border-[#E45756]/30 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase text-[#E45756]">WITHOUT KISANTWIN</div>
                  <div className="text-xl font-black text-[#E45756]">₹28,600 Profit</div>
                  <div className="text-[10px] text-[#66756D]">Water Deficit: Critical • Yield Loss: -17%</div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-[#16A878]/50 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase text-[#16A878]">WITH KISANTWIN AI</div>
                  <div className="text-xl font-black text-[#16A878]">₹46,800 Profit</div>
                  <div className="text-[10px] text-[#66756D]">Water Saved: -31% • Yield Restored: 17.9 q</div>
                </div>
              </div>

              {/* AI RECOMMENDATION CARD WITH GREEN LEFT BORDER */}
              <div className="bg-white p-4 rounded-2xl border border-[#DCE5DF] border-l-4 border-l-[#16A878] space-y-2 text-xs">
                <div className="flex items-center justify-between font-extrabold text-[#17231D]">
                  <span className="flex items-center space-x-1.5">
                    <Brain className="w-4 h-4 text-[#16A878]" />
                    <span>AI RECOMMENDATION REASONING</span>
                  </span>
                  <span className="text-[10px] bg-[#EAF8F1] text-[#16A878] px-2 py-0.5 rounded font-extrabold">
                    Confidence: 89%
                  </span>
                </div>
                <p className="text-[#66756D] font-medium leading-relaxed">
                  "Reduce irrigation frequency by 18% and move 0.6 acre to a drought-resilient crop because expected rainfall on Day 5 offsets soil water stress while preserving net profit."
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-[#66756D] pt-1">
                  <span className="bg-[#F5F7F3] px-2 py-0.5 rounded border border-[#DCE5DF]">Rainfall -30%</span> →
                  <span className="bg-[#F5F7F3] px-2 py-0.5 rounded border border-[#DCE5DF]">Soil Moisture 48%</span> →
                  <span className="bg-[#F5F7F3] px-2 py-0.5 rounded border border-[#DCE5DF]">Drip Shift -18%</span> →
                  <span className="bg-[#EAF8F1] text-[#16A878] px-2 py-0.5 rounded border border-[#16A878]/30">Profit Preserved ₹46,800</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
