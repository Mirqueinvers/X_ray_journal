import React from "react";

export default function IntegritySection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  // Варианты целостности суставных поверхностей
  const integrityOptions = [
    "Не нарушена",
    "Нарушена",
  ];

  // --- ИЗМЕНЕННЯ ФУНКЦИЯ ---
  const insertIntegrityText = (option) => {
    let fullText = "";
    
    if (option === "Не нарушена") {
      fullText = "\nКостно-травматических и костно-деструктивных изменений не выявлено.";
    } else if (option === "Нарушена") {
      fullText = "Определяется нарушение целостности костной ткани в";
    }
    
    // 2. Вызываем пропс для вставки
    insertTextToTextarea(fullText);
    
    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {integrityOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertIntegrityText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}