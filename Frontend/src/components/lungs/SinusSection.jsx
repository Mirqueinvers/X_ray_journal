// Frontend/src/components/lungs/SinusSection.jsx
import { useState } from "react";
import SinusExpansionModal from "./SinusExpansionModal";

export default function SinusSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [selectedSinus, setSelectedSinus] = useState(null);

  const sinusOptions = [
    "Свободны",
    "Патология"
  ];

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
                insertTextToTextarea("\n" + `Синусы плевры ${option.toLowerCase()}.`);
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
          insertTextToTextarea={insertTextToTextarea}
        />
      )}
    </>
  );
}