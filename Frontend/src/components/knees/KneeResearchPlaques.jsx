// Frontend/src/components/KneeResearchPlaques.jsx
import PlaqueButton from "../ui/PlaqueButton";
import BumpsSection from "./BumpsSection";
import CongruencySection from "../general/CongruencySection";
import IntegritySection from "../general/IntegritySection";
import ParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import EndoprosthesisSection from "./EndoprosthesisSection";

export default function KneeResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  selectedSubItem,
  setSelectedSubItem,
  selectedShapeLevel,
  setSelectedShapeLevel,
  setOpenModal,
  insertTextToTextarea,
}) {
  const kneeJointPlaques = [
    "Эндопротезирование",
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Бугорки",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
    "Норма",
    "Диагноз",
  ];

  const handlePlaqueClick = (plaque, isExpanded, e) => {
    e.stopPropagation();

    switch (plaque) {
      case "Норма":
        insertTextToTextarea(
          [
            "Суставные щели коленных суставов сохранены, равномерные.",
            "Суставные поверхности ровные, чёткие, без признаков деформации.",
            "Бугорки межмыщелковых возвышений не изменены.",
            "Конгруэнтность суставных поверхностей не нарушена.",
            "Костно-травматических и костно-деструктивных изменений не выявлено.",
            "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
          ].join("\n")
        );
        break;

      case "Остеофиты":
        setOpenModal("OsteophytesModal");
        break;

      case "Суставные щели":
        setOpenModal("JointSpaceSection");
        break;

      case "Суставные поверхности":
        setOpenModal("JointSurfaceModal");
        break;

      case "Диагноз":
        setOpenModal("KneeDiagnosisModal");
        break;

      default:
        setExpandedPlaque(isExpanded ? null : plaque);
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {kneeJointPlaques.map((plaque, index) => {
        const isExpanded = expandedPlaque === plaque;

        return (
          <div key={index}>
            <PlaqueButton
              label={plaque}
              onClick={(e) => handlePlaqueClick(plaque, isExpanded, e)}
              isExpanded={isExpanded}
              hasChildren={!["Норма", "Остеофиты", "Диагноз", "Суставные щели", "Суставные поверхности"].includes(plaque)}
            />

            {isExpanded && plaque === "Бугорки" && (
              <BumpsSection
                insertTextToTextarea={insertTextToTextarea}
                selectedSubItem={selectedSubItem}
                setSelectedSubItem={setSelectedSubItem}
                selectedShapeLevel={selectedShapeLevel}
                setSelectedShapeLevel={setSelectedShapeLevel}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Конгруэнтность" && (
              <CongruencySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Целостность" && (
              <IntegritySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Параартикулярные ткани" && (
              <ParaarticularTissuesSection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Эндопротезирование" && (
              <EndoprosthesisSection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
