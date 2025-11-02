import { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";
import HilaExpansionModal from "./HilaExpansionModal";

export default function HilaSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);

  const hilaOptions = [
    "Не расширены",
    "Расширены"
  ];

  const handleOptionClick = (option) => {
    if (option === "Расширены") {
      setShowExpansionModal(true);
    } else {
      insertTextToTextarea("\n" + `Корни легких ${option.toLowerCase()}, структурные.`);
      setExpandedPlaque(null);
    }
  };

  return (
    <>
      <div className="ml-6 mt-1 space-y-1">
        {hilaOptions.map((option, idx) => (
          <PlaqueButton
            key={idx}
            label={option}
            onClick={() => handleOptionClick(option)}
            hasChildren={false}
          />
        ))}
      </div>

      {showExpansionModal && (
        <HilaExpansionModal
          onClose={() => setShowExpansionModal(false)}
          insertTextToTextarea={insertTextToTextarea}
        />
      )}
    </>
  );
}
