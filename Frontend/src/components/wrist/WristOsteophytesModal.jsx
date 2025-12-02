import { useState } from "react";
import BaseModal from "../common/BaseModal";
import { generateDescriptionOsteophytes } from "../generateDescription/AnkleWristElbow/generateDescriptionOsteophytes.js";

export default function WristOsteophytesModal({ isOpen = true, onClose, insertTextToTextarea }) {
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

  const handleAdd = () => {
    const description = generateDescriptionOsteophytes({
      type: "wrist",
      selectedAreas,
    });
    insertTextToTextarea("\n" + description);
    onClose();
  };

  const hasSelections = Object.values(selectedAreas).some(Boolean);
  const isAddDisabled = isNormal || !hasSelections;

  if (!isOpen) return null;

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
      {/* Заголовок */}
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-yellow-300 text-lg z-20">
        Остеофиты лучезапястных суставов
      </h2>

      {/* Кнопка Норма */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => {
            setIsNormal(true);
            setSelectedAreas({
              rightLateral: false,
              rightMedial: false,
              leftLateral: false,
              leftMedial: false,
            });
          }}
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
          backgroundImage: `url(/images/wrist-right.png), url(/images/wrist-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "20% 95%, 80% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}
      >
        {/* Правый латеральный */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
            selectedAreas.rightLateral
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={{ left: "22%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleArea("rightLateral");
          }}
        />

        {/* Правый медиальный */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
            selectedAreas.rightMedial
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={{ left: "35%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleArea("rightMedial");
          }}
        />

        {/* Левый медиальный */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
            selectedAreas.leftMedial
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={{ left: "58%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleArea("leftMedial");
          }}
        />

        {/* Левый латеральный */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
            selectedAreas.leftLateral
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={{ left: "71%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleArea("leftLateral");
          }}
        />
      </div>

      {/* Добавить */}
      <div className="absolute bottom-4 left-4">
        <button
          disabled={isAddDisabled}
          className={`px-4 py-2 rounded ${
            isAddDisabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}
          onClick={handleAdd}
        >
          Добавить
        </button>
      </div>
    </BaseModal>
  );
}