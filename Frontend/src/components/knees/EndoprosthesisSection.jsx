import PlaqueButton from "../ui/PlaqueButton";

export default function EndoprosthesisSection({ 
  setExpandedPlaque, 
  insertTextToTextarea,
  setHasEndoprosthesis 
}) {
  const endoprosthesisOptions = [
    "левого коленного сустава",
    "правого коленного сустава",
    "обоих коленных суставов",
  ];

  const insertEndoprosthesisText = (option) => {
    let fullText = "";
    let additionalText = "";

    if (option === "обоих коленных суставов") {
      fullText = "Определяются эндопротезы обоих коленных суставов при удовлетворительном стоянии металлоконструкций.";
      // Для обоих суставов дополнительный текст не нужен
    } else {
      fullText = `Определяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;
      
      // Определяем противоположный сустав
      if (option === "правого коленного сустава") {
        additionalText = "\nЛевый коленный сустав:";
      } else if (option === "левого коленного сустава") {
        additionalText = "\nПравый коленный сустав:";
      }
    }

    // Устанавливаем состояние эндопротеза
    setHasEndoprosthesis(true);
    
    // Вставляем основной текст и дополнительный текст
    insertTextToTextarea("\n" + fullText + additionalText);
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
