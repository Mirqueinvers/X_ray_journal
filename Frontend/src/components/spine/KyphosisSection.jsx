// Frontend/src/components/spine/KyphosisSection.jsx
import React from "react";

export default function KyphosisSection({ insertTextToTextarea, setExpandedPlaque }) {
  const options = ["не изменен", "увеличен", "сглажен"];

  const insertText = (option) => {
    // Ваша логика формирования текста остается без изменений
    const fullText = `Кифоз грудного отдела позвоночника ${option}.\n`;

    // Используем пропс для вставки
    insertTextToTextarea(fullText);
    
    // Сворачиваем плашку
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {options.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}