// Inventory panel component

import React, { DragEvent, useMemo } from "react";
import { Product } from "@/app/types/retail";

interface InventoryPanelProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onDragStartFromInventory: (e: DragEvent, pid: string) => void;
}

export function InventoryPanel({
  products,
  searchQuery,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onDragStartFromInventory,
}: InventoryPanelProps) {
  const categories = useMemo(() => {
    const categorySet = new Set(products.map((p) => p.cat));
    return ["", ...Array.from(categorySet)];
  }, [products]);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="font-bold text-slate-200 text-lg flex items-center gap-2">
          <span className="text-2xl">📦</span>
          Product Inventory
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-transparent" />
        <div className="chip">{products.length} items</div>
      </div>
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="relative flex-1 min-w-[240px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-slate-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c || "All categories"}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer"
        >
          <option value="score">AI Suggested</option>
          <option value="price_desc">Price ↓</option>
          <option value="price_asc">Price ↑</option>
          <option value="margin_desc">Margin ↓</option>
          <option value="velocity_desc">Velocity ↓</option>
        </select>
      </div>
      <div className="inventory">
        {products.map((p) => (
          <InventoryCard
            key={p.id}
            product={p}
            onDragStart={onDragStartFromInventory}
          />
        ))}
      </div>
    </div>
  );
}

interface InventoryCardProps {
  product: Product;
  onDragStart: (e: DragEvent, pid: string) => void;
}

function InventoryCard({ product, onDragStart }: InventoryCardProps) {
  return (
    <div className="inv-card group">
      <div className="thumb relative overflow-hidden self-start">
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          📦
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 size-full">
        {/* Product Name */}
        <div className="font-bold text-sm text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-2">
          {product.name}
        </div>

        {/* Category Badge */}
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 text-xs">
            {product.cat}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Price:</span>
            <span className="font-semibold text-cyan-400">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Margin:</span>
            <span className="text-emerald-400">
              {(product.margin * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Velocity:</span>
            <span className="text-blue-400">
              {(product.velocity * 100).toFixed(0)}
            </span>
          </div>
        </div>

        {/* AI Score */}
        {typeof product.score === "number" && (
          <div className="mt-auto pt-2 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">AI Score:</span>
              <span className="font-bold text-purple-400">
                {product.score.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Drag Handle */}
      <div
        className="sku cursor-grab active:cursor-grabbing"
        draggable
        onDragStart={(e) => onDragStart(e, product.id)}
        title="Drag to shelf"
      >
        <div className="box relative">
          <svg
            className="absolute inset-0 w-full h-full p-2 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"
            />
          </svg>
        </div>
        <div className="text-slate-400 mt-1 text-center">Drag</div>
      </div>
    </div>
  );
}
