// Frontend/src/components/knees/JointSpaceModal.jsx
import React, { useState } from "react";
import KneeModalBase, { KNEE_ZONES } from "./KneeModalBase.jsx";
import { generateDescriptionKneeGapSurface } from "../generateDescription/Knees/generateDescriptionKneeGapSurface.js";

export default function JointSpaceModal({
  isOpen,
  onClose,
  insertTextToTextarea,
  hasEndoprosthesis = false
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    leftMedial: [],
    leftLateral: [],
    rightMedial: [],
    rightLateral: [],
  });

  const degreeOptions = [
    "равномерной высоты",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  return (
    <KneeModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Сужение суставных щелей"
      insertTextToTextarea={insertTextToTextarea}
      generateDescription={({ selectedOptions, predominantlyByZone, hasEndoprosthesis }) =>
        generateDescriptionKneeGapSurface({
          mode: "gaps",
          selectedOptions,
          hasEndoprosthesis,
          predominantlyByZone
        })
      }
      hasEndoprosthesis={hasEndoprosthesis}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      options={degreeOptions}
      customProperty="toggleOption"
    >
      {KNEE_ZONES.map(zone => (
        <div
          key={zone.key}
          className={`absolute w-[100px] h-[150px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
            selectedOptions[zone.key]?.length > 0
              ? "bg-yellow-200/30 border-yellow-400"
              : "border-yellow-500 bg-transparent"
          }`}
          style={zone.position}
          onClick={() => { /* handleZoneClick будет вызван из базового компонента */ }}
        >
          <span className="text-white text-xs font-medium text-center">{zone.name}</span>
        </div>
      ))}
    </KneeModalBase>
  );
}