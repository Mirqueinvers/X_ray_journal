
import React from "react";

export default function EndoprosthesisSection({ textareaRef, setExpandedPlaque }) {
  // Варианты эндопротезирования коленных суставов
  const endoprosthesisOptions = [
    "левого коленного сустава",
    "правого коленного сустава",
    "обоих коленных суставов",
  ];

  // Вставка текста в textarea
  const insertEndoprosthesisText = (option) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    let fullText = "";
    
    if (option === "обоих коленных суставов") {
      fullText = "Определяются эндопротезы обоих коленных суставов при удовлетворительном стоянии металлоконструкций.\n";
    } else {
      fullText = `Определяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.\n`;
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

    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {endoprosthesisOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertEndoprosthesisText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}