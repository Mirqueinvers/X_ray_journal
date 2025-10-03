// Суставные щели
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


export default function JointSpaceSection({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    leftMedial: [],
    leftLateral: [],
    rightMedial: [],
    rightLateral: [],
  });

  const [expandedZone, setExpandedZone] = useState(null); // Новое состояние для отслеживания открытой зоны

  const degreeOptions = [
    "равномерной высоты",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Зоны
    const zones = [
      { key: "rightLateral", name: "Правый латеральный", position: { top: "200px", left: "30%" } },
      { key: "rightMedial", name: "Правый медиальный", position: { top: "200px", left: "40%" } },
      
      { key: "leftMedial", name: "Левый медиальный", position: { top: "200px", left: "60%" } },
      { key: "leftLateral", name: "Левый латеральный", position: { top: "200px", left: "70%" } },
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
    setExpandedZone(null); // Закрываем меню после выбора
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
    { key: "leftMedial", side: "левого", part: "медиальном" },
    { key: "leftLateral", side: "левого", part: "латеральном" },
    { key: "rightMedial", side: "правого", part: "медиальном" },
    { key: "rightLateral", side: "правого", part: "латеральном" },
  ];

  const perKnee = { left: {}, right: {} };

  zones.forEach(({ key, side, part }) => {
    const degree = selectedOptions[key]?.[0];
    if (!degree) return;
    const kneeKey = side === "левого" ? "left" : "right";
    perKnee[kneeKey][part] = degree;
  });

  const descriptions = [];
  const usedParts = new Set();

// 1. Проверяем одинаковые степени на обоих коленях по отделам
["медиальном", "латеральном"].forEach((part) => {
  const leftDegree = perKnee.left[part];
  const rightDegree = perKnee.right[part];

  if (leftDegree && rightDegree && leftDegree === rightDegree) {
    const partText = part === "медиальном" ? "медиальных" : "латеральных";
descriptions.push(
  `Суставные щели коленных суставов ${narrowingMapPlural[narrowingMapSingle[leftDegree]]} в ${partText} отделах.`
);
    usedParts.add(part); // отмечаем, что отдел уже обработан
  }
});


  // 2. Обработка разных степеней на одном отделе (правое и левое)
  ["медиальном", "латеральном"].forEach((part) => {
    if (usedParts.has(part)) return; // уже обработано
    const leftDegree = perKnee.left[part];
    const rightDegree = perKnee.right[part];
    if (leftDegree && rightDegree && leftDegree !== rightDegree) {
      descriptions.push(
        `Суставная щель правого коленного сустава ${narrowingMapSingle[rightDegree]} в ${part} отделе, левого коленного сустава ${narrowingMapSingle[leftDegree]} в ${part} отделе`
      );
      usedParts.add(part);
    }
  });

// 3. Добавляем индивидуальные описания для колен
["left", "right"].forEach((knee) => {
  const kneeParts = perKnee[knee];
  const sideName = knee === "left" ? "левого" : "правого";

  // Проверяем, остались ли неиспользованные отделы
  const remainingParts = Object.keys(kneeParts).filter(part => !usedParts.has(part));
  if (remainingParts.length === 0) return; // всё уже учтено

  const partsDesc = remainingParts.map(part => {
    return `${narrowingMapSingle[kneeParts[part]]} в ${part === "медиальном" ? "медиальном" : "латеральном"} отделе`;
  });

  if (partsDesc.length > 0) {
    descriptions.push(`Суставная щель ${sideName} коленного сустава ${partsDesc.join(", ")}`);
  }
});






  if (descriptions.length === 0) return "Суставные щели равномерной высоты";

  return descriptions.join(", ");
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
      setExpandedZone(null); // Закрываем, если кликнули на уже открытую зону
    } else {
      setExpandedZone(zoneKey); // Открываем зону
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
            backgroundImage: `url(/images/knees-front.jpg)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
              insertTextToTextarea(generateDescription());
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