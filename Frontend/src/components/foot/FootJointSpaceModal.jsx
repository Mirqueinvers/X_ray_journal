import React, { useState } from "react";
import { generateDescriptionUniversalCombined } from "../generateDescription/HandFoot/generateDescriptionUniversalCombined";


export default function FootJointSpaceModal({ isOpen, onClose, textareaRef }) {
  const degrees = ["Не изменены", "Незначительно", "Умеренно", "Выраженно", "Резко"];

  const [activeDegree, setActiveDegree] = useState(degrees[0]);

  const [selectedOptions, setSelectedOptions] = useState({
    // Правая стопа
    rightTmt1: {}, rightTmt2: {}, rightTmt3: {}, rightTmt4: {}, rightTmt5: {},
    rightMtp1: {}, rightMtp2: {}, rightMtp3: {}, rightMtp4: {}, rightMtp5: {},
    rightPIP2: {}, rightPIP3: {}, rightPIP4: {}, rightPIP5: {},
    rightDIP2: {}, rightDIP3: {}, rightDIP4: {}, rightDIP5: {},
    rightIP1: {},
    

    // Левая стопа
    leftTmt1: {}, leftTmt2: {}, leftTmt3: {}, leftTmt4: {}, leftTmt5: {},
    leftMtp1: {}, leftMtp2: {}, leftMtp3: {}, leftMtp4: {}, leftMtp5: {},
    leftPIP2: {}, leftPIP3: {}, leftPIP4: {}, leftPIP5: {},
    leftDIP2: {}, leftDIP3: {}, leftDIP4: {}, leftDIP5: {},
    leftIP1: {},
    
  });

  const rightJoints = [
    { key: "rightTmt1", label: "I", top: "41%", left: "40.5%" },
    { key: "rightTmt2", label: "II", top: "39%", left: "37.2%" },
    { key: "rightTmt3", label: "III", top: "39%", left: "34.2%" },
    { key: "rightTmt4", label: "IV", top: "34%", left: "31.7%" },
    { key: "rightTmt5", label: "V", top: "30%", left: "29%" },

    { key: "rightMtp1", label: "I", top: "71%", left: "43%" },
    { key: "rightMtp2", label: "II", top: "72%", left: "38%" },
    { key: "rightMtp3", label: "III", top: "72%", left: "35%" },
    { key: "rightMtp4", label: "IV", top: "69%", left: "32.5%" },
    { key: "rightMtp5", label: "V", top: "61%", left: "29.5%" },

    { key: "rightPIP2", label: "II", top: "85.7%", left: "38%" },
    { key: "rightPIP3", label: "III", top: "84.5%", left: "35%" },
    { key: "rightPIP4", label: "IV", top: "80%", left: "32%" },
    { key: "rightPIP5", label: "V", top: "71%", left: "29.5%" },

    { key: "rightDIP2", label: "II", top: "92%", left: "38%" },
    { key: "rightDIP3", label: "III", top: "91%", left: "35%" },
    { key: "rightDIP4", label: "IV", top: "87%", left: "32%" },
    { key: "rightDIP5", label: "V", top: "78%", left: "29.3%" },

    { key: "rightIP1", label: "I", top: "86%", left: "42%" },
    
  ];

  // левые зеркально
  const leftJoints = rightJoints
    .filter(j => j.key !== "rightAnkle")
    .map(j => {
      const leftNum = parseFloat(j.left); // превращаем "40.5%" → 40.5
      return {
        key: j.key.replace("right", "left"),
        label: j.label,
        top: j.top,
        left: `${100 - leftNum}%`, // зеркально
      };
  });

  const jointMap = [...rightJoints, ...leftJoints];

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

        {/* Фон со стопами */}
        <div className="w-full h-full relative" style={{
          backgroundImage: `url(/images/foot-right1.png), url(/images/foot-left1.png)`,
          backgroundPosition: "30% 95%, 70% 95%",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "25% auto, 25% auto",
        }}>
          {/* Кнопки суставов */}
          {jointMap.map(j => {
            const joint = selectedOptions[j.key];
            const isSelected = joint && joint[activeDegree];
            const isTmt = j.key.includes("Tmt");
            const isAnkle = j.key.includes("Ankle");
            return (
              <div
                key={j.key}
                className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200
                  w-[35px] h-[35px]
                  ${isSelected ? "bg-yellow-200/30 border-yellow-400" : "bg-transparent border-yellow-500"}`}
                style={{ top: j.top, left: j.left, transform: "translate(-50%, -50%)" }}
                onClick={() => toggleJoint(j.key)}
              >
                <span className="text-[8px] font-medium text-black">
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
                    insertText = "Суставные щели мелких суставов стоп сохранены, равномерные.";
                  } else {
                    insertText = generateDescriptionUniversalCombined({
                      jointMap,
                      selectedOptions,
                      type: "foot",
                      mode: "gaps",
                    });
                  }

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