import { useState } from "react";
import { generateDescriptionOsteophytes } from "../generateDescription/AnkleWristElbow/generateDescriptionOsteophytes.js";

export default function ElbowOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  if (!isOpen) return null;

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

        {/* Норма */}
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
            backgroundImage: `url(/images/elbow-right.png), url(/images/elbow-left.png)`,
            backgroundSize: "contain",
            backgroundPosition: "30% 95%, 70% 95%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#374151",
          }}
        >
          {/* Правый латеральный */}
          <div
            className={`absolute top-[45.5%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.rightLateral
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={{ left: "27%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleArea("rightLateral");
            }}
          />


          {/* Правый медиальный */}
          <div
            className={`absolute top-[45.5%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.rightMedial
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={{ left: "36%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleArea("rightMedial");
            }}
          />


          {/* Левый медиальный */}
          <div
            className={`absolute top-[45.5%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.leftMedial
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={{ left: "57%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleArea("leftMedial");
            }}
          />


          {/* Левый латеральный */}
          <div
            className={`absolute top-[45.5%] transform -translate-y-1/2 w-24 h-16 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.leftLateral
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            }`}
            style={{ left: "66%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleArea("leftLateral");
            }}
          />

        </div>

        {/* Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={() => {
              // Генерация описания именно для голеностопного сустава
              const description = generateDescriptionOsteophytes({
                type: "elbow",
                selectedAreas, // объект с { rightLateral, rightMedial, leftLateral, leftMedial }
              });
              insertTextToTextarea(description);
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
