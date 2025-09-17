// Суставные щели
import React from "react";

export default function JointSpaceSection({
  textareaRef,
  selectedSubItem,
  setSelectedSubItem,
  selectedNarrowingLevel,
  setSelectedNarrowingLevel,
  setExpandedPlaque,
}) {
  // Подпункты для суставных щелей
  const jointSpaceSubItems = [
    "равномерной высоты.",
    "левого коленного сустава",
    "правого коленного сустава",
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Варианты сужения
  const degreeOptions = [
    "незначительно сужены",
    "умеренно сужены",
    "выраженно сужены",
    "резко сужены",
  ];

  // Дополнительные уточнения отделов
  const newPlaques = [
    "в медиальных отделах.",
    "в латеральных отделах.",
    "в медиальных и латеральных отделах.",
  ];

  // словарь правильных форм
  const narrowingMap = {
    "незначительно сужены": "незначительно сужены", // множественное число
    "умеренно сужены": "умеренно сужены",
    "выраженно сужены": "выраженно сужены",
    "резко сужены": "резко сужены",
  };

  const narrowingMapSingle = {
    "незначительно сужены": "незначительно сужена", // единственное число
    "умеренно сужены": "умеренно сужена",
    "выраженно сужены": "выраженно сужена",
    "резко сужены": "резко сужена",
  };

  // Вставка простого текста
  const insertPlaqueText = (plaque, subItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const textToInsert = `${plaque} ${subItem}\n`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText =
      text.substring(0, start) + textToInsert + text.substring(end);
    textarea.value = newText;

    const newCursorPosition = start + textToInsert.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setSelectedSubItem(subItem);

    if (subItem === "равномерной высоты.") {
      setExpandedPlaque(null);
    }
  };

  // Вставка для одного коленного сустава (левый/правый)
  const insertFullText = (location) => {
    if (!selectedSubItem || !selectedNarrowingLevel) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const narrowing =
      narrowingMapSingle[selectedNarrowingLevel] || selectedNarrowingLevel;

    const fullText = `Суставная щель ${selectedSubItem} ${narrowing} ${location}\n`;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText = text.substring(0, start) + fullText + text.substring(end);
    textarea.value = newText;

    const newCursorPosition = start + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setSelectedSubItem(null);
    setSelectedNarrowingLevel(null);
    setExpandedPlaque(null);
  };

  // Вставка для обоих суставов (множественное число)
  const insertNarrowingText = (narrowingLevel, location) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const narrowing = narrowingMap[narrowingLevel] || narrowingLevel;
    const fullText = `Суставные щели коленных суставов ${narrowing} ${location}\n`;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText = text.substring(0, start) + fullText + text.substring(end);
    textarea.value = newText;

    const newCursorPosition = start + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setSelectedSubItem(null);
    setExpandedPlaque(null);
  };

  return (
    <div className="ml-6 mt-1 space-y-1">
      {jointSpaceSubItems.map((subItem, subIndex) => {
        const isLeftOrRight =
          subItem === "левого коленного сустава" ||
          subItem === "правого коленного сустава";
        const isDegree = degreeOptions.includes(subItem);

        return (
          <div key={subIndex}>
            {isLeftOrRight ? (
              selectedSubItem === subItem ? (
                <div className="ml-6 mt-1 space-y-1">
                  {!selectedNarrowingLevel ? (
                    degreeOptions.map((deg, degIdx) => (
                      <div
                        key={degIdx}
                        className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNarrowingLevel(deg);
                        }}
                      >
                        {deg}
                      </div>
                    ))
                  ) : (
                    newPlaques.map((newPlaque, npIdx) => (
                      <div
                        key={npIdx}
                        className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          insertFullText(newPlaque);
                        }}
                      >
                        {newPlaque}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div
                  className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubItem(subItem);
                    setSelectedNarrowingLevel(null);
                  }}
                >
                  {subItem}
                </div>
              )
            ) : isDegree ? (
              selectedSubItem === subItem ? (
                <div className="ml-6 mt-1 space-y-1">
                  {newPlaques.map((newPlaque, newPlaqueIndex) => (
                    <div
                      key={newPlaqueIndex}
                      className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        insertNarrowingText(subItem, newPlaque);
                      }}
                    >
                      {newPlaque}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubItem(subItem);
                  }}
                >
                  {subItem}
                </div>
              )
            ) : (
              <div
                className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  insertPlaqueText("Суставные щели", subItem);
                }}
              >
                {subItem}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
