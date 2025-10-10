import { useState } from "react";

export default function ElbowJoinSpaceModal({ onClose, textareaRef }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    left: [],
    right: [],
  });
  const [selectedPositions, setSelectedPositions] = useState({
    left: "",
    right: "",
  });
  const [isNormal, setIsNormal] = useState(true);

  const sideOptions = ["незначительно", "умеренно", "выраженно", "резко"];
  const positionOptions = ["равномерно", "медиально", "латерально"];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const toggleSide = (side) => {
    setSelectedSides((prev) => {
      const newSides = prev.includes(side)
        ? prev.filter((s) => s !== side)
        : [...prev, side];
      if (newSides.length > 0) setIsNormal(false);
      return newSides;
    });
  };

  const toggleSideOption = (side, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[side];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((opt) => opt !== option)
        : [option]; // только одна степень
      if (newOptions.length > 0) setIsNormal(false);
      return {
        ...prev,
        [side]: newOptions,
      };
    });
  };

  const togglePositionOption = (side, option) => {
    setSelectedPositions((prev) => ({
      ...prev,
      [side]: prev[side] === option ? "" : option,
    }));
    setIsNormal(false);
  };

const generateDescriptionCompact = () => {
  const leftOpts = selectedOptions.left;
  const rightOpts = selectedOptions.right;
  const leftPos = selectedPositions.left;
  const rightPos = selectedPositions.right;

  const positionPhrase = (pos, plural = false) => {
    switch (pos) {
      case "медиально": return plural ? "медиальных" : "медиальном";
      case "латерально": return plural ? "латеральных" : "латеральном";
      case "равномерно": return "равномерно";
      default: return "";
    }
  };

  const addPosition = (pos, plural = false) => {
    if (!pos || pos === "равномерно") return ""; // не добавляем ничего
    return `, преимущественно в ${positionPhrase(pos, plural)} отдел${plural ? "ах" : "е"}`;
  };

  // Если ничего не выбрано
  if (!leftOpts.length && !rightOpts.length) {
    return "Суставные щели локтевых суставов сохранены, равномерные.";
  }

  // Если выбраны оба сустава
  if (leftOpts.length && rightOpts.length) {
    const sameDegree = leftOpts[0] === rightOpts[0];
    const samePos = leftPos === rightPos;

    if (sameDegree && samePos) {
      // одинаковая степень и позиция
      if (!leftPos || leftPos === "равномерно") {
        return `Суставные щели локтевых суставов ${leftOpts[0]} сужены.`;
      }
      return `Суставные щели локтевых суставов ${leftOpts[0]} сужены${addPosition(leftPos, true)}.`;
    } else {
      return `Суставная щель правого локтевого сустава ${rightOpts[0]} сужена${addPosition(rightPos)}; левого ${leftOpts[0]} сужена${addPosition(leftPos)}.`;
    }
  }

  // Если только левый сустав
  if (leftOpts.length) {
    return `Суставная щель левого локтевого сустава ${leftOpts[0]} сужена${addPosition(leftPos)}, правого не изменена.`;
  }

  // Если только правый сустав
  if (rightOpts.length) {
    return `Суставная щель правого локтевого сустава ${rightOpts[0]} сужена${addPosition(rightPos)}, левого не изменена.`;
  }

  return "Изменений не выявлено.";
};






  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer">
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
              setSelectedSides([]);
              setSelectedOptions({ left: [], right: [] });
              setSelectedPositions({ left: "", right: "" });
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
          {/* Правый сустав */}
          <div
            className={`absolute top-[44%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("right")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer transition-all duration-200`}
            style={{ left: "29.5%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("right");
            }}
          ></div>

          {/* Левый сустав */}
          <div
            className={`absolute top-[44%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("left")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer transition-all duration-200`}
            style={{ left: "58.5%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("left");
            }}
          ></div>

          {/* Опции сужения + положение */}
          {selectedSides.includes("right") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[11%] flex space-x-2">
              <div className="w-28 space-y-2">
                {positionOptions.map((pos, index) => (
                  <div
                    key={`right-pos-${index}`}
                    className={`p-2 border text-xs text-white ${
                      selectedPositions.right === pos
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePositionOption("right", pos);
                    }}
                  >
                    {pos}
                  </div>
                ))}
              </div>
              <div className="w-28 space-y-2">
                {sideOptions.map((option, index) => (
                  <div
                    key={`right-${index}`}
                    className={`p-2 border text-xs text-white ${
                      selectedOptions.right.includes(option)
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSideOption("right", option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSides.includes("left") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[71.5%] flex space-x-2">
              <div className="w-28 space-y-2">
                {sideOptions.map((option, index) => (
                  <div
                    key={`left-${index}`}
                    className={`p-2 border text-xs text-white ${
                      selectedOptions.left.includes(option)
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSideOption("left", option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="w-28 space-y-2">
                {positionOptions.map((pos, index) => (
                  <div
                    key={`left-pos-${index}`}
                    className={`p-2 border text-xs text-white ${
                      selectedPositions.left === pos
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePositionOption("left", pos);
                    }}
                  >
                    {pos}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={() => {
              insertTextToTextarea(generateDescriptionCompact()); // ← используем новую функцию
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
