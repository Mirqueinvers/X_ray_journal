import ResearchPlaques from "../general/ResearchPlaques";

export default function CalcaneusResearchPlaques({
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    {
      label: "Остеофиты",
      type: "modal",
      modalName: "CalcaneusOsteophytesModal",
    },
    {
      label: "Норма",
      type: "text",
      defaultText: [
        "Остеофиты пяточных костей не выявлены.",
        "Форма костей не изменена, структура однородная.",
        "Костно-травматических и костно-деструктивных изменений не выявлено."
      ].join("\n"),
    },
    {
      label: "Диагноз",
      type: "modal",
      modalName: "DiagnosisModal",
    }
  ];

  return (
    <ResearchPlaques
      plaques={plaques}
      expandedPlaque={null} 
      setExpandedPlaque={() => {}}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
