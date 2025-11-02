import React from "react";
import PlaqueButton from "../ui/PlaqueButton";

export default function EndoprosthesisSection({ setExpandedPlaque, insertTextToTextarea }) {
  const endoprosthesisOptions = [
    "левого коленного сустава",
    "правого коленного сустава",
    "обоих коленных суставов",
  ];

  const insertEndoprosthesisText = (option) => {
    let fullText = "";

    if (option === "обоих коленных суставов") {
      fullText = "Определяются эндопротезы обоих коленных суставов при удовлетворительном стоянии металлоконструкций.";
    } else {
      fullText = `Определяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;
    }

    insertTextToTextarea("\n" + fullText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {endoprosthesisOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertEndoprosthesisText(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
