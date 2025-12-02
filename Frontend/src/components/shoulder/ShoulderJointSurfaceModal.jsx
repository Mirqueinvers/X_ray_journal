// Frontend/src/components/shoulder/ShoulderJointSurfaceModal.jsx
import React, { useState } from "react";
import BaseModal from "../common/BaseModal";

const surfaceMapPlural = {
  "не изменена": "не изменены",
  "незначительно склерозирована": "незначительно склерозированы",
  "умеренно склерозирована": "умеренно склерозированы",
  "выраженно склерозирована": "выраженно склерозированы",
  "резко склерозирована": "резко склерозированы",
};

export default function ShoulderJointSurfaceModal({
  isOpen,
  onClose,
  insertTextToTextarea,
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    right: "",
    left: "",
  });
  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = [
    "не изменена",
    "незначительно склерозирована",
    "умеренно склерозирована",
    "выраженно склерозирована",
    "резко склерозирована",
  ];

  const zones = [
    { key: "right", name: "Правый сустав", position: { top: "33%", left: "32%" } },
    { key: "left", name: "Левый сустав", position: { top: "33%", left: "59%" } },
  ];

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  const selectOption = (zoneKey, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [zoneKey]: option,
    }));
    setExpandedZone(null);
  };

  const generateDescription = () => {
    const { left, right } = selectedOptions;

    // 🟡 Ничего не выбрано
    if (!left && !right)
      return "Суставные поверхности плечевых суставов не изменены.";

    // 🟡 Оба выбраны и одинаковые
    if (left && right && left === right) {
      return `Суставные поверхности плечевых суставов ${surfaceMapPlural[left]}.`;
    }

    // 🟡 Оба выбраны, но разные
    if (left && right && left !== right) {
      return `Суставные поверхности правого плечевого сустава ${surfaceMapPlural[right]}, левого — ${surfaceMapPlural[left]}.`;
    }

    // 🟡 Выбрана только одна сторона — всё равно во множественном числе
    if (right && !left) {
      return `Суставные поверхности плечевых суставов справа ${surfaceMapPlural[right]}.`;
    }
    if (left && !right) {
      return `Суставные поверхности плечевых суставов слева ${surfaceMapPlural[left]}.`;
    }

    return "";
  };

  const isOptionSelected = (zoneKey, option) =>
    selectedOptions[zoneKey] === option;

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
      {/* Фон с плечевыми суставами */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(/images/shoulder-right.png), url(/images/shoulder-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "23% 95%, 77% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}
      >
        {zones.map((zone) => (
          <div
            key={zone.key}
            className={`absolute w-[120px] h-[160px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
              selectedOptions[zone.key]
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={zone.position}
            onClick={() => handleZoneClick(zone.key)}
          >
            <span className="text-white text-sm font-medium text-center">
              {zone.name}
            </span>
            {selectedOptions[zone.key] && (
              <span className="text-yellow-300 text-xs mt-1">
                {selectedOptions[zone.key]}
              </span>
            )}
          </div>
        ))}

        {expandedZone && (
          <div
            className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20"
            style={{
              top: zones.find((z) => z.key === expandedZone).position.top,
              left: zones.find((z) => z.key === expandedZone).position.left,
            }}
          >
            {degreeOptions.map((option) => (
              <div
                key={`${expandedZone}-${option}`}
                className={`p-2 border text-xs text-white mb-1 rounded cursor-pointer transition-all duration-200 ${
                  isOptionSelected(expandedZone, option)
                    ? "bg-yellow-500 border-yellow-400"
                    : "border-yellow-500 bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => selectOption(expandedZone, option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка добавить */}
      <div className="absolute bottom-4 left-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
          onClick={() => {
            insertTextToTextarea("\n" + generateDescription());
            onClose();
          }}
        >
          Добавить
        </button>
      </div>
    </BaseModal>
  );
}