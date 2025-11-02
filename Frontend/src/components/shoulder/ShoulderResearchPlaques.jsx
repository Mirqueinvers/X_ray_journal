import ResearchPlaques from "../general/ResearchPlaques";
import ShoulderCongruencySection from "../general/CongruencySection";
import ShoulderIntegritySection from "../general/IntegritySection";
import ShoulderParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function ShoulderResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Суставные щели", type: "modal", modalName: "ShoulderJointSpaceModal" },
    { label: "Суставные поверхности", type: "modal", modalName: "ShoulderJointSurfaceModal" },
    { label: "Остеофиты", type: "modal", modalName: "ShoulderOsteophytesModal" },
    { label: "Ключично-акромиальные сочленения", type: "modal", modalName: "ShoulderAcromioclavicularModal" },
    { label: "Конгруэнтность", type: "expandable", component: ShoulderCongruencySection },
    { label: "Целостность", type: "expandable", component: ShoulderIntegritySection },
    { label: "Параартикулярные ткани", type: "expandable", component: ShoulderParaarticularTissuesSection },
    {
      label: "Норма",
      type: "text",
      defaultText: [
        "Суставные щели плечевых суставов сохранены, равномерные.",
        "Суставные поверхности ровные, чёткие, без признаков деформации.",
        "Конгруэнтность суставных поверхностей не нарушена.",
        "Костно-травматических и костно-деструктивных изменений не выявлено.",
        "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
        "Ключично-акромиальные сочленения без патологии."
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
