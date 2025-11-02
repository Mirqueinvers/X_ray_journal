import PlaqueButton from "../ui/PlaqueButton";

export default function MediastinumSection({ insertTextToTextarea, setExpandedPlaque }) {
  const mediastinumOptions = [
    { label: "Не расширено", text: "не расширена" },
    { label: "Расширено в правых отделах", text: "расширена в правых отделах" },
    { label: "Расширено в левых отделах", text: "расширена в левых отделах" },
    { label: "Расширено верхнее средостение", text: "расширена в верхних отделах" }
  ];

  const handleOptionClick = (option) => {
    insertTextToTextarea("\n" + `Тень средостения ${option.text}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {mediastinumOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option.label}
          onClick={() => handleOptionClick(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
