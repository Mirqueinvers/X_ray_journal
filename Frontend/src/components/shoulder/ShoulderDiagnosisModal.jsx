import React, { useState } from "react";

export default function ShoulderDiagnosisModal({ isOpen, onClose, textareaRef }) {
  const diagnoses = ["Артроз 1 ст", "Артроз 2 ст", "Артроз 3 ст", "Артроз 4 ст", "Вывих", "Повреждение вращательной манжеты", "Импинджмент-синдром"];

  const [selectedDiagnoses, setSelectedDiagnoses] = useState({
    rightShoulder: "",
    leftShoulder: "",
    rightAcromioclavicular: "",
    leftAcromioclavicular: ""
  });

  const [expandedZone, setExpandedZone] = useState(null);

  const zones = [
    { 
      key: "rightShoulder", 
      name: "Правый плечевой", 
      position: { top: "33%", left: "32%" },
      type: "плечевой"
    },
    { 
      key: "leftShoulder", 
      name: "Левый плечевой", 
      position: { top: "33%", left: "59%" },
      type: "плечевой"
    },
    { 
      key: "rightAcromioclavicular", 
      name: "Правый КАС", 
      position: { top: "15%", left: "32%" },
      type: "ключично-акромиальный"
    },
    { 
      key: "leftAcromioclavicular", 
      name: "Левый КАС", 
      position: { top: "15%", left: "59%" },
      type: "ключично-акромиальный"
    }
  ];

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  const selectDiagnosis = (zoneKey, diagnosis) => {
    setSelectedDiagnoses((prev) => ({
      ...prev,
      [zoneKey]: prev[zoneKey] === diagnosis ? "" : diagnosis
    }));
    setExpandedZone(null);
  };

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const generateDiagnosisDescription = () => {
    const shoulderDiagnoses = [];
    const acromioclavicularDiagnoses = [];

    // Группируем диагнозы по типам суставов
    zones.forEach(zone => {
      const diagnosis = selectedDiagnoses[zone.key];
      if (!diagnosis) return;

      const diagnosisText = getDiagnosisText(diagnosis);
      const sideText = zone.key.startsWith("right") ? "правом" : "левом";
      
      if (zone.type === "плечевой") {
        shoulderDiagnoses.push(`${diagnosisText} ${sideText} плечевом суставе`);
      } else {
        acromioclavicularDiagnoses.push(`${diagnosisText} ${sideText} ключично-акромиальном сочленении`);
      }
    });

    const parts = [];

    // Формируем описание для плечевых суставов
    if (shoulderDiagnoses.length > 0) {
      const shoulderText = shoulderDiagnoses.length === 2 && 
                          selectedDiagnoses.rightShoulder === selectedDiagnoses.leftShoulder
        ? `Признаки ${getDiagnosisText(selectedDiagnoses.rightShoulder)} обоих плечевых суставов`
        : `Признаки ${shoulderDiagnoses.join("; ")}`;
      parts.push(shoulderText);
    }

    // Формируем описание для ключично-акромиальных суставов
    if (acromioclavicularDiagnoses.length > 0) {
      const acromioText = acromioclavicularDiagnoses.length === 2 && 
                         selectedDiagnoses.rightAcromioclavicular === selectedDiagnoses.leftAcromioclavicular
        ? `Признаки ${getDiagnosisText(selectedDiagnoses.rightAcromioclavicular)} обоих ключично-акромиальных сочленений`
        : `Признаки ${acromioclavicularDiagnoses.join("; ")}`;
      parts.push(acromioText);
    }

    if (parts.length === 0) {
      return "Признаков патологических изменений плечевых суставов и ключично-акромиальных сочленений не выявлено.";
    }

    return parts.join("; ") + ".";
  };

  const getDiagnosisText = (diagnosis) => {
    switch (diagnosis) {
      case "Артроз 1 ст": return "артроза 1 ст";
      case "Артроз 2 ст": return "артроза 2 ст";
      case "Артроз 3 ст": return "артроза 3 ст";
      case "Артроз 4 ст": return "артроза 4 ст";
      case "Вывих": return "вывиха";
      case "Повреждение вращательной манжеты": return "повреждения вращательной манжеты";
      case "Импинджмент-синдром": return "импинджмент-синдрома";
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          ✕
        </button>

        {/* Фон с плечевыми суставами */}
        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/shoulder-right.png), url(/images/shoulder-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "23% 95%, 77% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}>
          
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[120px] h-[80px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                hasDiagnosisSelected(zone.key)
                  ? "bg-yellow-200/30 border-yellow-400"
                  : "border-yellow-500 bg-transparent"
              }`}
              style={zone.position}
              onClick={() => handleZoneClick(zone.key)}
            >
              <span className="text-white text-xs font-medium text-center">{zone.name}</span>
              {selectedDiagnoses[zone.key] && (
                <span className="text-yellow-300 text-[10px] mt-1 text-center leading-tight">
                  {selectedDiagnoses[zone.key]}
                </span>
              )}
            </div>
          ))}

          {/* Меню выбора диагноза */}
          {expandedZone && (
            <div className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20" style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "220px",
            }}>
              <div className="grid grid-cols-2 gap-2">
                {diagnoses.map((diagnosis) => (
                  <div
                    key={`${expandedZone}-${diagnosis}`}
                    className={`p-2 border text-xs text-white text-center ${
                      isDiagnosisSelected(expandedZone, diagnosis)
                        ? "bg-yellow-500 border-yellow-400"
                        : "border-yellow-500 bg-gray-600"
                    } rounded cursor-pointer transition-all duration-200 hover:bg-gray-500`}
                    onClick={() => selectDiagnosis(expandedZone, diagnosis)}
                  >
                    {diagnosis}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Кнопка добавить */}
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

        {/* Кнопка сброса */}
        <div className="absolute bottom-4 right-4">
          <button 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            onClick={() => {
              setSelectedDiagnoses({
                rightShoulder: "",
                leftShoulder: "",
                rightAcromioclavicular: "",
                leftAcromioclavicular: ""
              });
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