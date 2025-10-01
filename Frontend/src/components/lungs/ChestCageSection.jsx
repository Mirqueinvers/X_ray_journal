// Frontend/src/components/lungs/ChestCageSection.jsx
import { useState } from "react";
import RibsModal from "./RibsModal";

export default function ChestCageSection({ textareaRef, setExpandedPlaque }) {
  const [showRibsModal, setShowRibsModal] = useState(false);

  const chestCageOptions = [
    "Норма",
    "Патология"
  ];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current 
        ? current + "\n" + text 
        : text;
      
      // Вызываем событие input для React
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

  return (
    <>
      <div className="ml-4 space-y-1">
        {chestCageOptions.map((option, index) => (
          <div
            key={index}
            className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (option === "Патология") {
                setShowRibsModal(true);
              } else {
                insertTextToTextarea("Целостность костей грудной клетки не нарушена.");
                setExpandedPlaque(null);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {showRibsModal && (
        <RibsModal
          onClose={() => setShowRibsModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </>
  );
}