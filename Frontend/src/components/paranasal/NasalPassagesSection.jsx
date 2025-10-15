import React from "react";

export default function NasalPassagesSection({ textareaRef, setExpandedPlaque }) {
  // Варианты состояния носовых ходов
  const nasalPassagesOptions = [
    "свободны",
    "сужены",
    "отечные",
    "содержат патологическое содержимое",
    "ушные ходы без особенностей",
  ];

  // Вставка текста в textarea
  const insertNasalPassagesText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const fullText = `\nНосовые ходы ${option.toLowerCase()}.`;

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
      {nasalPassagesOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertNasalPassagesText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}