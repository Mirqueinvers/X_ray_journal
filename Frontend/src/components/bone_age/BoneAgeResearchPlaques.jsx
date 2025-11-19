// Frontend/src/components/researchPlaques/BoneAgeResearchPlaques.jsx
import React from "react";
import ResearchPlaques from "../general/ResearchPlaques";

export default function BoneAgeResearchPlaques({
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    {
      label: "Мальчик",
      type: "modal",
      modalName: "ChronologicalAgeModal:male", // изменено на ChronologicalAgeModal
    },
    {
      label: "Девочка", 
      type: "modal",
      modalName: "ChronologicalAgeModal:female", // изменено на ChronologicalAgeModal
    },
  ];

  return (
    <ResearchPlaques
      plaques={plaques}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}