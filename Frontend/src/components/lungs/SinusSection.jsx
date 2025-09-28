// Frontend/src/components/lungs/SinusSection.jsx
import { useState } from "react";
import SinusExpansionModal from "./SinusExpansionModal";

export default function SinusSection({ textareaRef, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [selectedSinus, setSelectedSinus] = useState(null);

  const sinusOptions = [
    "Свободны",
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
        {sinusOptions.map((option, index) => (
          <div
            key={index}
            className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (option === "Патология") {
                setShowExpansionModal(true);
              } else {
                setSelectedSinus(option);
                insertTextToTextarea(`Синусы плевры ${option.toLowerCase()}.`);
                setExpandedPlaque(null);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {showExpansionModal && (
        <SinusExpansionModal
          onClose={() => setShowExpansionModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </>
  );
}