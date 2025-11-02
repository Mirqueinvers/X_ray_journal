import React from "react";

export default function CongruencySection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  // Варианты конгруэнтности
  const congruencyOptions = [
    "не нарушена",
    "нарушена в левом",
    "нарушена в правом",
  ];

  // --- ИЗМЕНЕННЯ ФУНКЦИЯ ---
  const insertCongruencyText = (option) => {
    const fullText = `\nКонгруэнтность суставных поверхностей ${option.toLowerCase()}.`;

    // 2. Вызываем пропс для вставки
    insertTextToTextarea(fullText);
    
    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {congruencyOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertCongruencyText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}