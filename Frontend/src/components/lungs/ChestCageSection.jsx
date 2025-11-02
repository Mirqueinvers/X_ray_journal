// Frontend/src/components/lungs/ChestCageSection.jsx
import { useState } from "react";
import RibsModal from "./RibsModal";

export default function ChestCageSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showRibsModal, setShowRibsModal] = useState(false);

  const chestCageOptions = [
    "Норма",
    "Патология"
  ];

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
                insertTextToTextarea("\n" + "Целостность костей грудной клетки не нарушена.");
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
          insertTextToTextarea={insertTextToTextarea}
        />
      )}
    </>
  );
}