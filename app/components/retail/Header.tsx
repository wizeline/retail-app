// Header component for the retail application

import React from "react";

interface HeaderProps {
  baseUrl: string;
  onBaseUrlChange: (url: string) => void;
  onReload: () => void;
}

export function Header({ baseUrl, onBaseUrlChange, onReload }: HeaderProps) {
  return (
    <header className="flex flex-wrap gap-4 items-center justify-between mb-2">
      <div className="flex items-center gap-4">
        <div
          className="relative"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background:
              "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
            boxShadow:
              "0 0 0 4px rgba(139, 92, 246, 0.1), 0 8px 16px -4px rgba(139, 92, 246, 0.4)",
          }}
        >
          <div
            className="absolute inset-0 rounded-xl opacity-50"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 100%)",
            }}
          />
        </div>
        <div>
          <div className="font-bold tracking-tight text-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            retAIl
          </div>
          <div className="chip mt-1">Smart Planogram · AI Powered</div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <input
          value={baseUrl}
          onChange={(e) => onBaseUrlChange(e.target.value)}
          placeholder="API Base URL"
          className="px-4 py-2.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 w-72 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-slate-500"
        />
        <button className="btn" onClick={onReload}>
          <span className="flex items-center gap-2">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reload
          </span>
        </button>
      </div>
    </header>
  );
}
