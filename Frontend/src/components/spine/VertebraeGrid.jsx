import React from "react";

/**
 * Сетка позвонков
 * Props:
 * - vertebrae: string[] — список позвонков ["C1","C2",...]
 * - selected: string[] — выбранные
 * - onToggle: (vertebra: string) => void — переключение
 * - max?: number — максимум выбранных (0 или undefined = без лимита)
 * - disabled?: boolean — глобально отключена
 * - className?: string — дополнительные классы для кнопки
 * - cols?: number — кол-во колонок (по умолчанию 8)
 */
export default function VertebraeGrid({
  vertebrae,
  selected,
  onToggle,
  max = 0,
  disabled = false,
  className = "",
  cols = 8,
}) {
  const isSelected = (v) => selected.includes(v);
  const isLimitReached = max > 0 && selected.length >= max;

  return (
    <div
      className="grid gap-2 overflow-y-auto pr-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {vertebrae.map((v) => {
        const selectedHere = isSelected(v);
        const clickAllowed = !disabled && (!isLimitReached || selectedHere);
        return (
          <button
            key={v}
            onClick={() => clickAllowed && onToggle(v)}
            disabled={!clickAllowed}
            className={[
              "px-3 py-2 border rounded text-sm",
              selectedHere
                ? "bg-yellow-500 text-black border-yellow-400"
                : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600",
              !clickAllowed ? "opacity-50 cursor-not-allowed" : "",
              className,
            ].join(" ")}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}