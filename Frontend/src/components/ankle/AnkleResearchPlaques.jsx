// Frontend/src/components/AnkleResearchPlaques.jsx
import PlaqueButton from "../ui/PlaqueButton";
import AnkleCongruencySection from "../general/CongruencySection";
import AnkleIntegritySection from "../general/IntegritySection";
import AnkleParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function AnkleResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
  insertTextToTextarea,
}) {
  const ankleJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
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
            "Суставные щели голеностопных суставов сохранены, равномерные.",
            "Суставные поверхности ровные, чёткие, без признаков деформации.",
            "Конгруэнтность суставных поверхностей не нарушена.",
            "Костно-травматических и костно-деструктивных изменений не выявлено.",
            "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
          ].join("\n")
        );
        break;

      case "Суставные щели":
        setOpenModal("AnkleJoinSpaceModal");
        break;

      case "Суставные поверхности":
        setOpenModal("AnkleJointSurfaceModal");
        break;

      case "Остеофиты":
        setOpenModal("AnkleOsteophytesModal");
        break;

      case "Диагноз":
        setOpenModal("AnkleDiagnosisModal");
        break;

      default:
        setExpandedPlaque(isExpanded ? null : plaque);
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {ankleJointPlaques.map((plaque, index) => {
        const isExpanded = expandedPlaque === plaque;

        return (
          <div key={index}>
            <PlaqueButton
              label={plaque}
              onClick={(e) => handlePlaqueClick(plaque, isExpanded, e)}
              isExpanded={isExpanded}
              hasChildren={![
                "Норма",
                "Остеофиты",
                "Диагноз",
                "Суставные щели",
                "Суставные поверхности",
              ].includes(plaque)}
            />

            {isExpanded && plaque === "Конгруэнтность" && (
              <AnkleCongruencySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Целостность" && (
              <AnkleIntegritySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Параартикулярные ткани" && (
              <AnkleParaarticularTissuesSection
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
