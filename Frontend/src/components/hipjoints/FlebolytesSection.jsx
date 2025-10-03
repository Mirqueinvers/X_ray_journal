// Frontend/src/components/hipjoints/FlebolytesSection.jsx
import React from "react";

export default function FlebolytesSection({ textareaRef }) {
  const insertText = () => {
    if (textareaRef?.current) {
      const textarea = textareaRef.current;
      const textToInsert = "\nВ проекции полости малого таза определяются единичные тени флеболитов.\n";
      
      const current = textarea.value;
      textarea.value = current ? current + textToInsert : textToInsert;
      textarea.focus();
      
      const event = new Event("input", { bubbles: true });
      textarea.dispatchEvent(event);
    }
  };

  return (
    <div>
      <div
        className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
        onClick={insertText}
      >
        <span>Флеболиты</span>
      </div>
    </div>
  );
}