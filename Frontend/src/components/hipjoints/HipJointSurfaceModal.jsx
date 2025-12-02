// Frontend/src/components/hipjoints/HipJointSurfaceModal.jsx
import React from "react";
import HipModalBase, { useHipModalState, HIP_ZONES, SURFACE_OPTIONS, ExpandablePanel } from "./HipModalBase.jsx";

export default function HipJointSurfaceModal({ 
  isOpen, 
  onClose, 
  insertTextToTextarea,
  hasEndoprosthesis = false
}) {
  const { selectedOptions, setSelectedOptions, expandedZone, handleZoneClick, closeExpandedZone } = 
    useHipModalState({
      left: [],
      right: [],
    });

  const toggleZoneOption = (zoneKey, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[zoneKey];
      if (currentOptions.includes(option)) {
        return { ...prev, [zoneKey]: currentOptions.filter(opt => opt !== option) };
      } else {
        return { ...prev, [zoneKey]: [option] };
      }
    });
    closeExpandedZone();
  };

  const generateDescription = () => {
    const leftOption = selectedOptions.left[0];
    const rightOption = selectedOptions.right[0];

    if (!leftOption && !rightOption) {
      return hasEndoprosthesis
        ? "Суставные поверхности без патологических изменений."
        : "Суставные поверхности тазобедренных суставов без патологических изменений.";
    }

    let description = "";

    if (leftOption && rightOption && leftOption === rightOption) {
      if (hasEndoprosthesis) {
        description = `Суставные поверхности ${leftOption} преимущественно в области крыш вертлужных впадин.`;
      } else {
        description = `Суставные поверхности тазобедренных суставов ${leftOption} преимущественно в области крыш вертлужных впадин.`;
      }
    } else {
      if (rightOption && leftOption) {
        if (hasEndoprosthesis) {
          description = `Суставные поверхности правого тазобедренного сустава ${rightOption} преимущественно в области крыши вертлужной впадины, левого ${leftOption} преимущественно в области крыши вертлужной впадины.`;
        } else {
          description = `Суставные поверхности правого тазобедренного сустава ${rightOption} преимущественно в области крыши вертлужной впадины, левого ${leftOption} преимущественно в области крыши вертлужной впадины.`;
        }
      } else if (rightOption) {
        description = hasEndoprosthesis
          ? `Суставные поверхности ${rightOption} преимущественно в области крыши вертлужной впадины.`
          : `Суставные поверхности правого тазобедренного сустава ${rightOption} преимущественно в области крыши вертлужной впадины.`;
      } else if (leftOption) {
        description = hasEndoprosthesis
          ? `Суставные поверхности ${leftOption} преимущественно в области крыши вертлужной впадины.`
          : `Суставные поверхности левого тазобедренного сустава ${leftOption} преимущественно в области крыши вертлужной впадины.`;
      }
    }

    return description;
  };

  const isOptionSelected = (zoneKey, option) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].includes(option);
  };
  
  const hasAnySelection = (zoneKey) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].length > 0;
  };

  const surfaceZones = HIP_ZONES.map(zone => ({
    ...zone,
    position: { top: "55%", left: zone.position.left === "30%" ? "30%" : "60%" },
    name: zone.key === "right" ? "Правый" : "Левый"
  }));

  return (
    <HipModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Изменения суставных поверхностей тазобедренных суставов"
    >
      {surfaceZones.map((zone) => (
        <div
          key={zone.key}
          className={`absolute w-[150px] h-[120px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
            hasAnySelection(zone.key) ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"
          }`}
          style={zone.position}
          onClick={() => handleZoneClick(zone.key)}
        >
          <span className="text-white text-xs font-medium text-center">
            {zone.name} тазобедренный сустав
          </span>
        </div>
      ))}

      {expandedZone && (
        <ExpandablePanel 
          zone={surfaceZones.find(z => z.key === expandedZone)} 
          expanded={true}
          onClose={closeExpandedZone}
        >
          {SURFACE_OPTIONS.map((option) => (
            <div
              key={`${expandedZone}-${option}`}
              className={`p-2 border text-xs text-white mb-1 ${
                isOptionSelected(expandedZone, option) ? "bg-yellow-500 border-yellow-400" : "border-yellow-500 bg-gray-600"
              } rounded cursor-pointer transition-all duration-200`}
              onClick={() => toggleZoneOption(expandedZone, option)}
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