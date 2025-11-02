// Frontend/src/components/hand/HandCongruencyModal.jsx
import React, { useState } from "react";
import { generateDescriptionUniversalCongruence } from "../generateDescription/HandFoot/generateDescriptionCongruence";

export default function HandCongruencyModal({ isOpen, onClose, insertTextToTextarea }) {
  const [mode, setMode] = useState("Не нарушена"); // новая плашка активна по дефолту

  const [selectedOptions, setSelectedOptions] = useState({
    // Правая кисть
    rightCmc1: {}, rightCmc2: {}, rightCmc3: {}, rightCmc4: {}, rightCmc5: {},
    rightMcp1: {}, rightMcp2: {}, rightMcp3: {}, rightMcp4: {}, rightMcp5: {},
    rightPip2: {}, rightPip3: {}, rightPip4: {}, rightPip5: {},
    rightDip2: {}, rightDip3: {}, rightDip4: {}, rightDip5: {},
    rightIp1: {}, rightWrist: {},

    // Левая кисть
    leftCmc1: {}, leftCmc2: {}, leftCmc3: {}, leftCmc4: {}, leftCmc5: {},
    leftMcp1: {}, leftMcp2: {}, leftMcp3: {}, leftMcp4: {}, leftMcp5: {},
    leftPip2: {}, leftPip3: {}, leftPip4: {}, leftPip5: {},
    leftDip2: {}, leftDip3: {}, leftDip4: {}, leftDip5: {},
    leftIp1: {}, leftWrist: {},
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
    // Если выбрали сустав — автоматически переключаем в "Нарушена"
    if (mode === "Не нарушена") setMode("Нарушена");

    setSelectedOptions((prev) => {
      const joint = prev[key] || {};
      const newJoint = { ...joint };
      newJoint.конгруэнтность = !newJoint.конгруэнтность;
      return { ...prev, [key]: newJoint };
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          ✖
        </button>

        {/* Плашка "Не нарушена" */}
        <div className="absolute top-4 left-4 z-20">
          <button
            className={`px-4 py-2 rounded font-medium transition-colors ${
              mode === "Не нарушена"
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
            onClick={() => {
              if (mode === "Не нарушена") return;
              setMode("Не нарушена");
              // очищаем суставы
              const cleared = {};
              Object.keys(selectedOptions).forEach((k) => (cleared[k] = {}));
              setSelectedOptions(cleared);
            }}
          >
            Не нарушена
          </button>
        </div>


        {/* Фон и суставы */}
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(/images/hand-left.png), url(/images/hand-right.png)`,
              backgroundPosition: "15% center, 85% center",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundSize: "contain, contain",
            }}
          ></div>

          {jointMap.map((j) => {
            const joint = selectedOptions[j.key];
            const isSelected = joint && joint.конгруэнтность;
            const isCmc = j.key.includes("Cmc");
            const isWrist = j.key.includes("Wrist");
            return (
              <div
                key={j.key}
                className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200 z-10
                  ${
                    isWrist
                      ? "w-[150px] h-[50px]"
                      : isCmc
                      ? "w-[35px] h-[35px]"
                      : "w-[50px] h-[50px]"
                  }
                  ${
                    isSelected
                      ? "bg-yellow-200/30 border-yellow-400"
                      : "bg-transparent border-yellow-500"
                  }`}
                style={{ top: j.top, left: j.left, transform: "translate(-50%, -50%)" }}
                onClick={() => toggleJoint(j.key)}
              >
                <span
                  className={`${
                    isWrist
                      ? "text-[10px]"
                      : isCmc
                      ? "text-[8px]"
                      : "text-xs"
                  } font-medium text-black`}
                >
                  {j.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Кнопка "Добавить" */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={() => {
              // --- ИЗМЕНЕННАЯ ЛОГИКА ВСТАВКИ ---
              // Используем вашу локальную функцию для генерации текста
              const generatedText = generateDescriptionUniversalCongruence({
                  jointMap,
                  selectedOptions,
                  type: "hand", // или "foot"
                });

              // Добавляем перенос строки для лучшего форматирования
              const finalText = `\n${generatedText}`;

              // Используем пропс для вставки
              insertTextToTextarea(finalText);
              // --- КОНЕЦ ИЗМЕНЕНИЙ ---

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
