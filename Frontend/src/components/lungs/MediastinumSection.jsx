// Frontend/src/components/lungs/MediastinumSection.jsx
import { useState } from "react";

export default function MediastinumSection({ textareaRef, setExpandedPlaque }) {
  const mediastinumOptions = [
    "Не расширено",
    "Расширено в правых отделах",
    "Расширено в левых отделах",
    "Расширено верхнее средостение"
  ];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current 
        ? current + "\n" + text 
        : text;
      
      // Вызываем событие input для React
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  const handleOptionClick = (option) => {
    insertTextToTextarea(`Тень средостения ${option.toLowerCase()}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-4 space-y-1">
      {mediastinumOptions.map((option, index) => (
        <div
          key={index}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOptionClick(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}