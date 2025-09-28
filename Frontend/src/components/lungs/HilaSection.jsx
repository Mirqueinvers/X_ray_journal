// Frontend/src/components/lungs/HilaSection.jsx
import { useState } from "react";
import HilaExpansionModal from "./HilaExpansionModal";

export default function HilaSection({ textareaRef, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [selectedHila, setSelectedHila] = useState(null);

  const hilaOptions = [
    "Не расширены",
    "Расширены"
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
        {hilaOptions.map((option, index) => (
          <div
            key={index}
            className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (option === "Расширены") {
                setShowExpansionModal(true);
              } else {
                setSelectedHila(option);
                insertTextToTextarea(`Корни легких ${option.toLowerCase()}, структурные.`);
                setExpandedPlaque(null);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {showExpansionModal && (
        <HilaExpansionModal
          onClose={() => setShowExpansionModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </>
  );
}