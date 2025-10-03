// Shelf grid component

import React, { DragEvent } from "react";
import { Zone, Product } from "@/app/types/retail";

interface ShelfGridProps {
  zone: Zone | null;
  layout: string[];
  products: Product[];
  onDragOver: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent, index: number) => void;
  onDragStartFromSlot: (e: DragEvent, pid: string, index: number) => void;
}

export function ShelfGrid({
  zone,
  layout,
  products,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragStartFromSlot,
}: ShelfGridProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="font-bold text-slate-200 text-lg flex items-center gap-2">
          <span className="text-2xl">🏪</span>
          Zone Shelf
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-transparent" />
        {zone && <div className="chip">Capacity: {zone.capacity}</div>}
      </div>
      <div className="shelf-grid" id="shelf-grid">
        {zone && layout && layout.length ? (
          layout.map((pid, idx) => {
            const product = products.find((x) => x.id === pid) || null;
            return (
              <ShelfSlot
                key={idx}
                index={idx}
                productId={pid}
                product={product}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragStartFromSlot={onDragStartFromSlot}
              />
            );
          })
        ) : (
          <div className="text-slate-400 text-sm text-center py-12 flex flex-col items-center gap-3">
            <div className="text-4xl opacity-50">📦</div>
            <div className="font-medium">No layout configured</div>
            <div className="text-xs text-slate-500">
              Click &quot;AI Predict&quot; or drag items from inventory below
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ShelfSlotProps {
  index: number;
  productId: string | null;
  product: Product | null;
  onDragOver: (e: DragEvent) => void;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent, index: number) => void;
  onDragStartFromSlot: (e: DragEvent, pid: string, index: number) => void;
}

function ShelfSlot({
  index,
  productId,
  product,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragStartFromSlot,
}: ShelfSlotProps) {
  return (
    <div
      className="slot"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
    >
      {productId ? (
        <div
          className="sku"
          draggable
          onDragStart={(e) => onDragStartFromSlot(e, productId, index)}
          title="Drag to reorder / swap"
        >
          <div className="box relative">
            <div className="absolute inset-0 flex items-center justify-center text-lg opacity-60">
              📦
            </div>
          </div>
          <b className="text-xs text-center px-1" style={{ lineHeight: 1.1 }}>
            {product?.name || productId}
          </b>
          <div className="meta">
            {product?.cat || ""} {product ? `· $${product.price}` : ""}
          </div>
        </div>
      ) : (
        <div className="text-slate-500 text-xs flex items-center gap-1 opacity-50">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Drop
        </div>
      )}
    </div>
  );
}
