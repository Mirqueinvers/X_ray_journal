// Frontend/src/components/lungs/MediastinumSection.jsx
import { useState } from "react";

export default function MediastinumSection({ textareaRef, setExpandedPlaque }) {
  const mediastinumOptions = [
    { label: "Не расширено", text: "не расширена" },
    { label: "Расширено в правых отделах", text: "расширена в правых отделах" },
    { label: "Расширено в левых отделах", text: "расширена в левых отделах" },
    { label: "Расширено верхнее средостение", text: "расширена в верхних отделах" }
  ];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current
        ? current + "\n" + text
        : text;

      // триггерим событие input для React
      const event = new Event("input", { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  const handleOptionClick = (option) => {
    insertTextToTextarea(`Тень средостения ${option.text}.`);
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
          {option.label}
        </div>
      ))}
    </div>
  );
}
