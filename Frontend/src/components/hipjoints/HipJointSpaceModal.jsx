// Frontend/src/components/hipjoints/HipJointSpaceModal.jsx
import React, { useState } from "react";
import  HipModalBase, { useHipModalState, HIP_ZONES, DEGREE_OPTIONS, UNIFORMITY_OPTIONS, ExpandablePanel } from "./HipModalBase.jsx";

export default function HipJointSpaceModal({ 
  isOpen, 
  onClose, 
  insertTextToTextarea,
  hasEndoprosthesis = false
}) {
  const { selectedOptions, setSelectedOptions, expandedZone, handleZoneClick, closeExpandedZone } = 
    useHipModalState({
      left: { degree: "", uniformity: "" },
      right: { degree: "", uniformity: "" },
    });

  const handleOptionSelect = (zoneKey, field, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [zoneKey]: { ...prev[zoneKey], [field]: value },
    }));
  };

  const isSelected = (zoneKey, field, value) =>
    selectedOptions[zoneKey][field] === value;

  const generateDescription = () => {
    const sides = {
      right: { name: "правого", short: "правого" },
      left: { name: "левого", short: "левого" },
    };

    const desc = {};

    Object.keys(sides).forEach((side) => {
      const { degree, uniformity } = selectedOptions[side];
      if (!degree && !uniformity) return;
      const textParts = [];
      if (degree) textParts.push(degree);
      if (uniformity) textParts.push(uniformity);
      desc[side] = textParts.join(", ");
    });

    if (!desc.right && !desc.left) {
      return hasEndoprosthesis 
        ? "Суставная щель равномерной высоты."
        : "Суставные щели тазобедренных суставов равномерной высоты.";
    }

    if (desc.right && desc.left && desc.right === desc.left) {
      if (hasEndoprosthesis) {
        return `Суставная щель ${desc.right} сужена.`;
      } else {
        return `Суставные щели тазобедренных суставов ${desc.right} сужены.`;
      }
    }

    if (desc.right && desc.left) {
      if (hasEndoprosthesis) {
        return `Суставная щель правого тазобедренного сустава ${desc.right} сужена; левого — ${desc.left} сужена.`;
      } else {
        return `Суставная щель правого тазобедренного сустава ${desc.right} сужена; левого — ${desc.left} сужена.`;
      }
    }

    if (desc.right) {
      return hasEndoprosthesis
        ? `Суставная щель ${desc.right} сужена.`
        : `Суставная щель правого тазобедренного сустава ${desc.right} сужена.`;
    }
    if (desc.left) {
      return hasEndoprosthesis
        ? `Суставная щель ${desc.left} сужена.`
        : `Суставная щель левого тазобедренного сустава ${desc.left} сужена.`;
    }

    return "";
  };

  const hasSelection = (zoneKey) =>
    selectedOptions[zoneKey].degree || selectedOptions[zoneKey].uniformity;

  return (
    <HipModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Сужение суставных щелей тазобедренных суставов"
    >
      {HIP_ZONES.map((zone) => (
        <div
          key={zone.key}
          className={`absolute w-[120px] h-[180px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
            hasSelection(zone.key)
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={zone.position}
          onClick={() => handleZoneClick(zone.key)}
        >
          <span className="text-white text-xs font-medium text-center">
            {zone.name}
          </span>
        </div>
      ))}

      {expandedZone && (
        <ExpandablePanel 
          zone={HIP_ZONES.find(z => z.key === expandedZone)} 
          expanded={true}
          onClose={closeExpandedZone}
        >
          <p className="text-yellow-300 text-xs mb-1 text-center">
            Степень сужения
          </p>
          {DEGREE_OPTIONS.map((option) => (
            <div
              key={`${expandedZone}-degree-${option}`}
              className={`p-1 border text-xs text-white mb-1 ${
                isSelected(expandedZone, "degree", option)
                  ? "bg-yellow-500 border-yellow-400"
                  : "border-yellow-500 bg-gray-600"
              } rounded cursor-pointer text-center`}
              onClick={() => handleOptionSelect(expandedZone, "degree", option)}
            >
              {option}
            </div>
          ))}

          <p className="text-yellow-300 text-xs mb-1 mt-2 text-center">
            Характер сужения
          </p>
          {UNIFORMITY_OPTIONS.map((option) => (
            <div
              key={`${expandedZone}-uniformity-${option}`}
              className={`p-1 border text-xs text-white mb-1 ${
                isSelected(expandedZone, "uniformity", option)
                  ? "bg-yellow-500 border-yellow-400"
                  : "border-yellow-500 bg-gray-600"
              } rounded cursor-pointer text-center`}
              onClick={() => handleOptionSelect(expandedZone, "uniformity", option)}
            >
              {option}
            </div>
          ))}
        </ExpandablePanel>
      )}

      <div className="absolute bottom-4 left-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
          onClick={() => {
            insertTextToTextarea("\n" + generateDescription());
            onClose();
          }}
        >
          Добавить
        </button>
      </div>
    </HipModalBase>
  );
}