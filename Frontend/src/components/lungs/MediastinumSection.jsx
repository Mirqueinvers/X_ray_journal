// Frontend/src/components/lungs/MediastinumSection.jsx
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
    <div className="ml-4 space-y-1">
      {mediastinumOptions.map((option, index) => (
        <div
          key={index}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleOptionClick(option);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}
