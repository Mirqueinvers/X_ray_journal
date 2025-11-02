import ResearchPlaques from "../general/ResearchPlaques";
import FootIntegritySection from "../general/IntegritySection";
import FootParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

const footPlaques = [
  { label: "Суставные щели", type: "modal", modalName: "FootJointSpaceModal" },
  { label: "Суставные поверхности", type: "modal", modalName: "FootJointSurfaceModal" },
  { label: "Остеофиты", type: "modal", modalName: "FootOsteophytesModal" },
  { label: "Конгруэнтность", type: "modal", modalName: "FootCongruencyModal" },
  { label: "Целостность", type: "expandable", component: FootIntegritySection },
  { label: "Параартикулярные ткани", type: "expandable", component: FootParaarticularTissuesSection },
  {
    label: "Норма",
    type: "text",
    defaultText: [
      "Суставные щели стоп сохранены, равномерные.",
      "Суставные поверхности ровные, чёткие, без признаков деформации.",
      "Конгруэнтность суставных поверхностей не нарушена.",
      "Костно-травматических и костно-деструктивных изменений не выявлено.",
      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений."
    ].join("\n")
  },
  { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
];

export default function FootResearch({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea
}) {
  return (
    <ResearchPlaques
      plaques={footPlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
