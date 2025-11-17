import PlaqueButton from "../ui/PlaqueButton";

export default function EndoprosthesisSection({ 
  setExpandedPlaque, 
  insertTextToTextarea,
  setHasEndoprosthesis
}) {
  const endoprosthesisOptions = [
    "левого тазобедренного сустава",
    "правого тазобедренного сустава",
  ];

  const insertEndoprosthesisText = (option) => {
    let fullText = `\nОпределяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;
    let additionalText = "";
    
    // Определяем противоположный сустав
    if (option === "правого тазобедренного сустава") {
      additionalText = "\nЛевый тазобедренный сустав:";
    } else if (option === "левого тазобедренного сустава") {
      additionalText = "\nПравый тазобедренный сустав:";
    }
    
    // Устанавливаем состояние эндопротеза
    setHasEndoprosthesis(true);
    
    // Вставляем основной текст и дополнительный текст
    insertTextToTextarea(fullText + additionalText);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {endoprosthesisOptions.map((option, idx) => (
        <PlaqueButton
          key={idx}
          label={option}
          onClick={() => insertEndoprosthesisText(option)}
          hasChildren={false}
        />
      ))}
    </div>
  );
}
