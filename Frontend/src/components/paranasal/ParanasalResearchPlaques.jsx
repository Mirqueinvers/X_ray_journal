import ResearchPlaques from "../general/ResearchPlaques";
import NasalPassagesSection from "./NasalPassagesSection";
import NasalSeptumSection from "./NasalSeptumSection";

export default function ParanasalResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Пазухи", type: "modal", modalName: "SinusesModal" },
    { label: "Носовые ходы", type: "expandable", component: NasalPassagesSection },
    { label: "Носовая перегородка", type: "expandable", component: NasalSeptumSection },
    {
      label: "Норма",
      type: "text",
      defaultText: [
        "Лобные и гайморовы пазухи прозрачные, их контуры четкие ровные, слизистая не утолщена, пневматизация не изменена, патологических теней в проекции пазух не визуализируется.",
        "Носовые ходы свободны.",
        "Носовая перегородка не искривлена."
      ].join("\n"),
    },
    { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
  ];

  return (
    <ResearchPlaques
      plaques={plaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
