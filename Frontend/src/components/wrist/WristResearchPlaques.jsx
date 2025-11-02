import ResearchPlaques from "../general/ResearchPlaques";
import WristCongruencySection from "../general/CongruencySection";
import WristIntegritySection from "../general/IntegritySection";
import WristParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

const anklePlaques = [
  { label: "Суставные щели", type: "modal", modalName: "WristJoinSpaceModal" },
  { label: "Суставные поверхности", type: "modal", modalName: "WristJointSurfaceModal" },
  { label: "Остеофиты", type: "modal", modalName: "WristOsteophytesModal" },
  { label: "Конгруэнтность", type: "expandable", component: WristCongruencySection },
  { label: "Целостность", type: "expandable", component: WristIntegritySection },
  { label: "Параартикулярные ткани", type: "expandable", component: WristParaarticularTissuesSection },
  {
    label: "Норма",
    type: "text",
    defaultText: [
      "Суставные щели лучезапястных суставов сохранены, равномерные.",
      "Суставные поверхности ровные, чёткие, без признаков деформации.",
      "Конгруэнтность суставных поверхностей не нарушена.",
      "Костно-травматических и костно-деструктивных изменений не выявлено.",
      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
    ].join("\n")
  },
  { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
];

export default function AnkleResearch({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  return (
    <ResearchPlaques
      plaques={anklePlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
