import React, { useState } from "react";
import PlaqueButton from "../ui/PlaqueButton";

export default function NasalPassagesSection({ setExpandedPlaque, insertTextToTextarea }) {
  const nasalPassagesOptions = [
    "Свободны",
    "Сужены",
    "Отечные",
    "Содержат патологическое содержимое",
    "Носовые ходы без особенностей",
  ];

  const [expandedOption, setExpandedOption] = useState(null);

  const insertNasalPassagesText = (option) => {
    insertTextToTextarea(`\nНосовые ходы ${option.toLowerCase()}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {nasalPassagesOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertNasalPassagesText(option)}
          isExpanded={false}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
