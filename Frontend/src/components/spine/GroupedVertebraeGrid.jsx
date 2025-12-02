import React from "react";
import VertebraeGrid from "./VertebraeGrid";

/**
 * Групповая сетка позвонков по отделам
 * Props:
 * - groups: { [sectionName: string]: string[] } — например { "Шейный отдел": ["C1","C2",...] }
 * - selected: string[]
 * - onToggle: (vertebra: string) => void
 * - max?: number
 * - disabled?: boolean
 * - cols?: number
 */
export default function GroupedVertebraeGrid({
  groups,
  selected,
  onToggle,
  max = 0,
  disabled = false,
  cols = 8,
}) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-[520px] pr-2">
      {Object.entries(groups).map(([section, verts]) => (
        <div key={section}>
          <h3 className="text-yellow-400 mb-2">{section}</h3>
          <VertebraeGrid
            vertebrae={verts}
            selected={selected}
            onToggle={onToggle}
            max={max}
            disabled={disabled}
            cols={cols}
          />
        </div>
      ))}
    </div>
  );
}