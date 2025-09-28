// Frontend/src/components/lungs/HeartSection.jsx
import { useState } from "react";

export default function HeartSection({ textareaRef, setExpandedPlaque }) {
  const heartOptions = [
    "Не расширена",
    "расширена слева",
    "расширена справа",
    "расширена с двух сторон"
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
    insertTextToTextarea(`Сердце ${option}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-4 space-y-1">
      {heartOptions.map((option, index) => (
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