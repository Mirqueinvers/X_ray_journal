// Frontend/src/components/knees/JointSurfaceModal.jsx
import React, { useState } from "react";
import KneeModalBase, { KNEE_ZONES } from "./KneeModalBase.jsx";

import { generateDescriptionKneeGapSurface } from "../generateDescription/Knees/generateDescriptionKneeGapSurface.js";

export default function JointSurfaceModal({
  isOpen,
  onClose,
  insertTextToTextarea,
  hasEndoprosthesis = false
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    rightMedial: [],
    rightLateral: [],
    leftMedial: [],
    leftLateral: [],
  });

  const conditionOptions = [
    "поверхность гладкая",
    "незначительные изменения",
    "умеренные изменения",
    "выраженные изменения",
    "резкие изменения",
  ];

  return (
    <KneeModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Изменения суставных поверхностей"
      insertTextToTextarea={insertTextToTextarea}
      generateDescription={({ selectedOptions, predominantlyByZone, hasEndoprosthesis }) =>
        generateDescriptionKneeGapSurface({
          mode: "surfaces",
          selectedOptions,
          hasEndoprosthesis,
          predominantlyByZone
        })
      }
      hasEndoprosthesis={hasEndoprosthesis}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      options={conditionOptions}
      isMultiSelect={false}
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
          onClick={() => {/* handleZoneClick будет вызван из базового компонента */}}
        >
          <span className="text-white text-xs font-medium text-center">{zone.name}</span>
        </div>
      ))}
    </KneeModalBase>
  );
}