import GenericOptionsSection from "./GenericOptionsSection";

export default function MediastinumSection({ insertTextToTextarea, setExpandedPlaque }) {
  const mediastinumOptions = [
    { label: "Не расширено", text: "не расширена" },
    { label: "Расширено в правых отделах", text: "расширена в правых отделах" },
    { label: "Расширено в левых отделах", text: "расширена в левых отделах" },
    { label: "Расширено верхнее средостение", text: "расширена в верхних отделах" }
  ];

  return (
    <GenericOptionsSection
      options={mediastinumOptions}
      textPrefix="Тень средостения"
      insertTextToTextarea={insertTextToTextarea}
      setExpandedPlaque={setExpandedPlaque}
    />
  );
}