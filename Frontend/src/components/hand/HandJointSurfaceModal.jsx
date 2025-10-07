// Frontend/src/components/hand/HandJointSurfaceModal.jsx
// Суставные поверхности кистей
import React, { useState } from "react";

export default function HandJointSurfaceModal({ isOpen, onClose, textareaRef }) {
  const degrees = ["Не изменены", "Незначительно", "Умеренно", "Выраженно"];

  const [activeDegree, setActiveDegree] = useState(degrees[0]);

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
      if (newJoint[activeDegree]) {
        delete newJoint[activeDegree];
      } else {
        newJoint[activeDegree] = true;
      }
      return { ...prev, [key]: newJoint };
    });
  };

  const generateDescription = () => {
    const handNamesGenitive = { right: "правого", left: "левого" }; // для ЛЗС
    const handNames = { right: "правой", left: "левой" }; // для остальных суставов

    // Названия суставов в нужных формах
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

    // Сжатие: ["II","III","IV"] → "II–IV"
    const compressFingers = (labels) => {
      const nums = labels.map(l => romanToNum[l]).filter(Boolean).sort((a, b) => a - b);
      if (!nums.length) return "";
      const ranges = [];
      let start = nums[0];
      let end = nums[0];
      for (let i = 1; i <= nums.length; i++) {
        if (nums[i] === end + 1) end = nums[i];
        else {
          if (start === end) ranges.push(numToRoman[start]);
          else ranges.push(`${numToRoman[start]}–${numToRoman[end]}`);
          start = nums[i];
          end = nums[i];
        }
      }
      return ranges.join(", ");
    };

    // Группировка: степень → рука → тип сустава
    const degreeGroups = {};

    ["right", "left"].forEach(hand => {
      const jointsForHand = jointMap.filter(j => j.key.startsWith(hand));

      jointsForHand.forEach(j => {
        const joint = selectedOptions[j.key];
        if (!joint) return;

        const type = Object.keys(jointGroups).find(t => j.key.includes(t));
        const label = j.label;

        Object.entries(joint).forEach(([degree, checked]) => {
          if (!checked) return;
          const deg = degree.toLowerCase();

          degreeGroups[deg] = degreeGroups[deg] || {};
          degreeGroups[deg][hand] = degreeGroups[deg][hand] || {};
          degreeGroups[deg][hand][type] = degreeGroups[deg][hand][type] || [];
          degreeGroups[deg][hand][type].push(label);
        });
      });
    });

    // Проверяем, есть ли лучезапястные суставы отдельно
    const wristParts = [];
    const degreeOrder = ["незначительно", "умеренно", "выраженно"];
    degreeOrder.forEach(deg => {
      const hands = degreeGroups[deg];
      if (!hands) return;

      Object.entries(hands).forEach(([hand, types]) => {
        if (types.Wrist) {
          wristParts.push(
            `суставные поверхности ${handNamesGenitive[hand]} лучезапястного сустава ${deg}`
          );
          delete types.Wrist; // чтобы не дублировать в общем блоке
        }
      });
    });

    // Формируем остальное описание
    const degreeParts = [];

    degreeOrder.forEach(deg => {
      const hands = degreeGroups[deg];
      if (!hands) return;

      const handParts = [];

      Object.entries(hands).forEach(([hand, types]) => {
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
        degreeParts.push(`${deg} склерозированы в ${handParts.join(", ")}`);
      }
    });


    const parts = [];

    if (wristParts.length) {
      // Первая буква — с заглавной
      const wristSentence =
        wristParts
          .map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s))
          .join(", ") + ".";
      parts.push(wristSentence);
    }

    if (degreeParts.length) {
      parts.push("Суставные поверхности " + degreeParts.join("; ") + ".");
    }

    if (!parts.length) {
      return "Суставные поверхности кистей рук без патологических изменений.";
    }

    return parts.join(" ");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          ✖
        </button>

        {/* Плашки выбора степени */}
        <div className="absolute left-4 top-20 flex flex-col gap-2 z-20">
          {degrees.map(d => (
            <button
              key={d}
              onClick={() => setActiveDegree(d)}
              className={`px-4 py-2 rounded font-medium ${activeDegree === d ? "bg-yellow-500 text-gray-900" : "bg-gray-600 text-white"}`}
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
            const isSelected = joint && joint[activeDegree];
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
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={() => {
              if (textareaRef?.current) {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const textBefore = textarea.value.substring(0, start);
                const textAfter = textarea.value.substring(end);

                let insertText = "";

                if (activeDegree === "Не изменены") {
                  insertText = "Суставные поверхности ровные, чёткие, без признаков деформации.";
                } else {
                  insertText = generateDescription();
                }

                // Добавляем перенос строки, если перед вставкой нет его
                if (textBefore.length > 0 && !textBefore.endsWith("\n")) {
                  insertText = "\n" + insertText;
                }

                textarea.value = textBefore + insertText + textAfter;
                const cursorPos = start + insertText.length;
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