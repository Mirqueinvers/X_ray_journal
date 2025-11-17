import React, { useState } from "react";

export default function ShoulderOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  const [selectedZones, setSelectedZones] = useState({
    rightUpper: false,
    rightLower: false,
    leftUpper: false,
    leftLower: false,
  });

  const zones = [
    { key: "rightUpper", name: "Правый верхний край", side: "правой", part: "верхнему", position: { top: "25%", left: "32%" } },
    { key: "rightLower", name: "Правый нижний край", side: "правой", part: "нижнему", position: { top: "45%", left: "32%" } },
    { key: "leftUpper", name: "Левый верхний край", side: "левой", part: "верхнему", position: { top: "25%", left: "59%" } },
    { key: "leftLower", name: "Левый нижний край", side: "левой", part: "нижнему", position: { top: "45%", left: "59%" } },
  ];

  const toggleZone = (zoneKey) => {
    setSelectedZones((prev) => ({
      ...prev,
      [zoneKey]: !prev[zoneKey],
    }));
  };

  const generateDescription = () => {
    const active = zones.filter((z) => selectedZones[z.key]);

    if (active.length === 0)
      return "Краевые костные разрастания по краям суставных впадин лопаток не определяются.";

    // Проверка на симметричные отделы
    const leftLower = selectedZones.leftLower;
    const rightLower = selectedZones.rightLower;
    const leftUpper = selectedZones.leftUpper;
    const rightUpper = selectedZones.rightUpper;

    const parts = [];

    if (leftLower && rightLower && !leftUpper && !rightUpper) {
      return "Определяются краевые костные разрастания по нижнему краю суставных впадин лопаток.";
    }

    if (leftUpper && rightUpper && !leftLower && !rightLower) {
      return "Определяются краевые костные разрастания по верхнему краю суставных впадин лопаток.";
    }

    // Смешанные случаи
    active.forEach((z) => {
      parts.push(`по ${z.part} краю суставной впадины ${z.side} лопатки`);
    });

    return `Определяются краевые костные разрастания ${parts.join(" и ")}.`;
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
              className={`absolute w-[120px] h-[100px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                selectedZones[zone.key]
                  ? "bg-yellow-200/30 border-yellow-400"
                  : "border-yellow-500 bg-transparent"
              }`}
              style={zone.position}
              onClick={() => toggleZone(zone.key)}
            >
              <span className="text-white text-sm font-medium text-center">{zone.name}</span>
              {selectedZones[zone.key] && (
                <span className="text-yellow-300 text-xs mt-1">остеофит</span>
              )}
            </div>
          ))}
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
      </div>
    </div>
  );
}
