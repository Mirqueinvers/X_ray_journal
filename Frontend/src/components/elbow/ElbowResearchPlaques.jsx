import ResearchPlaques from "../general/ResearchPlaques";
import ElbowCongruencySection from "../general/CongruencySection";
import ElbowIntegritySection from "../general/IntegritySection";
import ElbowParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function ElbowResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Суставные щели", type: "modal", modalName: "ElbowJoinSpaceModal" },
    { label: "Суставные поверхности", type: "modal", modalName: "ElbowJointSurfaceModal" },
    { label: "Остеофиты", type: "modal", modalName: "ElbowOsteophytesModal" },
    { label: "Конгруэнтность", type: "expandable", component: ElbowCongruencySection },
    { label: "Целостность", type: "expandable", component: ElbowIntegritySection },
    { label: "Параартикулярные ткани", type: "expandable", component: ElbowParaarticularTissuesSection },
    {
      label: "Норма",
      type: "text",
      defaultText: [
        "Суставные щели локтевых суставов сохранены, равномерные.",
        "Суставные поверхности ровные, чёткие, без признаков деформации.",
        "Конгруэнтность суставных поверхностей не нарушена.",
        "Костно-травматических и костно-деструктивных изменений не выявлено.",
        "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений."
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
