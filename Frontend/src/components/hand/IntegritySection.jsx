import React from "react";

export default function IntegritySection({ textareaRef, setExpandedPlaque }) {
  // Варианты целостности суставных поверхностей
  const integrityOptions = [
    "Не нарушена",
    "Нарушена",
  ];

  // Вставка текста в textarea
  const insertIntegrityText = (option) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  let fullText = "";
  if (option === "Не нарушена") {
    fullText = "Костно-травматических и костно-деструктивных изменений не выявлено.";
  } else if (option === "Нарушена") {
    fullText = "Определяется нарушение целостности костной ткани в";
  }

  // добавляем перенос строки перед текстом, если курсор не в начале или textarea не пустая
  const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
  if (textBeforeCursor.length > 0 && !textBeforeCursor.endsWith("\n")) {
    fullText = "\n" + fullText;
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