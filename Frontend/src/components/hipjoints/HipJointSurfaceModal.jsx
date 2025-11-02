// Frontend/src/components/hipjoints/HipJointSurfaceModal.jsx
// Суставные поверхности тазобедренных суставов
import React, { useState } from "react";

export default function HipJointSurfaceModal({ isOpen, onClose, insertTextToTextarea }) {
  const [selectedOptions, setSelectedOptions] = useState({
    left: [],
    right: [],
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const surfaceOptions = [
    "не изменены",
    "незначительно склерозированы",
    "умеренно склерозированы",
    "выраженно склерозированы",
  ];

  // Зоны для суставных поверхностей
  const zones = [
    { key: "right", name: "Правый", position: { top: "55%", left: "30%" } },
    { key: "left", name: "Левый", position: { top: "55%", left: "60%" } },
  ];

  // Логика выбора
  const toggleZoneOption = (zoneKey, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[zoneKey];
      if (currentOptions.includes(option)) {
        return { ...prev, [zoneKey]: currentOptions.filter(opt => opt !== option) };
      } else {
        return { ...prev, [zoneKey]: [option] };
      }
    });
    setExpandedZone(null);
  };

  // Генерация описания
const generateDescription = () => {
  const leftOption = selectedOptions.left[0];
  const rightOption = selectedOptions.right[0];

  if (!leftOption && !rightOption) {
    return "Суставные поверхности тазобедренных суставов без патологических изменений.";
  }

  let description = "";

  if (leftOption && rightOption && leftOption === rightOption) {
    description = `Суставные поверхности тазобедренных суставов ${leftOption} преимущественно в области крыш вертлужных впадин.`;
  } else {
    if (rightOption && leftOption) {
      description = `Суставная поверхность правого тазобедренного сустава ${rightOption} преимущественно в области крыши вертлужной впадины, левого тазобедренного сустава ${leftOption} преимущественно в области крыши вертлужной впадины.`;
    } else if (rightOption) {
      description = `Суставная поверхность правого тазобедренного сустава ${rightOption} преимущественно в области крыши вертлужной впадины.`;
    } else if (leftOption) {
      description = `Суставная поверхность левого тазобедренного сустава ${leftOption} преимущественно в области крыши вертлужной впадины.`;
    }
  }

  return description;
};

  if (!isOpen) return null;

  const isOptionSelected = (zoneKey, option) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].includes(option);
  };
  
  const hasAnySelection = (zoneKey) => {
    return selectedOptions[zoneKey] && selectedOptions[zoneKey].length > 0;
  }

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/hip.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[150px] h-[120px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${hasAnySelection(zone.key) ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"}`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name} тазобедренный сустав</span>
            </div>
          ))}

          {expandedZone && (
            <div className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20" style={{
              top: zones.find(z => z.key === expandedZone).position.top,
              left: zones.find(z => z.key === expandedZone).position.left,
            }}>
              {surfaceOptions.map((option) => (
                <div
                  key={`${expandedZone}-${option}`}
                  className={`p-2 border text-xs text-white mb-1 ${isOptionSelected(expandedZone, option) ? "bg-yellow-500 border-yellow-400" : "border-yellow-500 bg-gray-600"} rounded cursor-pointer transition-all duration-200`}
                  onClick={() => toggleZoneOption(expandedZone, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4">
          <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50" onClick={() => {
            insertTextToTextarea("\n" + generateDescription());
            onClose();
          }}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}