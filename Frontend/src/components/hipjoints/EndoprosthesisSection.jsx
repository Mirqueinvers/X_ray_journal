import React from "react";

export default function EndoprosthesisSection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  const endoprosthesisOptions = [
    "левого тазобедренного сустава",
    "правого тазобедренного сустава",
  ];

  // --- ИЗМЕНЕННЯ ФУНКЦИЯ ---
  const insertEndoprosthesisText = (option) => {
    // Ваша логика формирования текста остается без изменений
    const fullText = `Определяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;

    // 2. Используем пропс для вставки
    insertTextToTextarea("\n" + fullText);

    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗMЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {endoprosthesisOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertEndoprosthesisText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
