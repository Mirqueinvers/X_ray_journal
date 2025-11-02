import PlaqueButton from "../ui/PlaqueButton";

export default function HeartSection({ insertTextToTextarea, setExpandedPlaque }) {
  const heartOptions = [
    { label: "не расширена", text: "в пределах возрастной нормы" },
    { label: "расширена слева", text: "расширена преимущественно за счет левых отделов" },
    { label: "расширена справа", text: "расширена преимущественно за счет правых отделов" },
    { label: "расширена с двух сторон", text: "расширена за счет правых и левых отделов" }
  ];

  const handleOptionClick = (option) => {
    insertTextToTextarea("\n" + `Тень сердца ${option.text}.`);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {heartOptions.map((option, idx) => (
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
