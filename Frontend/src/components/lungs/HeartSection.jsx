import GenericOptionsSection from "./GenericOptionsSection";

export default function HeartSection({ insertTextToTextarea, setExpandedPlaque }) {
  const heartOptions = [
    { label: "не расширена", text: "в пределах возрастной нормы" },
    { label: "расширена слева", text: "расширена преимущественно за счет левых отделов" },
    { label: "расширена справа", text: "расширена преимущественно за счет правых отделов" },
    { label: "расширена с двух сторон", text: "расширена за счет правых и левых отделов" }
  ];

  return (
    <GenericOptionsSection
      options={heartOptions}
      textPrefix="Тень сердца"
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}