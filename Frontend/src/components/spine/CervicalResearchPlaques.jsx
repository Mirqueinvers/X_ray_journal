import ResearchPlaques from "../general/ResearchPlaques";
import LumbarIntegritySection from "../general/IntegritySection";
import LumbarParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

const cervicalPlaques = [
  { label: "Позвоночный столб", type: "modal", modalName: "SpineModal" },
  { label: "Межпозвонковые диски", type: "modal", modalName: "SpineIntervertebralDiscsModal" },
  { label: "Замыкательные пластинки", type: "modal", modalName: "SpineEndplatesModal" },
  { label: "Остеофиты", type: "modal", modalName: "SpineOsteophytesModal" },
  { label: "Нестабильность", type: "modal", modalName: "SpineInstabilityModal" },
  { label: "Целостность", type: "expandable", component: LumbarIntegritySection },
  { label: "Параартикулярные ткани", type: "expandable", component: LumbarParaarticularTissuesSection },
  { 
    label: "Норма", 
    type: "text", 
    defaultText: [
      "Высота пространств межпозвонковых дисков не изменена.",
      "Замыкательные пластинки ровные, чёткие, склеротических и деструктивных изменений не выявлено.",
      "Соотношение задних отделов тел позвонков не изменено.",
      "Костно-травматических и костно-деструктивных изменений не выявлено.",
      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений."
    ].join("\n") 
  },
  { label: "Диагноз", type: "modal", modalName: "DiagnosisModal" },
];

export default function CervicalResearch({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea
}) {
  return (
    <ResearchPlaques
      plaques={cervicalPlaques}
      expandedPlaque={expandedPlaque}
      setExpandedPlaque={setExpandedPlaque}
      setOpenModal={setOpenModal}
      insertTextToTextarea={insertTextToTextarea}
    />
  );
}
