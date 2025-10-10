import React from "react";

export default function IntegritySection({ textareaRef, setExpandedPlaque }) {
  const integrityOptions = ["Не нарушена", "Нарушена"];

  const insertIntegrityText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Добавляем перевод строки, если перед курсором нет "\n"
    const needsNewlineBefore = start > 0 && text[start - 1] !== "\n";
    const prefix = needsNewlineBefore ? "\n" : "";

    let fullText = "";

    if (option === "Не нарушена") {
      fullText = `${prefix}Костно-травматических и костно-деструктивных изменений не выявлено.\n`;
    } else if (option === "Нарушена") {
      fullText = `${prefix}Определяется нарушение целостности костной ткани в `;
    }

    const newText = text.substring(0, start) + fullText + text.substring(end);
    textarea.value = newText;

    const newCursorPosition = start + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {integrityOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertIntegrityText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
