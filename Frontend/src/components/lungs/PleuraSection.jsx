// Frontend/src/components/lungs/PleuraSection.jsx
import { useState } from "react";
import PleuraExpansionModal from "./PleuraExpansionModal";

export default function PleuraSection({ textareaRef, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [selectedPleura, setSelectedPleura] = useState(null);

  const pleuraOptions = [
    "Без особенностей",
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
        {pleuraOptions.map((option, index) => (
          <div
            key={index}
            className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (option === "Патология") {
                setShowExpansionModal(true);
              } else {
                setSelectedPleura(option);
                insertTextToTextarea(`Плевра куполообразной формы, расположена обычно.`);
                setExpandedPlaque(null);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {showExpansionModal && (
        <PleuraExpansionModal
          onClose={() => setShowExpansionModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </>
  );
}