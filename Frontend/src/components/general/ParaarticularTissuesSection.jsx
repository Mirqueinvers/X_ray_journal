import React from "react";

export default function ParaarticularTissuesSection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  // Варианты параартикулярных тканей
  const paraarticularOptions = [
    "Без изменений",
    "Изменения",
  ];

  // --- ИЗМЕНЕННЯ ФУНКЦИЯ ---
  const insertParaarticularText = (option) => {
    let fullText = "";
    if (option === "Без изменений") {
      fullText = "\nПараартикулярные ткани не имеют рентгено-позитивных признаков изменений.";
    } else if (option === "Изменения") {
      fullText = "\nОпределяются образования костной плотности в параартикулярных тканях.";
    }

    // 2. Вызываем пропс для вставки
    insertTextToTextarea(fullText);

    // сворачиваем плашку
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {paraarticularOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertParaarticularText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
