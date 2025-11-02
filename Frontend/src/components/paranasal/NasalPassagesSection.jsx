import React from "react";

export default function NasalPassagesSection({ setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  const nasalPassagesOptions = [
    "свободны",
    "сужены",
    "отечные",
    "содержат патологическое содержимое",
    "ушные ходы без особенностей",
  ];

  // --- ИЗMЕНЕННЯ ФУНКЦИЯ ---
  const insertNasalPassagesText = (option) => {
    // Ваша логика формирования текста остается без изменений
    const fullText = `\nНосовые ходы ${option.toLowerCase()}.`;

    // 2. Используем пропс для вставки
    insertTextToTextarea(fullText);
    
    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {nasalPassagesOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertNasalPassagesText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}