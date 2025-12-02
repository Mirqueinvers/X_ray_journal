// Frontend/src/components/ankle/AnkleModalBase.jsx
import { useState } from "react";
import BaseModal from "../common/BaseModal.jsx";

const SIDE_OPTIONS = ["незначительно", "умеренно", "выраженно", "резко"];
const POSITION_OPTIONS = ["равномерно", "медиально", "латерально"];

export function useAnkleModalState() {
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

  const resetToNormal = () => {
    setIsNormal(true);
    setSelectedSides([]);
    setSelectedOptions({ left: [], right: [] });
    setSelectedPositions({ left: "", right: "" });
  };

  return {
    selectedSides,
    selectedOptions,
    selectedPositions,
    isNormal,
    toggleSide,
    toggleSideOption,
    togglePositionOption,
    resetToNormal,
    SIDE_OPTIONS,
    POSITION_OPTIONS,
  };
}

export default function AnkleModalBase({
  isOpen,
  onClose,
  title,
  children,
  onAdd,
  insertTextToTextarea,
  mode,
  generatorFunction,
  type,
}) {
  const {
    selectedSides,
    selectedOptions,
    selectedPositions,
    isNormal,
    toggleSide,
    toggleSideOption,
    togglePositionOption,
    resetToNormal,
    SIDE_OPTIONS,
    POSITION_OPTIONS,
  } = useAnkleModalState();

  const JointArea = ({ side, style }) => (
    <div
      className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
        selectedSides.includes(side)
          ? "bg-yellow-200/30 border-yellow-400"
          : "border-yellow-500 bg-transparent"
      } rounded-lg cursor-pointer transition-all duration-200`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        toggleSide(side);
      }}
    />
  );

  const OptionsPanel = ({ side, position }) => (
    <div className={`absolute top-[40%] transform -translate-y-1/2 ${position} flex space-x-2`}>
      <div className="w-28 space-y-2">
        {POSITION_OPTIONS.map((pos, index) => (
          <div
            key={`${side}-pos-${index}`}
            className={`p-2 border text-xs text-white ${
              selectedPositions[side] === pos
                ? "bg-yellow-500 border-yellow-400"
                : "border-yellow-500 bg-gray-600"
            } rounded cursor-pointer transition-all duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              togglePositionOption(side, pos);
            }}
          >
            {pos}
          </div>
        ))}
      </div>
      <div className="w-28 space-y-2">
        {SIDE_OPTIONS.map((option, index) => (
          <div
            key={`${side}-${index}`}
            className={`p-2 border text-xs text-white ${
              selectedOptions[side].includes(option)
                ? "bg-yellow-500 border-yellow-400"
                : "border-yellow-500 bg-gray-600"
            } rounded cursor-pointer transition-all duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSideOption(side, option);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );

  const handleAdd = () => {
    const text =
      "\n" +
      generatorFunction({
        type,
        selectedOptions,
        selectedPositions,
        mode,
      });

    insertTextToTextarea(text);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="custom"
      contentClassName="w-[350mm] h-[148.5mm] bg-gray-800 p-0 overflow-hidden"
    >
      {/* Кнопка Норма */}
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

      {/* Фон с суставами */}
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
        {children}

        {/* Правый сустав */}
        <JointArea side="right" style={{ left: "31%" }} />

        {/* Левый сустав */}
        <JointArea side="left" style={{ left: "57%" }} />

        {/* Опции для правого сустава */}
        {selectedSides.includes("right") && (
          <OptionsPanel side="right" position="ml-[11%]" />
        )}

        {/* Опции для левого сустава */}
        {selectedSides.includes("left") && (
          <OptionsPanel side="left" position="ml-[71.5%]" />
        )}

        {/* Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={handleAdd}
          >
            Добавить
          </button>
        </div>
      </div>
    </BaseModal>
  );
}