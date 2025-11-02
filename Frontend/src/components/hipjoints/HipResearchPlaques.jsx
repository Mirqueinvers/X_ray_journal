import ResearchPlaques from "../general/ResearchPlaques";
import HipCongruencySection from "../general/CongruencySection";
import HipIntegritySection from "../general/IntegritySection";
import HipParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import HipEndoprosthesisSection from "./EndoprosthesisSection";


export default function HipResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Эндопротез", type: "expandable", component: HipEndoprosthesisSection },
    { label: "Суставные щели", type: "modal", modalName: "HipJointSpaceModal" },
    { label: "Суставные поверхности", type: "modal", modalName: "HipJointSurfaceModal" },
    { label: "Остеофиты", type: "modal", modalName: "HipOsteophytesModal" },
    { label: "Лонное сочленение", type: "modal", modalName: "PubicSymphysisModal" },
    { label: "Флеболиты", 
      type: "text", 
      defaultText: [
        "В проекции полости малого таза определяются единичные тени флеболитов.",
      ].join("\n") 
    },
    { label: "Конгруэнтность", type: "expandable", component: HipCongruencySection },
    { label: "Целостность", type: "expandable", component: HipIntegritySection },
    { label: "Параартикулярные ткани", type: "expandable", component: HipParaarticularTissuesSection },
    { label: "Норма", 
      type: "text", 
      defaultText: [
        "Суставные щели тазобедренных суставов сохранены, равномерные",
        "Суставные поверхности ровные, чёткие, без признаков деформации",
        "Конгруэнтность суставных поверхностей не нарушена",
        "Костно-травматических и костно-деструктивных изменений не выявлено",
        "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений",
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
