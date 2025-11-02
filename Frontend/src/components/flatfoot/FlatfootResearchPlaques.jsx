import ResearchPlaques from "../general/ResearchPlaques";

export default function FlatfootResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const flatfootPlaques = [
    {
      label: "Норма",
      type: "text",
      defaultText: "Признаков плоскостопия не выявлено. Форма стоп нормальная, своды сохранены.",
    },
    {
      label: "Плоскостопие",
      type: "modal",
      modalName: "FlatfootModal",
    },
    {
      label: "Диагноз",
      type: "modal",
      modalName: "DiagnosisModal",
    }
  ];

  return (
    <ResearchPlaques
      plaques={flatfootPlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
