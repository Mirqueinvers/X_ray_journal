// Frontend/src/components/lungs/HeartSection.jsx
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
    <div className="ml-4 space-y-1">
      {heartOptions.map((option, index) => (
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
