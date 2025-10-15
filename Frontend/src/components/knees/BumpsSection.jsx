import React from "react";

export default function BumpsSection({ textareaRef, setExpandedPlaque }) {
  // Варианты формы бугорков
  const shapeOptions = [
    "не изменены",
    "заострены",
    "уплощены",
    "заострены справа",
    "заострены слева",
    "уплощены справа",
    "уплощены слева",
  ];

  // Вставка текста в textarea
  const insertShapeText = (shape) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const fullText = `Бугорки межмыщелковых возвышений ${shape}.`;

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
      {shapeOptions.map((shape, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertShapeText(shape);
          }}
        >
          {shape}
        </div>
      ))}
    </div>
  );
}
