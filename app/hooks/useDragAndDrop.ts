// Custom hook for drag and drop functionality

import { DragEvent } from "react";
import { DragData, MoveRequestBody } from "../types/retail";

export function useDragAndDrop() {
  const onDragStartFromInventory = (e: DragEvent, pid: string) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ origin: "inventory", pid } as DragData)
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragStartFromSlot = (e: DragEvent, pid: string, fromIdx: number) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ origin: "slot", pid, from_slot: fromIdx } as DragData)
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const allowDrop = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDragEnter = (e: DragEvent) => {
    (e.currentTarget as HTMLElement).classList.add("drag-over");
  };

  const onDragLeave = (e: DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("drag-over");
  };

  const parseDragData = (e: DragEvent): DragData | null => {
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      if (!data || !data.pid) return null;
      return data;
    } catch {
      return null;
    }
  };

  const createMoveRequestBody = (
    dragData: DragData,
    toSlot: number
  ): MoveRequestBody => {
    if (dragData.origin === "slot") {
      return {
        origin: "slot",
        pid: dragData.pid,
        to_slot: toSlot,
        from_slot: dragData.from_slot!,
      };
    }
    return {
      origin: "inventory",
      pid: dragData.pid,
      to_slot: toSlot,
    };
  };

  return {
    onDragStartFromInventory,
    onDragStartFromSlot,
    allowDrop,
    onDragEnter,
    onDragLeave,
    parseDragData,
    createMoveRequestBody,
  };
}
