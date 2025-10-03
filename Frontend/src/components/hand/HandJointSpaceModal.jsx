import React, { useState } from "react";

export default function HandJointSpaceModal({ isOpen, onClose, textareaRef }) {
const [selectedOptions, setSelectedOptions] = useState({
  // Правая кисть
  rightCmc1: [], rightCmc2: [], rightCmc3: [], rightCmc4: [], rightCmc5: [],
  rightMcp1: [], rightMcp2: [], rightMcp3: [], rightMcp4: [], rightMcp5: [],
  rightPip2: [], rightPip3: [], rightPip4: [], rightPip5: [],
  rightDip2: [], rightDip3: [], rightDip4: [], rightDip5: [],
  rightIp1: [],
  rightWrist: [],

  // Левая кисть
  leftCmc1: [], leftCmc2: [], leftCmc3: [], leftCmc4: [], leftCmc5: [],
  leftMcp1: [], leftMcp2: [], leftMcp3: [], leftMcp4: [], leftMcp5: [],
  leftPip2: [], leftPip3: [], leftPip4: [], leftPip5: [],
  leftDip2: [], leftDip3: [], leftDip4: [], leftDip5: [],
  leftIp1: [],
  leftWrist: [],
});


  const [expandedZone, setExpandedZone] = useState(null);

  const degreeOptions = [
    "равномерной высоты",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Карта суставов с координатами (top/left в %)
  const jointMap = [
    // Правая кисть
    { key: "rightCmc1", label: "I", top: "18%", left: "33.7%" },
    { key: "rightCmc2", label: "II", top: "19%", left: "31%" },
    { key: "rightCmc3", label: "III", top: "19%", left: "28.5%" },
    { key: "rightCmc4", label: "IV", top: "21%", left: "26%" },
    { key: "rightCmc5", label: "V", top: "20%", left: "23%" },

    { key: "rightMcp1", label: "I", top: "37.5%", left: "38%" },
    { key: "rightMcp2", label: "II", top: "48%", left: "33.5%" },
    { key: "rightMcp3", label: "III", top: "48.5%", left: "28.8%" },
    { key: "rightMcp4", label: "IV", top: "46.7%", left: "24.6%" },
    { key: "rightMcp5", label: "V", top: "42.3%", left: "20.6%" },

    { key: "rightPip2", label: "II", top: "69.5%", left: "34.3%" },
    { key: "rightPip3", label: "III", top: "72.3%", left: "28.8%" },
    { key: "rightPip4", label: "IV", top: "68.5%", left: "23.5%" },
    { key: "rightPip5", label: "V", top: "59.5%", left: "19.5%" },

    { key: "rightDip2", label: "II", top: "82.5%", left: "34.5%" },
    { key: "rightDip3", label: "III", top: "88.4%", left: "29%" },
    { key: "rightDip4", label: "IV", top: "84%", left: "23.3%" },
    { key: "rightDip5", label: "V", top: "70%", left: "19.3%" },

    { key: "rightIp1", label: "I", top: "52.8%", left: "39.5%" },

    // Правая кисть (лучезапястный сустав)
    { key: "rightWrist", label: "ЛЗС", top: "5%", left: "28%" },

    // Левая кисть
    { key: "leftCmc1", label: "I",   top: "18%", left: "66.3%" },
    { key: "leftCmc2", label: "II",  top: "19%", left: "69%" },
    { key: "leftCmc3", label: "III", top: "19%", left: "71.5%" },
    { key: "leftCmc4", label: "IV",  top: "21%", left: "74%" },
    { key: "leftCmc5", label: "V",   top: "20%", left: "77%" },


    { key: "leftMcp1", label: "I",   top: "37.5%", left: "62%" },
    { key: "leftMcp2", label: "II",  top: "48%",   left: "66.5%" },
    { key: "leftMcp3", label: "III", top: "48.5%", left: "71.2%" },
    { key: "leftMcp4", label: "IV",  top: "46.7%", left: "75.4%" },
    { key: "leftMcp5", label: "V",   top: "42.3%", left: "79.4%" },

    { key: "leftPip2", label: "II",  top: "69.5%", left: "65.7%" },
    { key: "leftPip3", label: "III", top: "72.3%", left: "71.2%" },
    { key: "leftPip4", label: "IV",  top: "68.5%", left: "76.5%" },
    { key: "leftPip5", label: "V",   top: "59.5%", left: "80.5%" },

    { key: "leftDip2", label: "II",  top: "82.5%", left: "65.5%" },
    { key: "leftDip3", label: "III", top: "88.4%", left: "71%" },
    { key: "leftDip4", label: "IV",  top: "84%",   left: "76.7%" },
    { key: "leftDip5", label: "V",   top: "70%",   left: "80.7%" },

    { key: "leftIp1",  label: "I",   top: "52.8%", left: "60.5%" },

    // Левая кисть (лучезапястный сустав)
    { key: "leftWrist", label: "ЛЗС", top: "5%", left: "72%" },
  ];

  const toggleZoneOption = (zoneKey, option) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[zoneKey];
      if (option === "равномерной высоты") {
        return { ...prev, [zoneKey]: currentOptions.includes(option) ? [] : [option] };
      } else {
        if (currentOptions.includes("равномерной высоты")) {
          return { ...prev, [zoneKey]: [option] };
        }
        return { 
          ...prev, 
          [zoneKey]: currentOptions.includes(option) 
            ? currentOptions.filter(o => o !== option) 
            : [...currentOptions, option]
        };
      }
    });
    setExpandedZone(null);
  };

  const insertTextToTextarea = text => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

    const generateDescription = () => {
    const descriptions = [];
    ["left", "right"].forEach(hand => {
        ["Mcp","Pip","Dip","Ip","Cmc","Wrist"].forEach(group => {
        const affected = jointMap.filter(
            j => j.key.startsWith(hand+group) && 
                selectedOptions[j.key]?.[0] && 
                selectedOptions[j.key][0] !== "равномерной высоты"
        );
        if (affected.length) {
            const desc = affected.map(j => `${j.label} ${selectedOptions[j.key][0]}`).join(", ");
            descriptions.push(`${hand === "right" ? "Правая" : "Левая"} кисть: ${desc}.`);
        }
        });
    });
    return descriptions.length ? descriptions.join(" ") : "Суставные щели кистей рук равномерной высоты.";
    };


  if (!isOpen) return null;

  const isOptionSelected = (zoneKey, option) => selectedOptions[zoneKey]?.includes(option);
  const hasAnySelection = zoneKey => selectedOptions[zoneKey]?.length > 0;
  const handleZoneClick = zoneKey => setExpandedZone(expandedZone === zoneKey ? null : zoneKey);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Фон с руками */}
        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/hand-left.png), url(/images/hand-right.png)`,
          backgroundPosition: "15% center, 85% center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "contain, contain",
        }}>
         
        {/* Кнопки суставов */}
        {jointMap.map(joint => {
        const isCmc = joint.key.includes("Cmc"); 
        const isWrist = joint.key.includes("Wrist"); // проверка для лучезапястных
        return (
            <div
            key={joint.key}
            className={`absolute 
                        ${isWrist ? "w-[150px] h-[50px]" : isCmc ? "w-[35px] h-[35px]" : "w-[50px] h-[50px]"} 
                        border-2 rounded-lg flex items-center justify-center 
                        cursor-pointer transition-all duration-200 
                        ${hasAnySelection(joint.key) ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"}`}
            style={{ top: joint.top, left: joint.left, transform: "translate(-50%, -50%)" }}
            onClick={() => handleZoneClick(joint.key)}
            >
            <span className={`text-black font-medium ${isWrist ? "text-[10px]" : isCmc ? "text-[8px]" : "text-xs"}`}>
                {joint.label}
            </span>
            </div>
        );
        })}


        </div>

        {/* Меню выбора степени */}
        {expandedZone && (
          <div className="absolute bg-gray-700 p-2 rounded-lg shadow-lg z-20" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            {degreeOptions.map(option => (
              <div
                key={`${expandedZone}-${option}`}
                className={`p-2 border text-xs text-white mb-1 ${isOptionSelected(expandedZone, option) ? "bg-yellow-500 border-yellow-400" : "border-yellow-500 bg-gray-600"} rounded cursor-pointer transition-all duration-200`}
                onClick={() => toggleZoneOption(expandedZone, option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Кнопка добавить */}
        <div className="absolute bottom-4 left-4">
          <button className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50" onClick={() => { insertTextToTextarea(generateDescription()); onClose(); }}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
