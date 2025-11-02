// Frontend/src/components/CalcaneusResearchPlaques.jsx
import PlaqueButton from "../ui/PlaqueButton";

export default function CalcaneusResearchPlaques({
  setOpenModal,
  insertTextToTextarea,
}) {
  const calcaneusPlaques = ["Остеофиты", "Норма"];

  const handlePlaqueClick = (plaque, e) => {
    e.stopPropagation();

    switch (plaque) {
      case "Норма":
        insertTextToTextarea(
          [
            "Остеофиты пяточных костей не выявлены.",
            "Форма костей не изменена, структура однородная.",
            "Костно-травматических и костно-деструктивных изменений не выявлено.",
          ].join("\n"),
          plaque
        );
        break;

      case "Остеофиты":
        setOpenModal("CalcaneusOsteophytesModal");
        break;

      default:
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {calcaneusPlaques.map((plaque, index) => (
        <PlaqueButton
          key={index}
          label={plaque}
          onClick={(e) => handlePlaqueClick(plaque, e)}
          hasChildren={false}
          isExpanded={false}
        />
      ))}
    </div>
  );
}
