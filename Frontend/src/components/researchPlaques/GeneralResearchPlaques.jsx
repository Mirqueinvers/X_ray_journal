import ResearchPlaques from "../general/ResearchPlaques";

export default function GeneralResearchPlaques(props) {
  const plaques = [
    {
      label: "Диагноз",
      type: "modal",
      modalName: "DiagnosisModal",
    },
  ];

  return <ResearchPlaques plaques={plaques} {...props} />;
}