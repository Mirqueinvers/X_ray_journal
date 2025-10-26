import React, { useState } from "react";

export default function ShoulderJointSpaceModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    left: { degree: "", uniformity: "" },
    right: { degree: "", uniformity: "" },
  });
  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = [
    "не изменена",
    "незначительно сужена",
    "умеренно сужена",
    "выраженно сужена",
    "резко сужена",
  ];

  const uniformityOptions = ["равномерно", "неравномерно"];

  const zones = [
    { key: "right", name: "Правый плечевой сустав", position: { top: "35%", left: "33%" } },
    { key: "left", name: "Левый плечевой сустав", position: { top: "35%", left: "60%" } },
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

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  // 🟡 Генерация описания (аналогично тазобедренным суставам)
  const generateDescription = () => {
    const sides = { right: "правого", left: "левого" };
    const desc = {};

    Object.keys(sides).forEach((side) => {
      const { degree, uniformity } = selectedOptions[side];
      if (!degree && !uniformity) return;
      const textParts = [];
      if (degree && degree !== "не изменена") textParts.push(degree.replace(" сужена", ""));
      if (uniformity && degree !== "не изменена") textParts.push(uniformity);
      desc[side] = { degree, text: textParts.join(", ") };
    });

    const right = desc.right;
    const left = desc.left;

    // если ничего не выбрано
    if (!right && !left)
      return "Суставные щели плечевых суставов не изменены.";

    // если оба выбраны и одинаковы
    if (
      right &&
      left &&
      right.degree === left.degree &&
      right.text === left.text
    ) {
      if (right.degree === "не изменена") {
        return "Суставные щели плечевых суставов не изменены.";
      }
      return `Суставные щели плечевых суставов ${right.text} сужены.`;
    }

    // если оба выбраны, но разные
    if (right && left) {
      if (right.degree === "не изменена" && left.degree === "не изменена") {
        return "Суставные щели плечевых суставов не изменены.";
      }
      const rightPart =
        right.degree === "не изменена"
          ? "не изменена"
          : `${right.text} сужена`;
      const leftPart =
        left.degree === "не изменена"
          ? "не изменена"
          : `${left.text} сужена`;

      return `Суставная щель правого плечевого сустава ${rightPart}; левого — ${leftPart}.`;
    }

    // если выбран только один сустав
    if (right) {
      if (right.degree === "не изменена")
        return "Суставная щель правого плечевого сустава не изменена.";
      return `Суставная щель правого плечевого сустава ${right.text} сужена.`;
    }

    if (left) {
      if (left.degree === "не изменена")
        return "Суставная щель левого плечевого сустава не изменена.";
      return `Суставная щель левого плечевого сустава ${left.text} сужена.`;
    }

    return "";
  };

  if (!isOpen) return null;

  const hasSelection = (zoneKey) => {
    const z = selectedOptions[zoneKey];
    return z.degree || z.uniformity;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          ✕
        </button>

        {/* Фон */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(/images/shoulder-right.png), url(/images/shoulder-left.png)`,
            backgroundSize: "contain",
            backgroundPosition: "25% 95%, 75% 95%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#374151",
          }}
        >
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[130px] h-[180px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
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

          {/* Всплывающее окно выбора */}
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
                  onClick={() =>
                    handleOptionSelect(expandedZone, "degree", option)
                  }
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

        {/* Кнопка "Добавить" */}
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
