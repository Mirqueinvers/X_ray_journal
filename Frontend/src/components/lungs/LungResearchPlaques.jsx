import ResearchPlaques from "../general/ResearchPlaques";
import VesselsSection from "./VesselsSection";
import HilaSection from "./HilaSection";
import SinusSection from "./SinusSection";
import PleuraSection from "./PleuraSection";
import MediastinumSection from "./MediastinumSection";
import HeartSection from "./HeartSection";
import ChestCageSection from "./ChestCageSection";

export default function LungResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const plaques = [
    { label: "Без патологических теней", type: "text", defaultText: "Легочная ткань без инфильтративных и очаговых теней." },
    { label: "Патологические тени", type: "modal", modalName: "LungPatternModal" },
    { label: "Сосудистый рисунок", type: "expandable", component: VesselsSection },
    { label: "Корни легких", type: "expandable", component: HilaSection },
    { label: "Синусы", type: "expandable", component: SinusSection },
    { label: "Плевра", type: "expandable", component: PleuraSection },
    { label: "Средостение", type: "expandable", component: MediastinumSection },
    { label: "Сердце", type: "expandable", component: HeartSection },
    { label: "Грудная клетка", type: "expandable", component: ChestCageSection },
    {
      label: "Норма",
      type: "text",
      defaultText: [
        "Легкие без инфильтративных и очаговых теней.",
        "Сосудистый рисунок не изменен.",
        "Корни легких не расширены, структурны.",
        "Синусы плевры свободны.",
        "Диафрагма куполообразной формы, расположена обычно.",
        "Тень средостения не расширена.",
        "Сердце в пределах возрастной нормы.",
        "Целостность костей грудной клетки не нарушена."
      ].join("\n"),
    },
    { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" }
    
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
