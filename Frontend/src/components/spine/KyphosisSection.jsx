import PlaqueButton from "../ui/PlaqueButton";

export default function KyphosisSection({ insertTextToTextarea, setExpandedPlaque }) {
  const options = ["не изменен", "увеличен", "сглажен"];

  const insertText = (option) => {
    insertTextToTextarea(`Кифоз грудного отдела позвоночника ${option}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {options.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertText(option)}
          isExpanded={false}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
