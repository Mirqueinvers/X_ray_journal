import { useState } from "react";

export default function WristDiagnosisModal({ onClose, textareaRef }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState({
    left: "",
    right: "",
  });
  const [isNormal, setIsNormal] = useState(true);

  const diagnosisOptions = ["Артроз 1 ст", "Артроз 2 ст", "Артроз 3 ст", "Артроз 4 ст", "Вывих", "Туннельный синдром", "Болезнь Кинбека"];

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
      return "Признаков патологических изменений лучезапястных суставов не выявлено.";
    }

    // Оба сустава выбраны
    if (leftDiagnosis && rightDiagnosis) {
      const sameDiagnosis = leftDiagnosis === rightDiagnosis;
      
      if (sameDiagnosis) {
        const diagnosisText = getDiagnosisText(leftDiagnosis);
        return `Признаки ${diagnosisText} обоих лучезапястных суставов.`;
      } else {
        const leftText = getDiagnosisText(leftDiagnosis);
        const rightText = getDiagnosisText(rightDiagnosis);
        return `Признаки ${rightText} правого лучезапястного сустава; ${leftText} левого лучезапястного сустава.`;
      }
    }

    // Только левый
    if (leftDiagnosis) {
      const diagnosisText = getDiagnosisText(leftDiagnosis);
      return `Признаки ${diagnosisText} левого лучезапястного сустава, правый сустав без особенностей.`;
    }

    // Только правый
    if (rightDiagnosis) {
      const diagnosisText = getDiagnosisText(rightDiagnosis);
      return `Признаки ${diagnosisText} правого лучезапястного сустава, левый сустав без особенностей.`;
    }

    return "Изменений не выявлено.";
  };

  const getDiagnosisText = (diagnosis) => {
    switch (diagnosis) {
      case "Артроз 1 ст": return "артроза 1 ст";
      case "Артроз 2 ст": return "артроза 2 ст";
      case "Артроз 3 ст": return "артроза 3 ст";
      case "Артроз 4 ст": return "артроза 4 ст";
      case "Вывих": return "вывиха";
      case "Туннельный синдром": return "туннельного синдрома";
      case "Болезнь Кинбека": return "болезни Кинбека";
      default: return diagnosis.toLowerCase();
    }
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
          ></div>

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
          ></div>

          {/* Диагностические опции для правого сустава */}
          {selectedSides.includes("right") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[8%]">
              <div className="w-32 space-y-2 bg-gray-700 p-2 rounded-lg">
                {diagnosisOptions.map((option, index) => (
                  <div
                    key={`right-${index}`}
                    className={`p-2 border text-xs text-white text-center ${
                      selectedDiagnoses.right === option
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDiagnosis("right", option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Диагностические опции для левого сустава */}
          {selectedSides.includes("left") && (
            <div className="absolute top-[40%] transform -translate-y-1/2 ml-[74.5%]">
              <div className="w-32 space-y-2 bg-gray-700 p-2 rounded-lg">
                {diagnosisOptions.map((option, index) => (
                  <div
                    key={`left-${index}`}
                    className={`p-2 border text-xs text-white text-center ${
                      selectedDiagnoses.left === option
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDiagnosis("left", option);
                    }}
                  >
                    {option}
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