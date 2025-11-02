// Frontend/src/components/hipjoints/FlebolytesSection.jsx
import React from "react";

export default function FlebolytesSection({ textareaRef, insertTextToTextarea }) { // 1. Принимаем пропс
  const insertText = () => {
    // Ваша логика формирования текста остается без изменений
    const textToInsert = "\nВ проекции полости малого таза определяются единичные тени флеболитов.";
    
    // 2. Используем пропс для вставки
    insertTextToTextarea(textToInsert);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div>
      <div
        className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
        onClick={insertText}
      >
        <span>Флеболиты</span>
      </div>
    </div>
  );
}