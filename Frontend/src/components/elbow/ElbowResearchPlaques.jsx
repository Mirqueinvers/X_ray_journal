// Frontend/src/components/ElbowResearchPlaques.jsx
import PlaqueButton from "../ui/PlaqueButton";
import ElbowCongruencySection from "../general/CongruencySection";
import ElbowIntegritySection from "../general/IntegritySection";
import ElbowParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function ElbowResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const elbowJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
    "Норма",
    "Диагноз",
  ];

  const handlePlaqueClick = (plaque, e) => {
    e.stopPropagation();

    switch (plaque) {
      case "Норма":
        insertTextToTextarea(
          [
            "Суставные щели локтевых суставов сохранены, равномерные.",
            "Суставные поверхности ровные, чёткие, без признаков деформации.",
            "Конгруэнтность суставных поверхностей не нарушена.",
            "Костно-травматических и костно-деструктивных изменений не выявлено.",
            "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
          ].join("\n")
        );
        break;

      case "Суставные щели":
        setOpenModal("ElbowJoinSpaceModal");
        break;

      case "Суставные поверхности":
        setOpenModal("ElbowJointSurfaceModal");
        break;

      case "Остеофиты":
        setOpenModal("ElbowOsteophytesModal");
        break;

      case "Диагноз":
        setOpenModal("ElbowDiagnosisModal");
        break;

      default:
        setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {elbowJointPlaques.map((plaque, index) => {
        const isExpandable = [
          "Конгруэнтность",
          "Целостность",
          "Параартикулярные ткани",
        ].includes(plaque);

        const isExpanded = expandedPlaque === plaque;

        return (
          <div key={index}>
            <PlaqueButton
              label={plaque}
              onClick={(e) => handlePlaqueClick(plaque, e)}
              hasChildren={isExpandable}
              isExpanded={isExpanded}
            />

            {isExpanded && plaque === "Конгруэнтность" && (
              <ElbowCongruencySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Целостность" && (
              <ElbowIntegritySection
                insertTextToTextarea={insertTextToTextarea}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Параартикулярные ткани" && (
              <ElbowParaarticularTissuesSection
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
