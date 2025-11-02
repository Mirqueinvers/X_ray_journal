// Frontend/src/components/lungs/VesselsSection.jsx
import { useState } from "react";

export default function VesselsSection({ insertTextToTextarea, setExpandedPlaque }) {
  const [selectedVessel, setSelectedVessel] = useState(null);

  const vesselsOptions = [
    "не изменен",
    "усилен",
    "деформирован"
  ];

  return (
    <div className="ml-4 space-y-1">
      {vesselsOptions.map((option, index) => (
        <div
          key={index}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedVessel(option);
            insertTextToTextarea("\n" + `Сосудистый рисунок ${option}.`);
            setExpandedPlaque(null);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}