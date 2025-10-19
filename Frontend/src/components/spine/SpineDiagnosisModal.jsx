import React, { useState } from "react";

export default function SpineDiagnosisModal({ onClose, textareaRef, spineRegion = "cervical" }) {
  const diagnoses = [
    "Остеохондроз", 
    "Спондилез", 
    "Спондилоартроз", 
    "Грыжа диска", 
    "Протрузия диска", 
    "Спондилолистез", 
    "Стеноз позвоночного канала",
    "Компрессионный перелом"
  ];

  const [selectedDiagnoses, setSelectedDiagnoses] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [expandedZone, setExpandedZone] = useState(null);

  // Уровни позвоночника в зависимости от отдела
  const getSpineLevels = () => {
    switch (spineRegion) {
      case "cervical":
        return ["C1-C2", "C2-C3", "C3-C4", "C4-C5", "C5-C6", "C6-C7", "C7-Th1"];
      case "thoracic":
        return ["Th1-Th2", "Th2-Th3", "Th3-Th4", "Th4-Th5", "Th5-Th6", "Th6-Th7", 
                "Th7-Th8", "Th8-Th9", "Th9-Th10", "Th10-Th11", "Th11-Th12", "Th12-L1"];
      case "lumbar":
        return ["L1-L2", "L2-L3", "L3-L4", "L4-L5", "L5-S1"];
      default:
        return [];
    }
  };

  const spineLevels = getSpineLevels();

  const getRegionName = () => {
    switch (spineRegion) {
      case "cervical": return "шейного отдела";
      case "thoracic": return "грудного отдела";
      case "lumbar": return "поясничного отдела";
      default: return "";
    }
  };

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const toggleDiagnosis = (diagnosis) => {
    setSelectedDiagnoses(prev => 
      prev.includes(diagnosis) 
        ? prev.filter(d => d !== diagnosis)
        : [...prev, diagnosis]
    );
  };

  const toggleLevel = (diagnosis, level) => {
    setSelectedLevels(prev => {
      const currentLevels = prev[diagnosis] || [];
      const newLevels = currentLevels.includes(level)
        ? currentLevels.filter(l => l !== level)
        : [...currentLevels, level];
      
      return {
        ...prev,
        [diagnosis]: newLevels
      };
    });
  };

  const generateDiagnosisDescription = () => {
    if (selectedDiagnoses.length === 0) {
      return `Признаков патологических изменений позвоночника на уровне ${getRegionName()} не выявлено.`;
    }

    const descriptions = [];

    selectedDiagnoses.forEach(diagnosis => {
      const levels = selectedLevels[diagnosis] || [];
      
      if (levels.length === 0) {
        descriptions.push(`Признаки ${getDiagnosisText(diagnosis)} позвоночника на уровне ${getRegionName()}`);
      } else {
        const levelsText = levels.length === spineLevels.length 
          ? `на всех уровнях ${getRegionName()}`
          : `на уровнях ${levels.join(", ")} ${getRegionName()}`;
        
        descriptions.push(`Признаки ${getDiagnosisText(diagnosis)} ${levelsText}`);
      }
    });

    return descriptions.join("; ") + ".";
  };

  const getDiagnosisText = (diagnosis) => {
    switch (diagnosis) {
      case "Остеохондроз": return "остеохондроза";
      case "Спондилез": return "спондилеза";
      case "Спондилоартроз": return "спондилоартроза";
      case "Грыжа диска": return "грыжи диска";
      case "Протрузия диска": return "протрузии диска";
      case "Спондилолистез": return "спондилолистеза";
      case "Стеноз позвоночного канала": return "стеноза позвоночного канала";
      case "Компрессионный перелом": return "компрессионного перелома";
      default: return diagnosis.toLowerCase();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10">
          ✕
        </button>

        <h3 className="text-yellow-400 text-lg font-bold mb-4">
          Диагноз позвоночника ({getRegionName()})
        </h3>

        {/* Выбор диагнозов */}
        <div className="mb-6">
          <h4 className="text-white text-sm font-medium mb-2">Диагнозы:</h4>
          <div className="grid grid-cols-2 gap-2">
            {diagnoses.map(diagnosis => (
              <div
                key={diagnosis}
                className={`p-2 border text-xs text-white text-center cursor-pointer rounded ${
                  selectedDiagnoses.includes(diagnosis)
                    ? "bg-yellow-500 border-yellow-400 text-gray-900"
                    : "border-yellow-500 bg-gray-600"
                }`}
                onClick={() => toggleDiagnosis(diagnosis)}
              >
                {diagnosis}
              </div>
            ))}
          </div>
        </div>

        {/* Выбор уровней для выбранных диагнозов */}
        {selectedDiagnoses.length > 0 && (
          <div className="mb-6">
            <h4 className="text-white text-sm font-medium mb-2">Уровни поражения:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {spineLevels.map(level => (
                <div
                  key={level}
                  className={`p-2 border text-xs text-white text-center cursor-pointer rounded ${
                    selectedDiagnoses.some(d => selectedLevels[d]?.includes(level))
                      ? "bg-yellow-500 border-yellow-400 text-gray-900"
                      : "border-yellow-500 bg-gray-600"
                  }`}
                  onClick={() => {
                    selectedDiagnoses.forEach(diagnosis => {
                      toggleLevel(diagnosis, level);
                    });
                  }}
                >
                  {level}
                </div>
              ))}
            </div>
            
            {/* Индивидуальный выбор уровней для каждого диагноза */}
            {selectedDiagnoses.map(diagnosis => (
              <div key={diagnosis} className="mb-3">
                <div className="text-yellow-300 text-xs font-medium mb-1">{diagnosis}:</div>
                <div className="flex flex-wrap gap-1">
                  {spineLevels.map(level => (
                    <div
                      key={`${diagnosis}-${level}`}
                      className={`px-2 py-1 border text-[10px] text-white text-center cursor-pointer rounded ${
                        selectedLevels[diagnosis]?.includes(level)
                          ? "bg-yellow-500 border-yellow-400 text-gray-900"
                          : "border-yellow-500 bg-gray-600"
                      }`}
                      onClick={() => toggleLevel(diagnosis, level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={() => {
              insertTextToTextarea(generateDiagnosisDescription());
              onClose();
            }}
          >
            Добавить
          </button>
          
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            onClick={() => {
              setSelectedDiagnoses([]);
              setSelectedLevels({});
            }}
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
}