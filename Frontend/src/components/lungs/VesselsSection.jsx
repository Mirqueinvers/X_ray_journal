import { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";

export default function VesselsSection({ insertTextToTextarea, setExpandedPlaque }) {
  const vesselsOptions = [
    "не изменен",
    "усилен",
    "деформирован"
  ];

  const handleOptionClick = (option) => {
    insertTextToTextarea("\n" + `Сосудистый рисунок ${option}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {vesselsOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => handleOptionClick(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
