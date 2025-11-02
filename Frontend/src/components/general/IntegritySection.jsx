import PlaqueButton from "../ui/PlaqueButton";

export default function IntegritySection({ setExpandedPlaque, insertTextToTextarea }) {
  const integrityOptions = [
    "Не нарушена",
    "Нарушена",
  ];

  const insertIntegrityText = (option) => {
    let fullText = "";

    if (option === "Не нарушена") {
      fullText = "\nКостно-травматических и костно-деструктивных изменений не выявлено.";
    } else if (option === "Нарушена") {
      fullText = "Определяется нарушение целостности костной ткани в";
    }

    insertTextToTextarea(fullText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {integrityOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertIntegrityText(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
