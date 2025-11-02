import { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";
import PleuraExpansionModal from "./PleuraExpansionModal";

export default function PleuraSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showExpansionModal, setShowExpansionModal] = useState(false);

  const pleuraOptions = [
    { label: "Без особенностей", text: "куполообразной формы, расположена обычно" },
    { label: "Патология", text: null } // Текст вставляется через модальное окно
  ];

  const handleOptionClick = (option) => {
    if (option.label === "Патология") {
      setShowExpansionModal(true);
    } else {
      insertTextToTextarea("\n" + `Плевра ${option.text}.`);
      setExpandedPlaque(null);
    }
  };

  return (
    <>
      <div className="ml-6 mt-1 space-y-1">
        {pleuraOptions.map((option, idx) => (
          <PlaqueButton
            key={idx}
            label={option.label}
            onClick={() => handleOptionClick(option)}
            hasChildren={false}
          />
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
