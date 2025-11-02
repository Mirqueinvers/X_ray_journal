// ... остальной код ...

export default function EndoprosthesisSection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  const endoprosthesisOptions = [
    "левого коленного сустава",
    "правого коленного сустава",
    "обоих коленных суставов",
  ];

  // --- ИЗМЕНЕННАЯ ФУНКЦИЯ ---
  const insertEndoprosthesisText = (option) => {
    let fullText = "";
    
    if (option === "обоих коленных суставов") {
      fullText = "Определяются эндопротезы обоих коленных суставов при удовлетворительном стоянии металлоконструкций.";
    } else {
      fullText = `Определяется эндопротез ${option} при удовлетворительном стоянии металлоконструкции.`;
    }

    // 2. Вызываем пропс для вставки
    insertTextToTextarea("\n" + fullText);
    
    // Сворачиваем плашку после выбора
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {endoprosthesisOptions.map((option, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertEndoprosthesisText(option);
          }}
        >
          {option}
        </div>
      ))}
    </div>
  );
}