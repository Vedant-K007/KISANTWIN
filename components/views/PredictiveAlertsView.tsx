'use client';

import React from 'react';
import { useResilience } from '../../context/ResilienceContext';
import { RECOMMENDED_ACTIONS } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { BellRing, ShieldAlert, CheckCircle2, UserPlus, Eye, XCircle, Send, Brain } from 'lucide-react';

export const PredictiveAlertsView: React.FC = () => {
  const {
    currentAlerts,
    resolveAlert,
    assignAlert,
    openDispatchModal,
    showToast
  } = useResilience();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
            OPERATIONAL DECISION CENTER
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Predictive Alerts & Recommended Actions
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            AI-generated early warnings and decision-support directives for municipal operators.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-rose-50 border border-rose-200 text-rose-800 font-extrabold px-3.5 py-2 rounded-xl">
          <BellRing className="w-4 h-4 text-rose-600 animate-bounce" />
          <span>{currentAlerts.filter((a) => a.status !== 'Resolved').length} Active Alerts Requiring Action</span>
        </div>
      </div>

      {/* Main Grid: Alert List (left 7 cols) & Recommended Actions Checklist (right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Predictive Alerts List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Active Predictive Alerts</span>
          </h3>

          <div className="space-y-3">
            {currentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-5 border transition-all shadow-xs space-y-3 ${
                  alert.severity === 'HIGH'
                    ? 'border-rose-300 ring-1 ring-rose-300/50'
                    : alert.severity === 'MEDIUM'
                    ? 'border-amber-300'
                    : 'border-slate-200'
                } ${alert.status === 'Resolved' ? 'opacity-60 bg-slate-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        alert.severity === 'HIGH'
                          ? 'bg-rose-600 text-white'
                          : alert.severity === 'MEDIUM'
                          ? 'bg-amber-500 text-white'
                          : 'bg-cyan-600 text-white'
                      }`}
                    >
                      {alert.severity} SEVERITY
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{alert.timestamp}</span>
                  </div>

                  <StatusBadge status={alert.status} />
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{alert.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[11px] font-medium">
                  <div>Window: <strong>{alert.predictionWindow}</strong></div>
                  <div>Confidence: <strong className="text-cyan-700">{alert.confidence}%</strong></div>
                  <div>Metric: <strong>{alert.metric}</strong></div>
                </div>

                {/* Alert Action Buttons */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openDispatchModal(alert)}
                      className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Team</span>
                    </button>
                    <button
                      onClick={() => assignAlert(alert.id)}
                      className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-slate-500" />
                      <span>Assign</span>
                    </button>
                  </div>

                  {alert.status !== 'Resolved' && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-800 font-bold hover:underline"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dismiss / Resolve</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI RECOMMENDED ACTIONS CHECKLIST */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">
              DECISION SUPPORT
            </span>
            <h3 className="font-extrabold text-base text-slate-900 mt-1 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-cyan-600" />
              <span>AI Recommended Action Directives</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Optimized operational order generated from real-time Pune hydro-telemetry.
            </p>
          </div>

          <div className="space-y-3">
            {RECOMMENDED_ACTIONS.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-cyan-300 font-extrabold text-[10px] flex items-center justify-center">
                      {item.step}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    PRIORITY
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] pl-7">{item.detail}</p>
                <div className="pl-7 pt-1">
                  <button
                    onClick={() => showToast(`Directive executed: "${item.title}"`)}
                    className="text-[10px] font-bold text-cyan-700 hover:underline"
                  >
                    Execute Step →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
