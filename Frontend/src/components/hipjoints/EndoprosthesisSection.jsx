import React from "react";
import PlaqueButton from "../ui/PlaqueButton";

export default function EndoprosthesisSection({ setExpandedPlaque, insertTextToTextarea }) {
  const endoprosthesisOptions = [
    "левого тазобедренного сустава",
    "правого тазобедренного сустава",
  ];

  const insertEndoprosthesisText = (option) => {
    const fullText = `\nОпределяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;
    insertTextToTextarea(fullText);
    setExpandedPlaque(null); // сворачиваем блок после выбора
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
