import ResearchPlaques from "../general/ResearchPlaques";
import HandIntegritySection from "../general/IntegritySection";
import HandParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

const handPlaques = [
  { label: "Суставные щели", type: "modal", modalName: "HandJointSpaceModal" },
  { label: "Суставные поверхности", type: "modal", modalName: "HandJointSurfaceModal" },
  { label: "Остеофиты", type: "modal", modalName: "HandOsteophytesModal" },
  { label: "Конгруэнтность", type: "modal", modalName: "HandCongruencyModal" },
  { label: "Целостность", type: "expandable", component: HandIntegritySection },
  { label: "Параартикулярные ткани", type: "expandable", component: HandParaarticularTissuesSection },
  {
    label: "Норма",
    type: "text",
    defaultText: [
      "Суставные щели мелких суставов кистей сохранены, равномерные.",
      "Суставные поверхности ровные, чёткие, без признаков деформации.",
      "Конгруэнтность суставных поверхностей не нарушена.",
      "Костно-травматических и костно-деструктивных изменений не выявлено.",
      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений."
    ].join("\n")
  },
  { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
];

export default function HandResearch({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea
}) {
  return (
    <ResearchPlaques
      plaques={handPlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
