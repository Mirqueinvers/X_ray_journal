import PlaqueButton from "../ui/PlaqueButton";

export default function ParaarticularTissuesSection({ setExpandedPlaque, insertTextToTextarea }) {
  const paraarticularOptions = [
    "Без изменений",
    "Изменения",
  ];

  const insertParaarticularText = (option) => {
    let fullText = "";
    if (option === "Без изменений") {
      fullText = "\nПараартикулярные ткани не имеют рентгено-позитивных признаков изменений.";
    } else if (option === "Изменения") {
      fullText = "\nОпределяются образования костной плотности в параартикулярных тканях.";
    }

    insertTextToTextarea(fullText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {paraarticularOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertParaarticularText(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
