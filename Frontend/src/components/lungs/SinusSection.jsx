import { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";
import SinusExpansionModal from "./SinusExpansionModal";

export default function SinusSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);

  const sinusOptions = [
    { label: "Свободны", text: "свободны" },
    { label: "Патология", text: null } // текст вставляется через модальное окно
  ];

  const handleOptionClick = (option) => {
    if (option.label === "Патология") {
      setShowExpansionModal(true);
    } else {
      insertTextToTextarea("\n" + `Синусы плевры ${option.text}.`);
      setExpandedPlaque(null);
    }
  };

  return (
    <>
      <div className="ml-6 mt-1 space-y-1">
        {sinusOptions.map((option, idx) => (
          <PlaqueButton
            key={idx}
            label={option.label}
            onClick={() => handleOptionClick(option)}
            hasChildren={false}
          />
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
