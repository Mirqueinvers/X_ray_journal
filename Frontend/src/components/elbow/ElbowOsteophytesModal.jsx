// Frontend/src/components/elbow/ElbowOsteophytesModal.jsx
import { useState } from "react";
import { generateDescriptionOsteophytes } from "../generateDescription/AnkleWristElbow/generateDescriptionOsteophytes.js";
import BaseModal from "../common/BaseModal.jsx";

export default function ElbowOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  const [selectedAreas, setSelectedAreas] = useState({
    rightLateral: false,
    rightMedial: false,
    leftLateral: false,
    leftMedial: false,
  });
  const [isNormal, setIsNormal] = useState(true);

  const toggleArea = (area) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [area]: !prev[area],
    }));
    setIsNormal(false);
  };

  const resetToNormal = () => {
    setIsNormal(true);
    setSelectedAreas({
      rightLateral: false,
      rightMedial: false,
      leftLateral: false,
      leftMedial: false,
    });
  };

  const handleAdd = () => {
    const description =
      "\n" +
      generateDescriptionOsteophytes({
        type: "elbow",
        selectedAreas,
      });
    insertTextToTextarea(description);
    onClose();
  };

  const osteophyteAreas = [
    { area: "rightLateral", style: { left: "27%" } },
    { area: "rightMedial", style: { left: "36%" } },
    { area: "leftMedial", style: { left: "57%" } },
    { area: "leftLateral", style: { left: "66%" } },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Остеофиты локтевых суставов"
      size="custom"
      contentClassName="w-[350mm] h-[148.5mm] bg-gray-800 p-0 overflow-hidden"
    >
      {/* Норма */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={resetToNormal}
          className={`px-4 py-2 rounded border text-sm font-medium transition-all duration-200 ${
            isNormal
              ? "bg-yellow-400 text-black border-yellow-400 shadow-lg"
              : "bg-gray-700 text-yellow-200 border-yellow-500 hover:bg-gray-600"
          }`}
        >
          Норма
        </button>
      </div>

      {/* Фон */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(/images/elbow-right.png), url(/images/elbow-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "30% 95%, 70% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}
      >
        {/* Области остеофитов */}
        {osteophyteAreas.map(({ area, style }) => (
          <div
            key={area}
            className={`absolute top-[45.5%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas[area]
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={style}
            onClick={(e) => {
              e.stopPropagation();
              toggleArea(area);
            }}
          />
        ))}
      </div>

      {/* Добавить */}
      <div className="absolute bottom-4 left-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
          onClick={handleAdd}
        >
          Добавить
        </button>
      </div>
    </BaseModal>
  );
}