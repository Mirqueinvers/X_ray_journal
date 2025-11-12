import ResearchPlaques from "../general/ResearchPlaques";
import AnkleCongruencySection from "../general/CongruencySection";
import AnkleIntegritySection from "../general/IntegritySection";
import AnkleParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function AnkleResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Суставные щели", type: "modal", modalName: "AnkleJoinSpaceModal" },
    { label: "Суставные поверхности", type: "modal", modalName: "AnkleJointSurfaceModal" },
    { label: "Остеофиты", type: "modal", modalName: "AnkleOsteophytesModal" },
    { label: "Конгруэнтность", type: "expandable", component: AnkleCongruencySection },
    { label: "Целостность", type: "expandable", component: AnkleIntegritySection },
    { label: "Параартикулярные ткани", type: "expandable", component: AnkleParaarticularTissuesSection },
    { label: "Норма", 
      type: "text", 
      defaultText: [
        "Суставные щели голеностопных суставов сохранены, равномерные.",
        "Суставные поверхности ровные, чёткие, без признаков деформации.",
        "Конгруэнтность суставных поверхностей не нарушена.",
        "Костно-травматических и костно-деструктивных изменений не выявлено.",
        "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
      ].join("\n") 
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
