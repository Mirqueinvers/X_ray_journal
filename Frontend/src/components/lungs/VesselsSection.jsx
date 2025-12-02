import GenericOptionsSection from "./GenericOptionsSection";

export default function VesselsSection({ insertTextToTextarea, setExpandedPlaque }) {
  const vesselsOptions = [
    "не изменен",
    "усилен", 
    "деформирован"
  ];

  return (
    <GenericOptionsSection
      options={vesselsOptions}
      textPrefix="Сосудистый рисунок"
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}