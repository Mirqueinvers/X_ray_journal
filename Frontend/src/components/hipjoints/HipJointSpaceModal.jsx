// Frontend/src/components/hipjoints/HipJointSpaceModal.jsx
// Суставные щели тазобедренных суставов — упрощённая версия (по суставам)
import React, { useState } from "react";

export default function HipJointSpaceModal({ isOpen, onClose, insertTextToTextarea }) {
  const [selectedOptions, setSelectedOptions] = useState({
    left: { degree: "", uniformity: "" },
    right: { degree: "", uniformity: "" },
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = ["незначительно", "умеренно", "выраженно", "резко"];
  const uniformityOptions = ["равномерно", "неравномерно"];

  const zones = [
    { key: "right", name: "Правый тазобедренный сустав", position: { top: "50%", left: "30%" } },
    { key: "left", name: "Левый тазобедренный сустав", position: { top: "50%", left: "60%" } },
  ];

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

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

  // Если ничего не выбрано
  if (!desc.right && !desc.left)
    return "Суставные щели тазобедренных суставов равномерной высоты.";

  // Если оба выбраны и одинаковые
  if (desc.right && desc.left && desc.right === desc.left) {
    return `Суставные щели тазобедренных суставов ${desc.right} сужены.`;
  }

  // Если оба выбраны, но разные
  if (desc.right && desc.left) {
    return `Суставная щель правого тазобедренного сустава ${desc.right} сужена; левого — ${desc.left} сужена.`;
  }

  // Если выбран только один сустав
  if (desc.right)
    return `Суставная щель правого тазобедренного сустава ${desc.right} сужена.`;
  if (desc.left)
    return `Суставная щель левого тазобедренного сустава ${desc.left} сужена.`;

  return "";
};


  if (!isOpen) return null;

  const hasSelection = (zoneKey) =>
    selectedOptions[zoneKey].degree || selectedOptions[zoneKey].uniformity;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(/images/hip.png)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {zones.map((zone) => (
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
            <div
              className="absolute bg-gray-700 p-3 rounded-lg shadow-lg z-20 w-[180px]"
              style={{
                top: zones.find((z) => z.key === expandedZone).position.top,
                left: zones.find((z) => z.key === expandedZone).position.left,
              }}
            >
              <p className="text-yellow-300 text-xs mb-1 text-center">
                Степень сужения
              </p>
              {degreeOptions.map((option) => (
                <div
                  key={`${expandedZone}-${option}`}
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
              {uniformityOptions.map((option) => (
                <div
                  key={`${expandedZone}-${option}`}
                  className={`p-1 border text-xs text-white mb-1 ${
                    isSelected(expandedZone, "uniformity", option)
                      ? "bg-yellow-500 border-yellow-400"
                      : "border-yellow-500 bg-gray-600"
                  } rounded cursor-pointer text-center`}
                  onClick={() =>
                    handleOptionSelect(expandedZone, "uniformity", option)
                  }
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
              insertTextToTextarea("\n" + generateDescription());
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
