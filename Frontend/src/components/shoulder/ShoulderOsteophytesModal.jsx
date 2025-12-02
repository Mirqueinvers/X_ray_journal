// Frontend/src/components/shoulder/ShoulderOsteophytesModal.jsx
import React, { useState } from "react";
import BaseModal from "../common/BaseModal";

export default function ShoulderOsteophytesModal({
  isOpen,
  onClose,
  insertTextToTextarea,
}) {
  const [selectedZones, setSelectedZones] = useState({
    rightUpper: false,
    rightLower: false,
    leftUpper: false,
    leftLower: false,
  });

  const zones = [
    {
      key: "rightUpper",
      name: "Правый верхний край",
      side: "правой",
      part: "верхнему",
      position: { top: "25%", left: "32%" },
    },
    {
      key: "rightLower",
      name: "Правый нижний край",
      side: "правой",
      part: "нижнему",
      position: { top: "45%", left: "32%" },
    },
    {
      key: "leftUpper",
      name: "Левый верхний край",
      side: "левой",
      part: "верхнему",
      position: { top: "25%", left: "59%" },
    },
    {
      key: "leftLower",
      name: "Левый нижний край",
      side: "левой",
      part: "нижнему",
      position: { top: "45%", left: "59%" },
    },
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

    if (leftLower && rightLower && !leftUpper && !rightUpper) {
      return "Определяются краевые костные разрастания по нижнему краю суставных впадин лопаток.";
    }

    if (leftUpper && rightUpper && !leftLower && !rightLower) {
      return "Определяются краевые костные разрастания по верхнему краю суставных впадин лопаток.";
    }

    // Смешанные случаи
    const parts = active.map((z) => `по ${z.part} краю суставной впадины ${z.side} лопатки`);

    return `Определяются краевые костные разрастания ${parts.join(" и ")}.`;
  };

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
            className={`absolute w-[120px] h-[100px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
              selectedZones[zone.key]
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={zone.position}
            onClick={() => toggleZone(zone.key)}
          >
            <span className="text-white text-sm font-medium text-center">
              {zone.name}
            </span>
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
    </BaseModal>
  );
}