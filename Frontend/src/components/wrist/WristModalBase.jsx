import { useState } from "react";
import BaseModal from "../common/BaseModal";

export default function WristModalBase({
  isOpen,
  onClose,
  title,
  insertTextToTextarea,
  generatorFunction,
  type,
  mode,
}) {
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

  const handleAdd = () => {
    const text = generatorFunction({
      type,
      selectedOptions,
      selectedPositions,
      mode,
    });

    insertTextToTextarea("\n" + text);
    onClose();
  };

  const isAddDisabled = isNormal || selectedSides.length === 0;

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
        {title}
      </h2>

      {/* Кнопка Норма */}
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

      {/* Фон с изображениями запястий */}
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
        {/* Правый сустав */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
            selectedSides.includes("right")
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          } rounded-lg cursor-pointer transition-all duration-200`}
          style={{ left: "26%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleSide("right");
          }}
        />

        {/* Левый сустав */}
        <div
          className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
            selectedSides.includes("left")
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          } rounded-lg cursor-pointer transition-all duration-200`}
          style={{ left: "62%" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleSide("left");
          }}
        />

        {/* Опции для правой стороны */}
        {selectedSides.includes("right") && (
          <div className="absolute top-[40%] transform -translate-y-1/2 ml-[8%] flex space-x-2">
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

        {/* Опции для левой стороны */}
        {selectedSides.includes("left") && (
          <div className="absolute top-[40%] transform -translate-y-1/2 ml-[74.5%] flex space-x-2">
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

      {/* Кнопка Добавить */}
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