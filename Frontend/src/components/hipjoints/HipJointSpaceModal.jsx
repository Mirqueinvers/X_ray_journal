// Frontend/src/components/hipjoints/HipJointSpaceModal.jsx
// Суставные щели тазобедренных суставов
import React, { useState } from "react";

// Словарь правильных форм
const narrowingMap = {
  "незначительно сужены": "незначительно сужены",
  "умеренно сужены": "умеренно сужены",
  "выраженно сужены": "выраженно сужены",
  "резко сужены": "резко сужены",
};

const narrowingMapSingle = {
  "незначительно сужены": "незначительно сужена",
  "умеренно сужены": "умеренно сужена",
  "выраженно сужены": "выраженно сужена",
  "резко сужены": "резко сужена",
};

const narrowingMapPlural = {
  "незначительно сужена": "незначительно сужены",
  "умеренно сужена": "умеренно сужены",
  "выраженно сужена": "выраженно сужены",
  "резко сужена": "резко сужены",
};

export default function HipJointSpaceModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    leftMedial: [],
    leftSuperior: [],
    rightMedial: [],
    rightSuperior: [],
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = [
    "равномерной высоты",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Зоны для тазобедренного сустава
  const zones = [
    { key: "rightSuperior", name: "Правая верхняя", position: { top: "150px", left: "30%" } },
    { key: "rightMedial", name: "Правая медиальная", position: { top: "200px", left: "40%" } },
    { key: "leftMedial", name: "Левая медиальная", position: { top: "200px", left: "60%" } },
    { key: "leftSuperior", name: "Левая верхняя", position: { top: "150px", left: "70%" } },
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
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  // Генерация описания
  const generateDescription = () => {
    const zones = [
      { key: "leftSuperior", side: "левого", part: "верхней" },
      { key: "leftMedial", side: "левого", part: "медиальной" },
      { key: "rightSuperior", side: "правого", part: "верхней" },
      { key: "rightMedial", side: "правого", part: "медиальной" },
    ];

    const perHip = { left: {}, right: {} };

    zones.forEach(({ key, side, part }) => {
      const degree = selectedOptions[key]?.[0];
      if (!degree) return;
      const hipKey = side === "левого" ? "left" : "right";
      perHip[hipKey][part] = degree;
    });

    const descriptions = [];
    const usedParts = new Set();

    // 1. Проверяем одинаковые степени на обоих суставах по отделам
    ["верхней", "медиальной"].forEach((part) => {
      const leftDegree = perHip.left[part];
      const rightDegree = perHip.right[part];

      if (leftDegree && rightDegree && leftDegree === rightDegree) {
        const partText = part === "медиальной" ? "медиальных" : "верхних";
        descriptions.push(
          `Суставные щели тазобедренных суставов ${narrowingMapPlural[narrowingMapSingle[leftDegree]]} в ${partText} отделах.`
        );
        usedParts.add(part);
      }
    });

    // 2. Обработка разных степеней на одном отделе (правое и левое)
    ["верхней", "медиальной"].forEach((part) => {
    if (usedParts.has(part)) return;
    const leftDegree = perHip.left[part];
    const rightDegree = perHip.right[part];
    if (leftDegree && rightDegree && leftDegree !== rightDegree) {
        const partText = part === "медиальной" ? "медиальном" : "верхнем";
        descriptions.push(
        `Суставная щель правого тазобедренного сустава ${narrowingMapSingle[rightDegree]} в ${partText} отделе, левого тазобедренного сустава ${narrowingMapSingle[leftDegree]} в ${partText} отделе`
        );
        usedParts.add(part);
    }
    });


    // 3. Добавляем индивидуальные описания для каждого сустава
    ["left", "right"].forEach((hip) => {
      const hipParts = perHip[hip];
      const sideName = hip === "left" ? "левого" : "правого";

      // Проверяем, остались ли неиспользованные отделы
      const remainingParts = Object.keys(hipParts).filter(part => !usedParts.has(part));
      if (remainingParts.length === 0) return;

      const partsDesc = remainingParts.map(part => {
        return `${narrowingMapSingle[hipParts[part]]} в ${part === "медиальной" ? "медиальном" : "верхнем"} отделе`;
      });

      if (partsDesc.length > 0) {
        descriptions.push(`Суставная щель ${sideName} тазобедренного сустава ${partsDesc.join(", ")}`);
      }
    });

    if (descriptions.length === 0) return "Суставные щели тазобедренных суставов равномерной высоты";

    return descriptions.join(", ") + ".";
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
          backgroundImage: `url(/images/hip-front.jpg)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[100px] h-[150px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${hasAnySelection(zone.key) ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"}`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name}</span>
            </div>
          ))}

          {expandedZone && (
            <div className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20" style={{
              top: zones.find(z => z.key === expandedZone).position.top,
              left: zones.find(z => z.key === expandedZone).position.left,
            }}>
              {degreeOptions.map((option) => (
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
            insertTextToTextarea(generateDescription());
            onClose();
          }}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}