import PlaqueButton from "../ui/PlaqueButton";

export default function FlatfootResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  const flatfootPlaques = [
    "Плоскостопие",
    "Норма",
  ];

  const handlePlaqueClick = (plaque, e) => {
    e.stopPropagation();

    switch (plaque) {
      case "Норма":
        insertTextToTextarea(
          "Признаков плоскостопия не выявлено. Форма стоп нормальная, своды сохранены."
        );
        break;

      case "Плоскостопие":
        setOpenModal("FlatfootModal");
        break;

      default:
        setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
        break;
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {flatfootPlaques.map((plaque, index) => {
        const isExpandable = plaque === "Плоскостопие";
        const isExpanded = expandedPlaque === plaque;

        return (
          <div key={index}>
            <PlaqueButton
              label={plaque}
              onClick={(e) => handlePlaqueClick(plaque, e)}
              hasChildren={isExpandable}
              isExpanded={isExpanded}
            />
          </div>
        );
      })}
    </div>
  );
}
