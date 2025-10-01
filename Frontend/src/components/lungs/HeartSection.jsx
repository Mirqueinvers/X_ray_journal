// Frontend/src/components/lungs/HeartSection.jsx
import { useState } from "react";

export default function HeartSection({ textareaRef, setExpandedPlaque }) {
  const heartOptions = [
    { label: "не расширена", text: "в пределах возрастной нормы" },
    { label: "расширена слева", text: "расширена преимущественно за счет левых отделов" },
    { label: "расширена справа", text: "расширена преимущественно за счет правых отделов" },
    { label: "расширена с двух сторон", text: "расширена за счет правых и левых отделов" }
  ];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current 
        ? current + "\n" + text 
        : text;
      
      // Вызываем событие input для React
      const event = new Event("input", { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  const handleOptionClick = (option) => {
    insertTextToTextarea(`Тень сердца ${option.text}.`);
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
          {option.label}
        </div>
      ))}
    </div>
  );
}
