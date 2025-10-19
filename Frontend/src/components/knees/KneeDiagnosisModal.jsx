import React, { useState } from "react";

export default function KneeDiagnosisModal({ isOpen, onClose, textareaRef }) {
  const diagnoses = ["Артроз 1 ст", "Артроз 2 ст", "Артроз 3 ст", "Артроз 4 ст", "Гонартроз", "Вывих", "Повреждение мениска"];

  const [selectedDiagnoses, setSelectedDiagnoses] = useState({
    left: "",
    right: "",
  });

  const [expandedZone, setExpandedZone] = useState(null);

  // Зоны для коленных суставов
  const zones = [
    { key: "right", name: "Правый коленный", position: { top: "28%", left: "29%" } },
    { key: "left", name: "Левый коленный", position: { top: "28%", left: "71%" } },
  ];

  // Логика выбора диагноза
  const selectDiagnosis = (zoneKey, diagnosis) => {
    setSelectedDiagnoses((prev) => ({
      ...prev,
      [zoneKey]: prev[zoneKey] === diagnosis ? "" : diagnosis,
    }));
    setExpandedZone(null);
  };

  // Вставка в textarea
  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  // Генерация описания
  const generateDiagnosisDescription = () => {
    const leftDiagnosis = selectedDiagnoses.left;
    const rightDiagnosis = selectedDiagnoses.right;

    // Норма
    if (!leftDiagnosis && !rightDiagnosis) {
      return "Признаков патологических изменений коленных суставов не выявлено.";
    }

    // Оба сустава выбраны
    if (leftDiagnosis && rightDiagnosis) {
      const sameDiagnosis = leftDiagnosis === rightDiagnosis;
      
      if (sameDiagnosis) {
        const diagnosisText = getDiagnosisText(leftDiagnosis);
        return `Признаки ${diagnosisText} обоих коленных суставов.`;
      } else {
        const leftText = getDiagnosisText(leftDiagnosis);
        const rightText = getDiagnosisText(rightDiagnosis);
        return `Признаки ${rightText} правого коленного сустава; ${leftText} левого коленного сустава.`;
      }
    }

    // Только левый
    if (leftDiagnosis) {
      const diagnosisText = getDiagnosisText(leftDiagnosis);
      return `Признаки ${diagnosisText} левого коленного сустава, правый сустав без особенностей.`;
    }

    // Только правый
    if (rightDiagnosis) {
      const diagnosisText = getDiagnosisText(rightDiagnosis);
      return `Признаки ${diagnosisText} правого коленного сустава, левый сустав без особенностей.`;
    }

    return "Изменений не выявлено.";
  };

  // Функция для получения текста диагноза в правильном падеже
  const getDiagnosisText = (diagnosis) => {
    switch (diagnosis) {
      case "Артроз 1 ст": return "артроза 1 ст";
      case "Артроз 2 ст": return "артроза 2 ст";
      case "Артроз 3 ст": return "артроза 3 ст";
      case "Артроз 4 ст": return "артроза 4 ст";
      case "Гонартроз": return "гонартроза";
      case "Вывих": return "вывиха";
      case "Повреждение мениска": return "повреждения мениска";
      default: return diagnosis.toLowerCase();
    }
  };

  if (!isOpen) return null;

  const isDiagnosisSelected = (zoneKey, diagnosis) => {
    return selectedDiagnoses[zoneKey] === diagnosis;
  };

  const hasDiagnosisSelected = (zoneKey) => {
    return !!selectedDiagnoses[zoneKey];
  };

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/knee-right.png), url(/images/knee-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "10% 95%, 90% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}>
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[120px] h-[120px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${hasDiagnosisSelected(zone.key) ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"}`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name}</span>
              {selectedDiagnoses[zone.key] && (
                <span className="text-yellow-300 text-xs mt-1 text-center">
                  {selectedDiagnoses[zone.key]}
                </span>
              )}
            </div>
          ))}

          {expandedZone && (
            <div className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20" style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "200px",
            }}>
              <div className="grid grid-cols-2 gap-2">
                {diagnoses.map((diagnosis) => (
                  <div
                    key={`${expandedZone}-${diagnosis}`}
                    className={`p-2 border text-xs text-white text-center ${isDiagnosisSelected(expandedZone, diagnosis) ? "bg-yellow-500 border-yellow-400" : "border-yellow-500 bg-gray-600"} rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={() => selectDiagnosis(expandedZone, diagnosis)}
                  >
                    {diagnosis}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4">
          <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400" onClick={() => {
            insertTextToTextarea(generateDiagnosisDescription());
            onClose();
          }}>
            Добавить
          </button>
        </div>

        {/* Кнопка сброса */}
        <div className="absolute bottom-4 right-4">
          <button 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            onClick={() => {
              setSelectedDiagnoses({ left: "", right: "" });
              setExpandedZone(null);
            }}
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
}