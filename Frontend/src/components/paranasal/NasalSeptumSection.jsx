import React from "react";

export default function NasalSeptumSection({ insertTextToTextarea, setExpandedPlaque }) {
  // Варианты состояния носовой перегородки
  const nasalSeptumOptions = [
    "Не искривлена",
    "Искривлена влево",
    "Искривлена вправо",
    "S-образно искривлена",
    "Искривлена в костном отделе",
    "Искривлена в хрящевом отделе",
    "Гипертрофия носовых раковин",
  ];

  // --- ИЗMЕНЕННЯ ФУНКЦИЯ ---
  const insertNasalSeptumText = (option) => {
    // Ваша логика формирования текста остается без изменений
    const fullText = `\nНосовая перегородка ${option.toLowerCase()}.`;

    // 2. Используем пропс для вставки
    insertTextToTextarea(fullText);
    
    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {nasalSeptumOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertNasalSeptumText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}