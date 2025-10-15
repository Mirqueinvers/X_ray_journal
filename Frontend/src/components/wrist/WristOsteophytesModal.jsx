import { useState } from "react";

export default function AnkleOsteophytesModal({ isOpen, onClose, textareaRef }) {
  if (!isOpen) return null;

  const [selectedAreas, setSelectedAreas] = useState({
    rightLateral: false,
    rightMedial: false,
    leftLateral: false,
    leftMedial: false,
  });
  const [isNormal, setIsNormal] = useState(true);

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const toggleArea = (area) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [area]: !prev[area],
    }));
    setIsNormal(false);
  };

  const generateDescription = () => {
  const {
    rightLateral,
    rightMedial,
    leftLateral,
    leftMedial,
  } = selectedAreas;

  // 1️⃣ Если ничего не выбрано
  if (!rightLateral && !rightMedial && !leftLateral && !leftMedial) {
    return "Краевые костные разрастания не выявлены.";
  }

  // 2️⃣ Если выбраны все
  if (rightLateral && rightMedial && leftLateral && leftMedial) {
    return "Определяются краевые костные разрастания на боковых поверхностях луче-запястных суставов.";
  }

  // 3️⃣ Если обе стороны только у правого
  if (rightLateral && rightMedial && !leftLateral && !leftMedial) {
    return "Определяются краевые костные разрастания на боковых поверхностях правого луче-запястного сустава.";
  }

  // 4️⃣ Если обе стороны только у левого
  if (!rightLateral && !rightMedial && leftLateral && leftMedial) {
    return "Определяются краевые костные разрастания на боковых поверхностях левого луче-запястного сустава.";
  }

  // 🆕 4.1 Если одинаковые стороны на обоих суставах
  if (rightLateral && leftLateral && !rightMedial && !leftMedial) {
    return "Определяются краевые костные разрастания на латеральных поверхностях луче-запястных суставов.";
  }
  if (rightMedial && leftMedial && !rightLateral && !leftLateral) {
    return "Определяются краевые костные разрастания на медиальных поверхностях луче-запястных суставов.";
  }

  // 5️⃣ Если обе стороны у правого и хотя бы одна у левого
  if (rightLateral && rightMedial && (leftLateral || leftMedial)) {
    const leftSide =
      leftLateral && leftMedial
        ? "на боковых поверхностях левого луче-запястного сустава"
        : leftLateral
        ? "на латеральной поверхности левого луче-запястного сустава"
        : "на медиальной поверхности левого луче-запястного сустава";
    return `Определяются краевые костные разрастания на боковых поверхностях правого луче-запястного сустава и ${leftSide}.`;
  }

  // 6️⃣ Если обе стороны у левого и хотя бы одна у правого
  if (leftLateral && leftMedial && (rightLateral || rightMedial)) {
    const rightSide =
      rightLateral && rightMedial
        ? "на боковых поверхностях правого луче-запястного сустава"
        : rightLateral
        ? "на латеральной поверхности правого луче-запястного сустава"
        : "на медиальной поверхности правого луче-запястного сустава";
    return `Определяются краевые костные разрастания ${rightSide} и на боковых поверхностях левого луче-запястного сустава.`;
  }

  // 7️⃣ Если по одной стороне на каждом суставе (разные комбинации)
  const parts = [];
  if (rightLateral)
    parts.push("на латеральной поверхности правого луче-запястного сустава");
  if (rightMedial)
    parts.push("на медиальной поверхности правого луче-запястного сустава");
  if (leftLateral)
    parts.push("на латеральной поверхности левого луче-запястного сустава");
  if (leftMedial)
    parts.push("на медиальной поверхности левого луче-запястного сустава");

  if (parts.length === 1) {
    return `Определяются краевые костные разрастания ${parts[0]}.`;
  }

  const last = parts.pop();
  return `Определяются краевые костные разрастания ${parts.join(" и ")} и ${last}.`;
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
