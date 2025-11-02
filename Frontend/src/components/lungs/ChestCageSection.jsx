import { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";
import RibsModal from "./RibsModal";

export default function ChestCageSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [showRibsModal, setShowRibsModal] = useState(false);

  const chestCageOptions = [
    "Норма",
    "Патология"
  ];

  const handleClick = (option) => {
    if (option === "Патология") {
      setShowRibsModal(true);
    } else {
      insertTextToTextarea("\nЦелостность костей грудной клетки не нарушена.");
      setExpandedPlaque(null);
    }
  };

  return (
    <>
      <div className="ml-6 mt-1 space-y-1">
        {chestCageOptions.map((option, idx) => (
          <PlaqueButton
            key={idx}
            label={option}
            onClick={() => handleClick(option)}
            hasChildren={false}
          />
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
