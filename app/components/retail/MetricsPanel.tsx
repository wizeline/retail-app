// Metrics panel component

import React from "react";
import { Metrics } from "@/app/types/retail";

interface MetricsPanelProps {
  metrics: Metrics | null;
  testsStatus?: string;
}

export function MetricsPanel({ metrics, testsStatus }: MetricsPanelProps) {
  return (
    <div className="card p-5 space-y-4">
      <div className="font-bold text-slate-200 text-lg flex items-center gap-2">
        <span className="text-2xl">📊</span>
        KPIs
      </div>
      {metrics ? (
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Fill rate"
            value={`${(metrics.fill_rate * 100).toFixed(0)}%`}
          />
          <MetricCard
            label="Avg ticket"
            value={`$${metrics.avg_ticket.toFixed(2)}`}
          />
          <MetricCard
            label="Est. sales"
            value={`$${metrics.est_daily_sales.toFixed(0)}`}
          />
          <MetricCard
            label="Avg margin"
            value={`${(metrics.avg_margin_rate * 100).toFixed(1)}%`}
          />
          <MetricCard label="Categories" value={String(metrics.categories)} />
          <MetricCard label="Score sum" value={metrics.score_sum.toFixed(2)} />
        </div>
      ) : (
        <div className="text-sm text-slate-400 py-4 text-center">
          No metrics yet.
        </div>
      )}
      {metrics && metrics.top3 && metrics.top3.length > 0 && (
        <div className="pt-3 border-t border-slate-700/50">
          <div className="chip mb-3">🏆 Top 3 Products</div>
          <ul className="space-y-2">
            {metrics.top3.map((t, idx) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400">
                    #{idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-300">
                    {t.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-cyan-400">
                  {t.score.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {testsStatus && (
        <div className="text-xs text-slate-500 pt-2 border-t border-slate-700/50 flex items-center gap-2">
          <span className="text-green-400">✓</span>
          {testsStatus}
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-4 rounded-xl transition-all hover:scale-105"
      style={{
        background:
          "linear-gradient(135deg, rgba(51, 65, 85, 0.4), rgba(30, 41, 59, 0.6))",
        border: "1px solid rgba(148, 163, 184, 0.15)",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-2xl font-bold mt-1 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {value}
      </div>
    </div>
  );
}
