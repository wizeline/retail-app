"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ApiService } from "./services/api";
import { useZones, useZoneState, useProducts } from "./hooks/useRetailData";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useToast } from "./hooks/useToast";
import { Header } from "./components/retail/Header";
import { ZoneControls } from "./components/retail/ZoneControls";
import { MetricsPanel } from "./components/retail/MetricsPanel";
import { ShelfGrid } from "./components/retail/ShelfGrid";
import { InventoryPanel } from "./components/retail/InventoryPanel";
import { ToastMessage } from "./components/retail/ToastMessage";
import { runRuntimeTests } from "./utils/runtime-tests";
import "./retail.styles.css";

export default function RetailFrontPreview() {
  // ---------------- API Service ----------------
  const [apiService] = useState(() => new ApiService("http://127.0.0.1:8000"));
  const [baseUrl, setBaseUrl] = useState("http://127.0.0.1:8000");

  // ---------------- State ----------------
  const [zoneId, setZoneId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [testsStatus, setTestsStatus] = useState("");

  // ---------------- Custom Hooks ----------------
  const { zones, reload: reloadZones } = useZones(apiService);
  const {
    layout,
    metrics,
    loading,
    updateState,
    reload: reloadZoneState,
  } = useZoneState(apiService, zoneId);
  const { products } = useProducts(apiService, zoneId, {
    q: searchQuery,
    cat: selectedCategory,
    sort: sortBy,
  });
  const dragAndDrop = useDragAndDrop();
  const { message, type, showToast } = useToast();

  // ---------------- Effects ----------------
  useEffect(() => {
    if (!zoneId && zones.length > 0) {
      setZoneId(zones[0].id);
    }
  }, [zones, zoneId]);

  useEffect(() => {
    const result = runRuntimeTests();
    setTestsStatus(result.message);
  }, []);

  // Update API service base URL
  const handleBaseUrlChange = (url: string) => {
    setBaseUrl(url);
    apiService.setBaseUrl(url);
  };

  const handleReload = () => {
    reloadZones();
    if (zoneId) {
      reloadZoneState();
    }
  };

  // ---------------- Zone Actions ----------------
  const handlePredict = async () => {
    if (!zoneId) return;
    try {
      const res = await apiService.predictBestPlacement(zoneId);
      updateState(res.layout, res.metrics);
      showToast("Predicted best placement.");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to predict",
        "error"
      );
    }
  };

  const handleClear = async () => {
    if (!zoneId) return;
    try {
      const res = await apiService.clearZone(zoneId);
      updateState(res.layout, res.metrics);
      showToast("Zone cleared.");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to clear zone",
        "error"
      );
    }
  };

  // ---------------- Drag & Drop Handlers ----------------
  const handleDropToSlot = async (e: React.DragEvent, toIdx: number) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.remove("drag-over");

    const dragData = dragAndDrop.parseDragData(e);
    if (!dragData) return;

    try {
      const body = dragAndDrop.createMoveRequestBody(dragData, toIdx);
      const res = await apiService.moveProduct(zoneId, body);
      updateState(res.layout, res.metrics);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to move product",
        "error"
      );
    }
  };

  // ---------------- Derived Data ----------------
  const selectedZone = useMemo(
    () => zones.find((z) => z.id === zoneId) || null,
    [zones, zoneId]
  );

  // ---------------- Render ----------------
  return (
    <div
      className="min-h-screen text-slate-100 relative"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Tailwind-inspired gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 92 246 / 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto p-6 space-y-6 relative z-10">
        <Header
          baseUrl={baseUrl}
          onBaseUrlChange={handleBaseUrlChange}
          onReload={handleReload}
        />

        {/* FIRST ROW: Zone Controls and KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ZoneControls
            zones={zones}
            selectedZoneId={zoneId}
            onZoneChange={setZoneId}
            onPredict={handlePredict}
            onClear={handleClear}
            loading={loading}
          />

          <MetricsPanel metrics={metrics} testsStatus={testsStatus} />
        </div>

        {/* SECOND ROW: Zone Shelf and Product Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Zone Shelf Grid */}
          <ShelfGrid
            zone={selectedZone}
            layout={layout}
            products={products}
            onDragOver={dragAndDrop.allowDrop}
            onDragEnter={dragAndDrop.onDragEnter}
            onDragLeave={dragAndDrop.onDragLeave}
            onDrop={handleDropToSlot}
            onDragStartFromSlot={dragAndDrop.onDragStartFromSlot}
          />

          {/* Product Inventory */}
          <InventoryPanel
            products={products}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
            onDragStartFromInventory={dragAndDrop.onDragStartFromInventory}
          />
        </div>

        <ToastMessage message={message} type={type} />

        <footer className="text-center py-8 mt-8">
          <div className="text-sm text-slate-400 font-medium">
            Drag products into slots · Swap by dragging placed products ·
            API-powered predictions
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Built with React, TypeScript, and Tailwind-inspired design
          </div>
        </footer>
      </div>
    </div>
  );
}
