// Zone controls component

import React from "react";
import { Zone } from "@/app/types/retail";

interface ZoneControlsProps {
  zones: Zone[];
  selectedZoneId: string;
  onZoneChange: (zoneId: string) => void;
  onPredict: () => void;
  onClear: () => void;
  loading: boolean;
}

export function ZoneControls({
  zones,
  selectedZoneId,
  onZoneChange,
  onPredict,
  onClear,
  loading,
}: ZoneControlsProps) {
  const selectedZone = zones.find((z) => z.id === selectedZoneId);

  return (
    <div className="card p-5 space-y-4">
      <div className="font-bold text-slate-200 text-lg flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        Zone Control
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-400 mb-2 block uppercase tracking-wider">
          Select Zone
        </label>
        <select
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer"
          value={selectedZoneId}
          onChange={(e) => onZoneChange(e.target.value)}
        >
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name} · {z.type} · cap {z.capacity}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          className="btn good flex-1"
          onClick={onPredict}
          disabled={!selectedZoneId || loading}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            AI Predict
          </span>
        </button>
        <button
          className="btn warn flex-1"
          onClick={onClear}
          disabled={!selectedZoneId || loading}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear
          </span>
        </button>
      </div>
      {selectedZone && (
        <div className="pt-3 border-t border-slate-700/50">
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Weight Configuration
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Velocity:</span>
              <span className="font-semibold text-cyan-400">
                {selectedZone.weight.velocity}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Margin:</span>
              <span className="font-semibold text-purple-400">
                {selectedZone.weight.margin}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Price:</span>
              <span className="font-semibold text-blue-400">
                {selectedZone.weight.price}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Fit:</span>
              <span className="font-semibold text-emerald-400">
                {selectedZone.weight.fit}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
