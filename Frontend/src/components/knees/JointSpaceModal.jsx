// Frontend/src/components/knees/JointSpaceModal.jsx
// Суставные щели
import React, { useState } from "react";
import { generateDescriptionKneeGapSurface } from "../generateDescription/Knees/generateDescriptionKneeGapSurface";

export default function JointSpaceSection({
  isOpen,
  onClose,
  insertTextToTextarea,
  hasEndoprosthesis = false
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    leftMedial: [],
    leftLateral: [],
    rightMedial: [],
    rightLateral: [],
  });

  const [selectedPositions, setSelectedPositions] = useState({
    left: "",
    right: ""
  });

  const [expandedZone, setExpandedZone] = useState(null);

  // НОВОЕ: состояние "преимущественно" для каждой зоны отдельно
  const [predominantlyByZone, setPredominantlyByZone] = useState({
    leftMedial: false,
    leftLateral: false,
    rightMedial: false,
    rightLateral: false,
  });

  const degreeOptions = [
    "равномерной высоты",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Зоны
  const zones = [
    { key: "rightLateral", name: "Правый латеральный", position: { top: "28%", left: "22%" } },
    { key: "rightMedial", name: "Правый медиальный", position: { top: "28%", left: "36%" } },
    { key: "leftMedial", name: "Левый медиальный", position: { top: "28%", left: "56.5%" } },
    { key: "leftLateral", name: "Левый латеральный", position: { top: "28%", left: "70.5%" } },
  ];

  // Логика выбора степеней
  const toggleZoneOption = (zoneKey, option) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[zoneKey];
      if (option === "равномерной высоты") {
        return {
          ...prev,
          [zoneKey]: currentOptions.includes(option) ? [] : [option],
        };
      } else {
        if (currentOptions.includes("равномерной высоты")) {
          return { ...prev, [zoneKey]: [option] };
        }
        return {
          ...prev,
          [zoneKey]: currentOptions.includes(option)
            ? currentOptions.filter(opt => opt !== option)
            : [...currentOptions, option],
        };
      }
    });
    setExpandedZone(null);
  };

  // НОВОЕ: переключение "преимущественно" для конкретной зоны
  const togglePredominantlyForZone = (zoneKey) => {
    setPredominantlyByZone(prev => ({
      ...prev,
      [zoneKey]: !prev[zoneKey]
    }));
  };

  if (!isOpen) return null;

  const isOptionSelected = (zoneKey, option) =>
    selectedOptions[zoneKey] && selectedOptions[zoneKey].includes(option);

  const hasAnySelection = zoneKey =>
    selectedOptions[zoneKey] && selectedOptions[zoneKey].length > 0;

  const handleZoneClick = zoneKey => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
          {zones.map(zone => (
            <div
              key={zone.key}
              className={`absolute w-[100px] h-[150px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                hasAnySelection(zone.key)
                  ? "bg-yellow-200/30 border-yellow-400"
                  : "border-yellow-500 bg-transparent"
              }`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name}</span>
              {/* НОВОЕ: индикатор "преимущественно" для зоны */}
              {predominantlyByZone[zone.key] && (
                <span className="text-yellow-300 text-[10px] mt-1">преим.</span>
              )}
            </div>
          ))}

          {/* Раскрывающееся меню зоны */}
          {expandedZone && (
            <div
              className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20"
              style={{
                top: zones.find(z => z.key === expandedZone).position.top,
                left: zones.find(z => z.key === expandedZone).position.left,
              }}
            >
              {/* Список степеней */}
              {degreeOptions.map(option => (
                <div
                  key={`${expandedZone}-${option}`}
                  className={`p-2 border text-xs text-white mb-1 ${
                    isOptionSelected(expandedZone, option)
                      ? "bg-yellow-500 border-yellow-400"
                      : "border-yellow-500 bg-gray-600"
                  } rounded cursor-pointer transition-all duration-200`}
                  onClick={() => toggleZoneOption(expandedZone, option)}
                >
                  {option}
                </div>
              ))}

              {/* ВТОРОЙ РЯД: Плашка «Преимущественно» для конкретной зоны */}
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
        </div>

        {/* Кнопка «Добавить» + индикатор состояния */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={() => {
              insertTextToTextarea(
                "\n" + generateDescriptionKneeGapSurface({
                  mode: "gaps",
                  selectedOptions,
                  selectedPositions,
                  hasEndoprosthesis,
                  predominantlyByZone
                })
              );
              onClose();
            }}
          >
            Добавить
          </button>

          <span className="text-xs text-gray-400">
            Настройте каждую зону отдельно
          </span>
        </div>
      </div>
    </div>
  );
}