import React, { useState } from "react";

export default function SinusesModal({ isOpen, onClose, insertTextToTextarea }) {
  const [selectedOptions, setSelectedOptions] = useState({
    rightFrontal: { mucosa: "", fluid: "", pneumatization: "", contour: "", development: "" },
    leftFrontal: { mucosa: "", fluid: "", pneumatization: "", contour: "", development: "" },
    rightMaxillary: { mucosa: "", fluid: "", pneumatization: "", contour: "", cyst: "" },
    leftMaxillary: { mucosa: "", fluid: "", pneumatization: "", contour: "", cyst: "" },
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const zones = [
    { key: "rightFrontal", name: "Правая лобная", position: { top: "6%", left: "40%" }, type: "frontal" },
    { key: "leftFrontal", name: "Левая лобная", position: { top: "6%", left: "52%" }, type: "frontal" },
    { key: "rightMaxillary", name: "Правая гайморова", position: { top: "60%", left: "32%" }, type: "maxillary" },
    { key: "leftMaxillary", name: "Левая гайморова", position: { top: "60%", left: "60.5%" }, type: "maxillary" },
  ];

  const commonOptions = {
    mucosa: ["не изменена", "утолщена"],
    fluid: ["не определяется", "экссудат"],
    pneumatization: ["не изменена", "снижена"],
    contour: ["четкий", "нечеткий"],
  };

  const frontalOptions = {
    ...commonOptions,
    development: ["недоразвиты", "не развиты"],
  };

  const maxillaryOptions = {
    ...commonOptions,
    cyst: ["определяется"], // новая плашка только для гайморовых
  };

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  const selectOption = (zoneKey, category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [zoneKey]: {
        ...prev[zoneKey],
        [category]: value,
      },
    }));
  };

  const generateDescription = () => {
  const texts = [];

  const normalizeFrontal = (vals) => ({
    mucosa: vals.mucosa || "не изменена",
    fluid: vals.fluid || "не определяется",
    pneumatization: vals.pneumatization || "не изменена",
    contour: vals.contour || "четкий",
    development: vals.development || "",
  });

  const normalizeMaxillary = (vals) => ({
    mucosa: vals.mucosa || "не изменена",
    fluid: vals.fluid || "не определяется",
    pneumatization: vals.pneumatization || "не изменена",
    contour: vals.contour || "четкий",
    cyst: vals.cyst || "",
  });

  const leftFrontal = normalizeFrontal(selectedOptions.leftFrontal);
  const rightFrontal = normalizeFrontal(selectedOptions.rightFrontal);
  const leftMax = normalizeMaxillary(selectedOptions.leftMaxillary);
  const rightMax = normalizeMaxillary(selectedOptions.rightMaxillary);

  const checkIsNormalFrontal = (vals) =>
    vals.mucosa === "не изменена" &&
    vals.fluid === "не определяется" &&
    vals.pneumatization === "не изменена" &&
    vals.contour === "четкий";

  const leftNormal = checkIsNormalFrontal(leftFrontal);
  const rightNormal = checkIsNormalFrontal(rightFrontal);

  // --- Лобные пазухи ---
  if (leftNormal && rightNormal) {
    texts.push(
      "Лобные пазухи прозрачные, их контуры четкие ровные, слизистая не утолщена, пневматизация не изменена, патологических теней в проекции пазух не визуализируется."
    );
  } else {
    if (leftNormal)
      texts.push("Левая лобная пазуха без патологии.");
    else if (Object.values(leftFrontal).some(Boolean)) {
      const parts = [];
      if (leftFrontal.mucosa !== "не изменена") parts.push(`слизистая ${leftFrontal.mucosa}`);

      if (leftFrontal.fluid === "экссудат")
        parts.push("определяется гомогенное затемнение с горизонтальным уровнем");
      else if (leftFrontal.fluid !== "не определяется" && leftFrontal.fluid)
        parts.push(`содержимое: ${leftFrontal.fluid}`);

      if (leftFrontal.pneumatization !== "не изменена")
        parts.push(`пневматизация ${leftFrontal.pneumatization}`);
      if (leftFrontal.contour !== "четкий")
        parts.push(`контур ${leftFrontal.contour}`);
      if (parts.length > 0)
        texts.push(`Левая лобная пазуха: ${parts.join(", ")}.`);
    }

    if (rightNormal)
      texts.push("Правая лобная пазуха без патологии.");
    else if (Object.values(rightFrontal).some(Boolean)) {
      const parts = [];
      if (rightFrontal.mucosa !== "не изменена") parts.push(`слизистая ${rightFrontal.mucosa}`);

      if (rightFrontal.fluid === "экссудат")
        parts.push("определяется гомогенное затемнение с горизонтальным уровнем");
      else if (rightFrontal.fluid !== "не определяется" && rightFrontal.fluid)
        parts.push(`содержимое: ${rightFrontal.fluid}`);

      if (rightFrontal.pneumatization !== "не изменена")
        parts.push(`пневматизация ${rightFrontal.pneumatization}`);
      if (rightFrontal.contour !== "четкий")
        parts.push(`контур ${rightFrontal.contour}`);
      if (parts.length > 0)
        texts.push(`Правая лобная пазуха: ${parts.join(", ")}.`);
    }
  }

  // --- Гайморовы пазухи ---
  const makeMaxillaryText = (side, vals) => {
    const name = side === "left" ? "Левая гайморова пазуха" : "Правая гайморова пазуха";
    const parts = [];

    if (vals.mucosa !== "не изменена") parts.push(`слизистая ${vals.mucosa}`);

    if (vals.fluid === "экссудат")
      parts.push("определяется гомогенное затемнение с горизонтальным уровнем");
    else if (vals.fluid !== "не определяется" && vals.fluid)
      parts.push(`содержимое: ${vals.fluid}`);

    if (vals.pneumatization !== "не изменена") parts.push(`пневматизация ${vals.pneumatization}`);
    if (vals.contour !== "четкий") parts.push(`контур ${vals.contour}`);

    if (vals.cyst === "определяется")
      parts.push("в проекции пазухи определяется однородная округлая тень с четким контуром");

    if (parts.length > 0) return `${name}: ${parts.join(", ")}.`;
    return `${name} без патологии.`;
  };

  const leftMaxNormal =
    leftMax.mucosa === "не изменена" &&
    leftMax.fluid === "не определяется" &&
    leftMax.pneumatization === "не изменена" &&
    leftMax.contour === "четкий" &&
    leftMax.cyst === "";

  const rightMaxNormal =
    rightMax.mucosa === "не изменена" &&
    rightMax.fluid === "не определяется" &&
    rightMax.pneumatization === "не изменена" &&
    rightMax.contour === "четкий" &&
    rightMax.cyst === "";

  if (leftMaxNormal && rightMaxNormal) {
    texts.push(
      "Гайморовы пазухи прозрачные, их контуры четкие ровные, слизистая не утолщена, пневматизация не изменена, патологических теней в проекции пазух не визуализируется."
    );
  } else {
    texts.push(makeMaxillaryText("left", leftMax));
    texts.push(makeMaxillaryText("right", rightMax));
  }

  if (texts.length === 0) return "Околоносовые пазухи без патологии.";

  return texts.join("\n");
};


  if (!isOpen) return null;

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
        >
          ✕
        </button>

        {/* Фон пазух */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(/images/paranasal.png)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#374151",
          }}
        >
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[100px] h-[120px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                Object.values(selectedOptions[zone.key]).some(Boolean)
                  ? "bg-yellow-200/30 border-yellow-400"
                  : "border-yellow-500 bg-transparent"
              }`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name}</span>
            </div>
          ))}

          {expandedZone && (
            <div
              className="absolute bg-gray-700 p-3 rounded-lg shadow-lg z-20 grid gap-2"
              style={{
                gridTemplateColumns:
                  zones.find((z) => z.key === expandedZone)?.type === "frontal"
                    ? "repeat(5, minmax(0, 1fr))"
                    : "repeat(5, minmax(0, 1fr))", // +1 для "киста"
                top: zones.find((z) => z.key === expandedZone).position.top,
                left: zones.find((z) => z.key === expandedZone).position.left,
              }}
            >
              {Object.entries(
                zones.find((z) => z.key === expandedZone)?.type === "frontal"
                  ? frontalOptions
                  : maxillaryOptions
              ).map(([category, opts]) => (
                <div key={category}>
                  <div className="text-yellow-300 text-xs font-semibold text-center mb-1">
                    {category === "mucosa" && "Слизистая"}
                    {category === "fluid" && "Жидкость"}
                    {category === "pneumatization" && "Пневматизация"}
                    {category === "contour" && "Контур"}
                    {category === "cyst" && "Киста"}
                    {category === "development" && "Развитие"}
                  </div>
                  {opts.map((opt) => (
                    <div
                      key={opt}
                      className={`p-1 border rounded text-xs text-white mb-1 cursor-pointer text-center ${
                        selectedOptions[expandedZone][category] === opt
                          ? "bg-yellow-500 border-yellow-400"
                          : "border-yellow-500 bg-gray-600 hover:bg-gray-500"
                      }`}
                      onClick={() => selectOption(expandedZone, category, opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ))}

              {/* кнопка Ок */}
              <div className="col-span-full flex justify-center mt-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-gray-900 text-xs rounded hover:bg-yellow-400"
                  onClick={() => setExpandedZone(null)}
                >
                  Ок
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Кнопка Добавить */}
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
      </div>
    </div>
  );
}
