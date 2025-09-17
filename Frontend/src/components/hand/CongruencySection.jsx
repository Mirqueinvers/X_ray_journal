import React from "react";

export default function CongruencySection({ textareaRef, setExpandedPlaque }) {
  // Варианты конгруэнтности
  const congruencyOptions = [
    "не нарушена",
    "нарушена в левом тазобедренном суставе",
    "нарушена в правом тазобедренном суставе",
  ];

  // Вставка текста в textarea
  const insertCongruencyText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const fullText = `Конгруэнтность суставных поверхностей ${option.toLowerCase()}.\n`;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText = text.substring(0, start) + fullText + text.substring(end);
    textarea.value = newText;

    const newCursorPosition = start + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);
    
    // Добавляем вызов для сворачивания плашки
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {congruencyOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertCongruencyText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}