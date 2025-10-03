// Custom hooks for managing retail data

import { useState, useEffect, useCallback } from "react";
import { ApiService } from "../services/api";
import { Zone, Product, Metrics } from "../types/retail";

export function useZones(apiService: ApiService) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadZones = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getZones();
      setZones(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [apiService]);

  useEffect(() => {
    loadZones();
  }, [loadZones]);

  return { zones, loading, error, reload: loadZones };
}

export function useZoneState(apiService: ApiService, zoneId: string | null) {
  const [layout, setLayout] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadZoneState = useCallback(async () => {
    if (!zoneId) return;

    setLoading(true);
    setError(null);
    try {
      const [layoutData, metricsData] = await Promise.all([
        apiService.getZoneLayout(zoneId),
        apiService.getZoneMetrics(zoneId),
      ]);
      setLayout(layoutData.layout);
      setMetrics(metricsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [apiService, zoneId]);

  useEffect(() => {
    loadZoneState();
  }, [loadZoneState]);

  const updateState = useCallback(
    (newLayout: string[], newMetrics: Metrics) => {
      setLayout(newLayout);
      setMetrics(newMetrics);
    },
    []
  );

  return {
    layout,
    metrics,
    loading,
    error,
    reload: loadZoneState,
    updateState,
  };
}

export function useProducts(
  apiService: ApiService,
  zoneId: string | null,
  filters: { q: string; cat: string; sort: string }
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!zoneId) return;

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getProducts({
          zone_id: zoneId,
          q: filters.q,
          cat: filters.cat,
          sort: filters.sort,
        });
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => clearTimeout(timeoutId);
  }, [apiService, zoneId, filters.q, filters.cat, filters.sort]);

  return { products, loading, error };
}
