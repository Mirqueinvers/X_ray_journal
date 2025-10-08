import React from "react";

export default function ParaarticularTissuesSection({ textareaRef, setExpandedPlaque }) {
  // Варианты параартикулярных тканей
  const paraarticularOptions = [
    "Без изменений",
    "Изменения",
  ];

  // Вставка текста в textarea
  const insertParaarticularText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    let fullText = "";
    if (option === "Без изменений") {
      fullText = "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.\n";
    } else if (option === "Изменения") {
      fullText = "Определяются образования костной плотности в параартикулярных тканях.\n";
    }

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

    // сворачиваем плашку
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {paraarticularOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertParaarticularText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
