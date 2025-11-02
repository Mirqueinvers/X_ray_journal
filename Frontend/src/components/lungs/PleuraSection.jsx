// Frontend/src/components/lungs/PleuraSection.jsx
import { useState } from "react";
import PleuraExpansionModal from "./PleuraExpansionModal";

export default function PleuraSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [selectedPleura, setSelectedPleura] = useState(null);

  const pleuraOptions = [
    "Без особенностей",
    "Патология"
  ];

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
                insertTextToTextarea("\n" + `Плевра куполообразной формы, расположена обычно.`);
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
          insertTextToTextarea={insertTextToTextarea}
        />
      )}
    </>
  );
}