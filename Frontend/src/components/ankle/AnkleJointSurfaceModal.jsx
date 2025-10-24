import { useState } from "react";
import { generateDescriptionGapSurface } from "../generateDescription/AnkleWristElbow/generateDescriptionGapSurface.js";

export default function AnkleJointSurfaceModal({ isOpen, onClose, textareaRef }) {
  if (!isOpen) return null;

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
        : [option];
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
            backgroundImage: `url(/images/right-ankle.png), url(/images/left-ankle.png)`,
            backgroundSize: "contain",
            backgroundPosition: "30% 95%, 70% 95%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#374151",
          }}
        >
          {/* Правый сустав */}
          <div
            className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("right")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer transition-all duration-200`}
            style={{ left: "31%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("right");
            }}
          ></div>

          {/* Левый сустав */}
          <div
            className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("left")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer transition-all duration-200`}
            style={{ left: "57%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("left");
            }}
          ></div>

          {/* Опции изменения + положение */}
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
    const text = generateDescriptionGapSurface({
      type: "ankle", // 🔹 тип сустава — голеностопный
      selectedOptions,
      selectedPositions,
      mode: "surfaces", // или "surfaces", если нужно описывать суставные поверхности
    });

    insertTextToTextarea(text);
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