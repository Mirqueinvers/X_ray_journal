// JointSpaceModal.jsx
// Суставные щели
import React, { useState } from "react";
import { generateDescriptionKneeGapSurface } from "../generateDescription/Knees/generateDescriptionKneeGapSurface";

export default function JointSpaceSection({ isOpen, onClose, textareaRef }) {
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

  // Логика выбора
  const toggleZoneOption = (zoneKey, option) => {
    setSelectedOptions((prev) => {
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
            ? currentOptions.filter((opt) => opt !== option)
            : [...currentOptions, option],
        };
      }
    });
    setExpandedZone(null);
  };

  // Вставка в textarea
  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  if (!isOpen) return null;

  const isOptionSelected = (zoneKey, option) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].includes(option);
  };
  
  const hasAnySelection = (zoneKey) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].length > 0;
  }

  // Обработчик клика на зону
  const handleZoneClick = (zoneKey) => {
    if (expandedZone === zoneKey) {
      setExpandedZone(null);
    } else {
      setExpandedZone(zoneKey);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
         onClick={onClose}>
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
          {zones.map((zone) => (
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
            </div>
          ))}

          {/* Меню выбора степени сужения */}
          {expandedZone && (
            <div
              className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20"
              style={{
                top: zones.find(z => z.key === expandedZone).position.top,
                left: zones.find(z => z.key === expandedZone).position.left,
              }}
            >
              {degreeOptions.map((option) => (
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
            </div>
          )}

        </div>

        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={() => {
              insertTextToTextarea(
                generateDescriptionKneeGapSurface({
                  mode: "gaps",
                  selectedOptions,
                  selectedPositions
                })
              );
              onClose();
            }}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}