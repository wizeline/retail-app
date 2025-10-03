// Type definitions for the retail application

export interface Zone {
  id: string;
  name: string;
  type: string;
  capacity: number;
  weight: {
    velocity: number;
    margin: number;
    price: number;
    fit: number;
  };
}

export interface Product {
  id: string;
  name: string;
  cat: string;
  price: number;
  margin: number;
  velocity: number;
  score?: number;
}

export interface Metrics {
  fill_rate: number;
  avg_ticket: number;
  est_daily_sales: number;
  avg_margin_rate: number;
  categories: number;
  score_sum: number;
  top3?: Array<{
    id: string;
    name: string;
    score: number;
  }>;
}

export interface DragData {
  origin: "inventory" | "slot";
  pid: string;
  from_slot?: number;
}

export interface MoveRequestBody {
  origin: "inventory" | "slot";
  pid: string;
  to_slot: number;
  from_slot?: number;
}

export interface ZoneStateResponse {
  layout: string[];
  metrics: Metrics;
}
