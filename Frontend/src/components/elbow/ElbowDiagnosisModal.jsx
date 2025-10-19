import { useState } from "react";

export default function ElbowDiagnosisModal({ onClose, textareaRef }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState({
    left: "",
    right: "",
  });
  const [isNormal, setIsNormal] = useState(true);

  const diagnosisOptions = [
    { value: "arthrosis_1", label: "Артроз 1 ст" },
    { value: "arthrosis_2", label: "Артроз 2 ст" },
    { value: "arthrosis_3", label: "Артроз 3 ст" },
    { value: "arthrosis_4", label: "Артроз 4 ст" },
    { value: "dislocation", label: "Вывих" },
    { value: "epicondylitis", label: "Эпикондилит" },
    { value: "contracture", label: "Контрактура" }
  ];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + text : text;
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

  const selectDiagnosis = (side, diagnosis) => {
    setSelectedDiagnoses((prev) => ({
      ...prev,
      [side]: prev[side] === diagnosis ? "" : diagnosis,
    }));
    setIsNormal(false);
  };

  const generateDiagnosisDescription = () => {
    const leftDiagnosis = selectedDiagnoses.left;
    const rightDiagnosis = selectedDiagnoses.right;

    // Норма
    if (!leftDiagnosis && !rightDiagnosis) {
      return "Признаков патологических изменений локтевых суставов не выявлено.";
    }

    // Оба сустава выбраны
    if (leftDiagnosis && rightDiagnosis) {
      const sameDiagnosis = leftDiagnosis === rightDiagnosis;
      
      if (sameDiagnosis) {
        const diagnosisLabel = diagnosisOptions.find(opt => opt.value === leftDiagnosis)?.label || "";
        return `Признаки ${diagnosisLabel.toLowerCase()} обоих локтевых суставов.`;
      } else {
        const leftLabel = diagnosisOptions.find(opt => opt.value === leftDiagnosis)?.label || "";
        const rightLabel = diagnosisOptions.find(opt => opt.value === rightDiagnosis)?.label || "";
        return `Признаки ${rightLabel.toLowerCase()} правого локтевого сустава; ${leftLabel.toLowerCase()} левого локтевого сустава.`;
      }
    }

    // Только левый
    if (leftDiagnosis) {
      const diagnosisLabel = diagnosisOptions.find(opt => opt.value === leftDiagnosis)?.label || "";
      return `Признаки ${diagnosisLabel.toLowerCase()} левого локтевого сустава, правый сустав без особенностей.`;
    }

    // Только правый
    if (rightDiagnosis) {
      const diagnosisLabel = diagnosisOptions.find(opt => opt.value === rightDiagnosis)?.label || "";
      return `Признаки ${diagnosisLabel.toLowerCase()} правого локтевого сустава, левый сустав без особенностей.`;
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
              setSelectedDiagnoses({ left: "", right: "" });
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

          {/* Диагностические опции для правого сустава */}
          {selectedSides.includes("right") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[11%]">
              <div className="w-32 space-y-2 bg-gray-700 p-2 rounded-lg">
                {diagnosisOptions.map((option, index) => (
                  <div
                    key={`right-${index}`}
                    className={`p-2 border text-xs text-white text-center ${
                      selectedDiagnoses.right === option.value
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDiagnosis("right", option.value);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Диагностические опции для левого сустава */}
          {selectedSides.includes("left") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[71.5%]">
              <div className="w-32 space-y-2 bg-gray-700 p-2 rounded-lg">
                {diagnosisOptions.map((option, index) => (
                  <div
                    key={`left-${index}`}
                    className={`p-2 border text-xs text-white text-center ${
                      selectedDiagnoses.left === option.value
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDiagnosis("left", option.value);
                    }}
                  >
                    {option.label}
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
              insertTextToTextarea(generateDiagnosisDescription());
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