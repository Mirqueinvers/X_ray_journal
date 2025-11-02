import PlaqueButton from "../ui/PlaqueButton";

export default function ResearchPlaques({
  plaques = [],
  expandedPlaque,
  setExpandedPlaque,
  setOpenModal,
  insertTextToTextarea,
}) {
  return (
    <div className="mt-4 space-y-2">
      {plaques.map((plaque, index) => {
        const isExpanded = expandedPlaque === plaque.label;

        const handleClick = (e) => {
          e.stopPropagation();
          if (plaque.type === "text" && plaque.defaultText) {
            insertTextToTextarea("\n" + plaque.defaultText, plaque.label);
          } else if (plaque.type === "modal" && plaque.modalName) {
            setOpenModal(plaque.modalName);
          } else if (plaque.type === "expandable") {
            setExpandedPlaque(isExpanded ? null : plaque.label);
          }
        };

        return (
          <div key={index}>
            <PlaqueButton
              label={plaque.label}
              onClick={handleClick}
              isExpanded={isExpanded}
              // Шеврон только для expandable плашек
              hasChildren={plaque.type === "expandable"}
            />

            {plaque.type === "expandable" && isExpanded && plaque.component && (
              <plaque.component
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
