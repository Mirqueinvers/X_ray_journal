// Frontend/src/components/knees/KneeModalBase.jsx
import React, { useState } from "react";
import BaseModal from "../common/BaseModal.jsx";

export const KNEE_ZONES = [
  { key: "rightLateral", name: "Правый латеральный", position: { top: "28%", left: "22%" } },
  { key: "rightMedial", name: "Правый медиальный", position: { top: "28%", left: "36%" } },
  { key: "leftMedial", name: "Левый медиальный", position: { top: "28%", left: "56.5%" } },
  { key: "leftLateral", name: "Левый латеральный", position: { top: "28%", left: "70.5%" } },
];

export function useKneeModalState() {
  const [expandedZone, setExpandedZone] = useState(null);
  const [predominantlyByZone, setPredominantlyByZone] = useState({
    leftMedial: false,
    leftLateral: false,
    rightMedial: false,
    rightLateral: false,
  });

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  const togglePredominantlyForZone = (zoneKey) => {
    setPredominantlyByZone(prev => ({
      ...prev,
      [zoneKey]: !prev[zoneKey]
    }));
  };

  const closeExpandedZone = () => {
    setExpandedZone(null);
  };

  return {
    expandedZone,
    predominantlyByZone,
    handleZoneClick,
    togglePredominantlyForZone,
    closeExpandedZone,
  };
}

export default function KneeModalBase({
  isOpen,
  onClose,
  title,
  children,
  onAdd,
  insertTextToTextarea,
  generateDescription,
  hasEndoprosthesis = false,
  selectedOptions,
  setSelectedOptions,
  options,
  isMultiSelect = true,
  customProperty = "selected"
}) {
  const {
    expandedZone,
    predominantlyByZone,
    handleZoneClick,
    togglePredominantlyForZone,
    closeExpandedZone,
  } = useKneeModalState();

  const isOptionSelected = (zoneKey, option) => {
    if (!selectedOptions[zoneKey]) return false;
    if (isMultiSelect) {
      return selectedOptions[zoneKey].includes(option);
    }
    return selectedOptions[zoneKey]?.[0] === option;
  };

  const hasAnySelection = (zoneKey) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].length > 0;
  };

  const handleAdd = () => {
    insertTextToTextarea(
      "\n" + generateDescription({
        selectedOptions,
        predominantlyByZone,
        hasEndoprosthesis
      })
    );
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="custom"
      showCloseButton={true}
      closeOnOverlayClick={true}
      className="bg-gray-800 text-white"
      contentClassName="w-[350mm] h-[148.5mm] overflow-hidden"
    >
      {/* Фон с изображениями коленей */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(/images/knee-right.png), url(/images/knee-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "10% 95%, 90% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}
      >
        {children}

        {/* Раскрывающееся меню зоны */}
        {expandedZone && (
          <div
            className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20"
            style={{
              top: KNEE_ZONES.find(z => z.key === expandedZone).position.top,
              left: KNEE_ZONES.find(z => z.key === expandedZone).position.left,
            }}
          >
            {/* Список опций */}
            {options.map(option => (
              <div
                key={`${expandedZone}-${option}`}
                className={`p-2 border text-xs text-white mb-1 ${
                  isOptionSelected(expandedZone, option)
                    ? "bg-yellow-500 border-yellow-400"
                    : "border-yellow-500 bg-gray-600"
                } rounded cursor-pointer transition-all duration-200`}
                onClick={() => {
                  if (customProperty === "toggleOption") {
                    // Логика для JointSpaceModal
                    setSelectedOptions(prev => {
                      const currentOptions = prev[expandedZone];
                      if (option === "равномерной высоты") {
                        return {
                          ...prev,
                          [expandedZone]: currentOptions.includes(option) ? [] : [option],
                        };
                      } else {
                        if (currentOptions.includes("равномерной высоты")) {
                          return { ...prev, [expandedZone]: [option] };
                        }
                        return {
                          ...prev,
                          [expandedZone]: currentOptions.includes(option)
                            ? currentOptions.filter(opt => opt !== option)
                            : [...currentOptions, option],
                        };
                      }
                    });
                  } else {
                    // Логика для JointSurfaceModal
                    setSelectedOptions(prev => {
                      const currentOption = prev[expandedZone]?.[0];
                      if (currentOption === option) {
                        return { ...prev, [expandedZone]: [] };
                      }
                      return { ...prev, [expandedZone]: [option] };
                    });
                  }
                  closeExpandedZone();
                }}
              >
                {option}
              </div>
            ))}

            {/* Плашка «Преимущественно» для конкретной зоны */}
            <div className="mt-1 pt-1 border-t border-yellow-500">
              <button
                onClick={() => togglePredominantlyForZone(expandedZone)}
                className={`w-full text-left text-xs ${
                  predominantlyByZone[expandedZone] ? "text-yellow-300" : "text-white"
                }`}
              >
                Преимущественно
              </button>
            </div>
          </div>
        )}

        {/* Кнопка «Добавить» + индикатор состояния */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={handleAdd}
          >
            Добавить
          </button>

          <span className="text-xs text-gray-400">
            Настройте каждую зону отдельно
          </span>
        </div>
      </div>
    </BaseModal>
  );
}