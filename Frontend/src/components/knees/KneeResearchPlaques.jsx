import ResearchPlaques from "../general/ResearchPlaques";
import BumpsSection from "./BumpsSection";
import CongruencySection from "../general/CongruencySection";
import IntegritySection from "../general/IntegritySection";
import ParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import EndoprosthesisSection from "./EndoprosthesisSection";

const kneePlaques = [
  { label: "Эндопротезирование", type: "expandable", component: EndoprosthesisSection },
  { label: "Суставные щели", type: "modal", modalName: "JointSpaceSection" },
  { label: "Суставные поверхности", type: "modal", modalName: "JointSurfaceModal" },
  { label: "Остеофиты", type: "modal", modalName: "OsteophytesModal" },
  { label: "Бугорки", type: "expandable", component: BumpsSection },
  { label: "Конгруэнтность", type: "expandable", component: CongruencySection },
  { label: "Целостность", type: "expandable", component: IntegritySection },
  { label: "Параартикулярные ткани", type: "expandable", component: ParaarticularTissuesSection },
  { 
    label: "Норма", 
    type: "text", 
    defaultText: [
      "Суставные щели коленных суставов сохранены, равномерные.",
      "Суставные поверхности ровные, чёткие, без признаков деформации.",
      "Бугорки межмыщелковых возвышений не изменены.",
      "Конгруэнтность суставных поверхностей не нарушена.",
      "Костно-травматических и костно-деструктивных изменений не выявлено.",
      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений."
    ].join("\n") 
  },
  { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
];

export default function KneeResearch({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
  // НОВЫЕ пропсы для эндопротеза
  hasEndoprosthesis,
  setHasEndoprosthesis
}) {
  return (
    <ResearchPlaques
      plaques={kneePlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
      // НОВОЕ: Передаем пропсы эндопротеза
      hasEndoprosthesis={hasEndoprosthesis}
      setHasEndoprosthesis={setHasEndoprosthesis}
    />
  );
}