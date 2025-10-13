import React, { useState } from "react";

const narrowingMapSingle = {
  "не изменена": "не изменена",
  "незначительно сужена": "незначительно сужена",
  "умеренно сужена": "умеренно сужена",
  "выраженно сужена": "выраженно сужена",
  "резко сужена": "резко сужена",
};

const narrowingMapPlural = {
  "не изменена": "не изменены",
  "незначительно сужена": "незначительно сужены",
  "умеренно сужена": "умеренно сужены",
  "выраженно сужена": "выраженно сужены",
  "резко сужена": "резко сужены",
};

export default function ShoulderJointSpaceModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    right: "",
    left: "",
  });
  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = [
    "не изменена",
    "незначительно сужена",
    "умеренно сужена",
    "выраженно сужена",
    "резко сужена",
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

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const generateDescription = () => {
    const { left, right } = selectedOptions;

    if (!left && !right)
      return "Суставные щели плечевых суставов не изменены.";

    // если обе стороны выбраны и одинаковые
    if (left && right && left === right) {
      return `Суставные щели плечевых суставов ${narrowingMapPlural[left]}.`;
    }

    // если обе стороны выбраны и разные
    if (left && right && left !== right) {
      return `Суставная щель правого плечевого сустава ${narrowingMapSingle[right]}, левого плечевого сустава ${narrowingMapSingle[left]}.`;
    }

    // если выбрана только одна сторона
    if (right) {
      return `Суставная щель правого плечевого сустава ${narrowingMapSingle[right]}.`;
    }
    if (left) {
      return `Суставная щель левого плечевого сустава ${narrowingMapSingle[left]}.`;
    }

    return "";
  };

  if (!isOpen) return null;

  const isOptionSelected = (zoneKey, option) => selectedOptions[zoneKey] === option;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          ✕
        </button>

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
              <span className="text-white text-sm font-medium text-center">{zone.name}</span>
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
