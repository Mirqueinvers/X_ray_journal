import React from "react";
import PlaqueButton from "../ui/PlaqueButton";

export default function NasalSeptumSection({ insertTextToTextarea, setExpandedPlaque }) {
  const nasalSeptumOptions = [
    "Не искривлена",
    "Искривлена влево",
    "Искривлена вправо",
    "S-образно искривлена",
    "Искривлена в костном отделе",
    "Искривлена в хрящевом отделе",
    "Гипертрофия носовых раковин",
  ];

  const insertNasalSeptumText = (option) => {
    insertTextToTextarea(`\nНосовая перегородка ${option.toLowerCase()}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {nasalSeptumOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertNasalSeptumText(option)}
          isExpanded={false}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
