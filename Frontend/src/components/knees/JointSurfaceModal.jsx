import React, { useState } from "react";

// Словарь степеней склерозирования
const surfaceMap = {
  "поверхность гладкая": "поверхность гладкая",
  "незначительные изменения": "незначительно склерозированы",
  "умеренные изменения": "умеренно склерозированы",
  "выраженные изменения": "выраженно склерозированы",
  "резкие изменения": "резко склерозированы",
};

export default function JointSurfaceModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    rightMedial: [],
    rightLateral: [],
    leftMedial: [],
    leftLateral: [],
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const conditionOptions = [
    "поверхность гладкая",
    "незначительные изменения",
    "умеренные изменения",
    "выраженные изменения",
    "резкие изменения",
  ];

  const zones = [
    { key: "rightLateral", name: "Правая латеральная", position: { top: "200px", left: "30%" } },
    { key: "rightMedial", name: "Правая медиальная", position: { top: "200px", left: "40%" } },
    { key: "leftMedial", name: "Левая медиальная", position: { top: "200px", left: "60%" } },
    { key: "leftLateral", name: "Левая латеральная", position: { top: "200px", left: "70%" } },
  ];

const toggleZoneOption = (zoneKey, option) => {
  setSelectedOptions((prev) => {
    const currentOption = prev[zoneKey]?.[0];
    if (currentOption === option) {
      // Если кликнули на уже выбранный вариант — снимаем выбор
      return { ...prev, [zoneKey]: [] };
    } else {
      // Иначе выбираем новый вариант
      return { ...prev, [zoneKey]: [option] };
    }
  });
  setExpandedZone(null); // закрываем меню после выбора
};



  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

const generateDescription = () => {
  const perKnee = { left: {}, right: {} };
  zones.forEach(({ key }) => {
    const condition = selectedOptions[key]?.[0];
    if (!condition) return;
    const knee = key.startsWith("left") ? "left" : "right";
    const part = key.endsWith("Medial") ? "медиальном" : "латеральном";
    perKnee[knee][part] = condition;
  });

  const descriptions = [];

  // 1. Объединяем одинаковые состояния на обоих коленях по отделам
  ["медиальном", "латеральном"].forEach((part) => {
    const leftCondition = perKnee.left[part];
    const rightCondition = perKnee.right[part];
    if (leftCondition && rightCondition && leftCondition === rightCondition) {
      const partText = part === "медиальном" ? "медиальных" : "латеральных";
      descriptions.push(`Суставные поверхности коленных суставов ${surfaceMap[leftCondition]} в ${partText} отделах`);
      delete perKnee.left[part];
      delete perKnee.right[part];
    }
  });

  // 2. Добавляем индивидуальные описания для колен, где состояния разные
  const individualDesc = [];

  ["left", "right"].forEach((knee) => {
    const kneeParts = perKnee[knee];
    const sideName = knee === "left" ? "левого" : "правого";
    const partsDesc = [];

    if (kneeParts["медиальном"]) partsDesc.push(`${surfaceMap[kneeParts["медиальном"]]} в медиальном отделе`);
    if (kneeParts["латеральном"]) partsDesc.push(`${surfaceMap[kneeParts["латеральном"]]} в латеральном отделе`);

    if (partsDesc.length > 0) {
      individualDesc.push(`${sideName} коленного сустава ${partsDesc.join(", ")}`);
    }
  });

  if (individualDesc.length > 0) {
    descriptions.push(`Суставные поверхности ${individualDesc.join(", ")}`);
  }

  return descriptions.length ? descriptions.join(", ") + "." : "Суставные поверхности склерозированы без изменений.";
};



  if (!isOpen) return null;

const isOptionSelected = (zoneKey, option) => {
  return selectedOptions[zoneKey]?.[0] === option;
};

  const hasAnySelection = (zoneKey) => selectedOptions[zoneKey]?.length > 0;

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
          backgroundImage: `url(/images/knees-front.jpg)`,
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
              {conditionOptions.map((option) => (
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
