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
      modalName: "BoneAgeModal", // без параметра = male по умолчанию
    },
    {
      label: "Девочка",
      type: "modal",
      modalName: "BoneAgeModal:female", // с параметром female
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