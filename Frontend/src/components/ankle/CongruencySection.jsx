import React from "react";

export default function CongruencySection({ textareaRef, setExpandedPlaque }) {
  const congruencyOptions = [
    "не нарушена",
    "нарушена в левом голеностопном суставе",
    "нарушена в правом голеностопном суставе",
  ];

  const insertCongruencyText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const fullText = `Конгруэнтность суставных поверхностей ${option.toLowerCase()}.`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Вставляем с новой строки, если перед курсором нет перевода строки
    const needsNewlineBefore = start > 0 && text[start - 1] !== "\n";
    const prefix = needsNewlineBefore ? "\n" : "";

    const newText =
      text.substring(0, start) + prefix + fullText + text.substring(end);

    textarea.value = newText;

    const newCursorPosition = start + prefix.length + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    textarea.dispatchEvent(new Event("input", { bubbles: true }));

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
