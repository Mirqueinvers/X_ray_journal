import { useState } from "react";

export default function AnkleJoinSpaceModal({ onClose, textareaRef }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    left: [],
    right: [],
  });
  const [isNormal, setIsNormal] = useState(true); // ✅ Норма выбрана по умолчанию

  const sideOptions = ["незначительно", "умеренно", "выраженно", "резко"];

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
      if (newSides.length > 0) setIsNormal(false); // ✅ выключаем "Норму"
      return newSides;
    });
  };

  const toggleSideOption = (side, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[side];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((opt) => opt !== option)
        : [...currentOptions, option];
      if (newOptions.length > 0) setIsNormal(false); // ✅ выключаем "Норму"
      return {
        ...prev,
        [side]: newOptions,
      };
    });
  };

  const generateDescription = () => {
    if (isNormal) {
      return "Суставные щели голеностопных суставов сохранены, равномерные.";
    }

    const leftOpts = selectedOptions.left;
    const rightOpts = selectedOptions.right;

    if (leftOpts.length && rightOpts.length) {
      const left = leftOpts[0];
      const right = rightOpts[0];
      if (left === right) {
        return `Суставные щели голеностопных суставов сужены ${left}.`;
      } else {
        return `Суставная щель левого голеностопного сустава сужена ${left}, правого — ${right}.`;
      }
    }

    if (leftOpts.length) {
      return `Суставная щель левого голеностопного сустава сужена ${leftOpts[0]}, правого не изменена.`;
    }

    if (rightOpts.length) {
      return `Суставная щель правого голеностопного сустава сужена ${rightOpts[0]}, левого не изменена.`;
    }

    return "Изменений не выявлено.";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer">
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Плашка Норма */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => {
              setIsNormal(true);
              setSelectedSides([]);
              setSelectedOptions({ left: [], right: [] });
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

        {/* Фон с изображением */}
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
          {/* Сегменты */}
          <div
            className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("right")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
            style={{ left: "31%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("right");
            }}
          ></div>

          <div
            className={`absolute top-[40%] transform -translate-y-1/2 w-40 h-20 border-2 ${
              selectedSides.includes("left")
                ? "bg-yellow-200/30 border-yellow-400"
                : "border-yellow-500 bg-transparent"
            } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
            style={{ left: "57%" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSide("left");
            }}
          ></div>

          {/* Опции */}
          {selectedSides.includes("right") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[20%] w-28 space-y-2">
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
          )}
          {selectedSides.includes("left") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[71.5%] w-28 space-y-2">
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
          )}
        </div>

        {/* Кнопка Добавить */}
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
