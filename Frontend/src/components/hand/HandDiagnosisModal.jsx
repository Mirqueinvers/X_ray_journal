import React, { useState } from "react";

export default function HandDiagnosisModal({ isOpen, onClose, textareaRef }) {
  const diagnoses = ["Артроз 1 ст", "Артроз 2 ст", "Артроз 3 ст", "Артроз 4 ст", "Вывих", "Деформация", "Ревматоидный артрит"];

  const [activeDiagnosis, setActiveDiagnosis] = useState(diagnoses[0]);

  const [selectedOptions, setSelectedOptions] = useState({
    // Правая кисть
    rightCmc1: {}, rightCmc2: {}, rightCmc3: {}, rightCmc4: {}, rightCmc5: {},
    rightMcp1: {}, rightMcp2: {}, rightMcp3: {}, rightMcp4: {}, rightMcp5: {},
    rightPip2: {}, rightPip3: {}, rightPip4: {}, rightPip5: {},
    rightDip2: {}, rightDip3: {}, rightDip4: {}, rightDip5: {},
    rightIp1: {},
    rightWrist: {},

    // Левая кисть
    leftCmc1: {}, leftCmc2: {}, leftCmc3: {}, leftCmc4: {}, leftCmc5: {},
    leftMcp1: {}, leftMcp2: {}, leftMcp3: {}, leftMcp4: {}, leftMcp5: {},
    leftPip2: {}, leftPip3: {}, leftPip4: {}, leftPip5: {},
    leftDip2: {}, leftDip3: {}, leftDip4: {}, leftDip5: {},
    leftIp1: {},
    leftWrist: {},
  });

  const jointMap = [
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
    { key: "rightWrist", label: "ЛЗС", top: "5%", left: "28%" },

    { key: "leftCmc1", label: "I", top: "18%", left: "66.3%" },
    { key: "leftCmc2", label: "II", top: "19%", left: "69%" },
    { key: "leftCmc3", label: "III", top: "19%", left: "71.5%" },
    { key: "leftCmc4", label: "IV", top: "21%", left: "74%" },
    { key: "leftCmc5", label: "V", top: "20%", left: "77%" },

    { key: "leftMcp1", label: "I", top: "37.5%", left: "62%" },
    { key: "leftMcp2", label: "II", top: "48%", left: "66.5%" },
    { key: "leftMcp3", label: "III", top: "48.5%", left: "71.2%" },
    { key: "leftMcp4", label: "IV", top: "46.7%", left: "75.4%" },
    { key: "leftMcp5", label: "V", top: "42.3%", left: "79.4%" },

    { key: "leftPip2", label: "II", top: "69.5%", left: "65.7%" },
    { key: "leftPip3", label: "III", top: "72.3%", left: "71.2%" },
    { key: "leftPip4", label: "IV", top: "68.5%", left: "76.5%" },
    { key: "leftPip5", label: "V", top: "59.5%", left: "80.5%" },

    { key: "leftDip2", label: "II", top: "82.5%", left: "65.5%" },
    { key: "leftDip3", label: "III", top: "88.4%", left: "71%" },
    { key: "leftDip4", label: "IV", top: "84%", left: "76.7%" },
    { key: "leftDip5", label: "V", top: "70%", left: "80.7%" },

    { key: "leftIp1", label: "I", top: "52.8%", left: "60.5%" },
    { key: "leftWrist", label: "ЛЗС", top: "5%", left: "72%" },
  ];

  const toggleJoint = (key) => {
    setSelectedOptions(prev => {
      const joint = prev[key] || {};
      const newJoint = { ...joint };
      if (newJoint[activeDiagnosis]) {
        delete newJoint[activeDiagnosis];
      } else {
        newJoint[activeDiagnosis] = true;
      }
      return { ...prev, [key]: newJoint };
    });
  };

  const generateDiagnosisDescription = () => {
    const handNamesGenitive = { right: "правого", left: "левого" };
    const handNames = { right: "правой", left: "левой" };

    const jointGroups = {
      Mcp: {
        plural: "пястно-фаланговых суставах",
        single: "пястно-фаланговом суставе",
      },
      Pip: {
        plural: "проксимальных межфаланговых суставах",
        single: "проксимальном межфаланговом суставе",
      },
      Dip: {
        plural: "дистальных межфаланговых суставах",
        single: "дистальном межфаланговом суставе",
      },
      Cmc: {
        plural: "пястно-запястных суставах",
        single: "пястно-запястном суставе",
      },
      Wrist: {
        plural: "лучезапястных суставах",
        single: "лучезапястном суставе",
      },
      Ip: {
        plural: "межфаланговых суставах I пальца",
        single: "межфаланговом суставе I пальца",
      },
    };

    const romanToNum = { I: 1, II: 2, III: 3, IV: 4, V: 5 };
    const numToRoman = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };

    const compressFingers = (labels) => {
      const nums = labels.map(l => romanToNum[l]).filter(Boolean).sort((a, b) => a - b);
      if (!nums.length) return "";
      const ranges = [];
      let start = nums[0];
      let end = nums[0];
      for (let i = 1; i <= nums.length; i++) {
        if (nums[i] === end + 1) end = nums[i];
        else {
          ranges.push(start === end ? numToRoman[start] : `${numToRoman[start]}–${numToRoman[end]}`);
          start = nums[i];
          end = nums[i];
        }
      }
      return ranges.join(", ");
    };

    const diagnosisGroups = {};

    ["right", "left"].forEach(hand => {
      const jointsForHand = jointMap.filter(j => j.key.startsWith(hand));

      jointsForHand.forEach(j => {
        const joint = selectedOptions[j.key];
        if (!joint) return;

        const type = Object.keys(jointGroups).find(t => j.key.includes(t));
        const label = j.label;

        Object.entries(joint).forEach(([diagnosis, checked]) => {
          if (!checked) return;

          diagnosisGroups[diagnosis] = diagnosisGroups[diagnosis] || {};
          diagnosisGroups[diagnosis][hand] = diagnosisGroups[diagnosis][hand] || {};
          diagnosisGroups[diagnosis][hand][type] = diagnosisGroups[diagnosis][hand][type] || [];
          diagnosisGroups[diagnosis][hand][type].push(label);
        });
      });
    });

    const parts = [];

    // Обрабатываем лучезапястные суставы отдельно
    diagnoses.forEach(diagnosis => {
      const handData = diagnosisGroups[diagnosis];
      if (!handData) return;

      const wristParts = [];
      Object.entries(handData).forEach(([hand, types]) => {
        if (types.Wrist) {
          wristParts.push(`${handNamesGenitive[hand]} лучезапястном суставе`);
          delete types.Wrist;
        }
      });

      if (wristParts.length) {
        const diagnosisText = diagnosis.toLowerCase();
        parts.push(`Признаки ${diagnosisText} в ${wristParts.join(" и ")}`);
      }
    });

    // Обрабатываем остальные суставы
    diagnoses.forEach(diagnosis => {
      const handData = diagnosisGroups[diagnosis];
      if (!handData) return;

      const handParts = [];
      Object.entries(handData).forEach(([hand, types]) => {
        const typeParts = [];
        Object.entries(types).forEach(([type, labels]) => {
          const joint = jointGroups[type];
          const fingers = compressFingers(labels);
          
          if (type === "Ip") {
            typeParts.push(`${joint.single} ${handNames[hand]} кисти`);
          } else {
            typeParts.push(`${fingers} ${labels.length > 1 ? joint.plural : joint.single} ${handNames[hand]} кисти`);
          }
        });
        if (typeParts.length) {
          handParts.push(typeParts.join(", "));
        }
      });

      if (handParts.length) {
        const diagnosisText = diagnosis.toLowerCase();
        parts.push(`Признаки ${diagnosisText} в ${handParts.join(", ")}`);
      }
    });

    if (!parts.length) return "Признаков патологических изменений суставов кистей не выявлено.";

    return parts.join("; ") + ".";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          ✖
        </button>

        {/* Плашки выбора диагноза */}
        <div className="absolute left-4 top-20 flex flex-col gap-2 z-20">
          {/* 🔹 Плашка "Норма" */}
          <button
            onClick={() => {
// Для кнопки "Норма"
if (textareaRef?.current) {
  const textarea = textareaRef.current;
  const text = "Заключение: костной патологии не выявлено.";

  // Делаем двойной отступ от конца текста, если текст уже есть
  const prefix = textarea.value.length > 0 ? "\n\n" : "";
  textarea.value = textarea.value + prefix + text;

  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}
onClose();

            }}
            className="px-4 py-2 rounded font-medium text-sm bg-green-500 text-gray-900 hover:bg-green-400"
          >
            Норма
          </button>
          {diagnoses.map(d => (
            <button
              key={d}
              onClick={() => setActiveDiagnosis(d)}
              className={`px-4 py-2 rounded font-medium text-sm ${activeDiagnosis === d ? "bg-yellow-500 text-gray-900" : "bg-gray-600 text-white"}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Фон с руками */}
        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/hand-left.png), url(/images/hand-right.png)`,
          backgroundPosition: "15% center, 85% center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "contain, contain",
        }}>
          {/* Кнопки суставов */}
          {jointMap.map(j => {
            const joint = selectedOptions[j.key];
            const isSelected = joint && joint[activeDiagnosis];
            const isCmc = j.key.includes("Cmc");
            const isWrist = j.key.includes("Wrist");
            return (
              <div
                key={j.key}
                className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${isWrist ? "w-[150px] h-[50px]" : isCmc ? "w-[35px] h-[35px]" : "w-[50px] h-[50px]"}
                  ${isSelected ? "bg-yellow-200/30 border-yellow-400" : "bg-transparent border-yellow-500"}`}
                style={{ top: j.top, left: j.left, transform: "translate(-50%, -50%)" }}
                onClick={() => toggleJoint(j.key)}
              >
                <span className={`${isWrist ? "text-[10px]" : isCmc ? "text-[8px]" : "text-xs"} font-medium text-black`}>
                  {j.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Кнопка добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={() => {
              if (textareaRef?.current) {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const textBefore = textarea.value.substring(0, start);
                const textAfter = textarea.value.substring(end);

                const insertText = generateDiagnosisDescription();

                let finalText = insertText;
                if (textBefore.length > 0 && !textBefore.endsWith("\n")) {
                  finalText = "\n" + insertText;
                }

                textarea.value = textBefore + finalText + textAfter;

                const cursorPos = start + finalText.length;
                textarea.selectionStart = textarea.selectionEnd = cursorPos;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
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