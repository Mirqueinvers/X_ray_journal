// JointSurfaceSection.jsx
import React from "react";

export default function JointSurfaceSection({
  textareaRef,
  selectedSubItem,
  setSelectedSubItem,
  selectedChangeLevel,
  setSelectedChangeLevel,
  setExpandedPlaque,
}) {
  const jointSurfaceSubItems = [
    "не изменены.",
    "левого коленного сустава",
    "правого коленного сустава",
    "незначительно склерозированы",
    "умеренно склерозированы",
    "выраженно склерозированы",
  ];

  const changeOptions = [
    "незначительно уплощены",
    "умеренно уплощены",
    "выраженно уплощены",
    "деформированы",
    "склерозированы",
  ];

  const newPlaques = [
    "в медиальных отделах.",
    "в латеральных отделах.",
    "в медиальных и латеральных отделах.",
  ];

  const changeMap = {
    "незначительно уплощены": "незначительно уплощены",
    "умеренно уплощены": "умеренно уплощены",
    "выраженно уплощены": "выраженно уплощены",
    "деформированы": "деформированы",
    "склерозированы": "склерозированы",
  };

  const changeMapSingle = {
    "незначительно уплощены": "незначительно уплощена",
    "умеренно уплощены": "умеренно уплощена",
    "выраженно уплощены": "выраженно уплощена",
    "деформированы": "деформирована",
    "склерозированы": "склерозирована",
  };

  // Вставка простого текста
  const insertPlaqueText = (plaque, subItem) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const textToInsert = `${plaque} ${subItem}\n`;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  textarea.value = text.substring(0, start) + textToInsert + text.substring(end);
  const newCursorPosition = start + textToInsert.length;
  textarea.setSelectionRange(newCursorPosition, newCursorPosition);
  textarea.focus();

  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  setSelectedSubItem(subItem);

  // Если выбран "не изменены.", сворачиваем плашку
  if (subItem === "не изменены.") {
    setExpandedPlaque(null);
  }
};


  // Вставка для одного коленного сустава
  const insertFullText = (location) => {
    if (!selectedSubItem || !selectedChangeLevel) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const change = changeMapSingle[selectedChangeLevel] || selectedChangeLevel;
    const fullText = `Суставная поверхность ${selectedSubItem} ${change} ${location}\n`;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + fullText + text.substring(end);

    const newCursorPosition = start + fullText.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setSelectedSubItem(null);
    setSelectedChangeLevel(null);
    setExpandedPlaque(null);
  };

  // Вставка для обоих суставов (множественное число)
  const insertChangeText = (changeLevel, location) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const change = changeMap[changeLevel] || changeLevel;
    const fullText = `Суставные поверхности коленных суставов ${change} ${location}\n`;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + fullText + text.substring(end);

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
      {jointSurfaceSubItems.map((subItem, idx) => {
        const isLeftOrRight =
          subItem === "левого коленного сустава" ||
          subItem === "правого коленного сустава";

        const isChangeOption =
          subItem === "незначительно склерозированы" ||
          subItem === "умеренно склерозированы" ||
          subItem === "выраженно склерозированы";

        return (
          <div key={idx}>
            {/* Левый/правый сустав */}
            {isLeftOrRight ? (
              selectedSubItem === subItem ? (
                <div className="ml-6 mt-1 space-y-1">
                  {!selectedChangeLevel ? (
                    changeOptions.map((ch, chIdx) => (
                      <div
                        key={chIdx}
                        className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChangeLevel(ch);
                        }}
                      >
                        {ch}
                      </div>
                    ))
                  ) : (
                    newPlaques.map((plaque, npIdx) => (
                      <div
                        key={npIdx}
                        className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          insertFullText(plaque);
                        }}
                      >
                        {plaque}
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
                    setSelectedChangeLevel(null);
                  }}
                >
                  {subItem}
                </div>
              )
            ) : isChangeOption ? (
              // Склерозированные — сначала выбор newPlaques
              selectedSubItem === subItem ? (
                <div className="ml-6 mt-1 space-y-1">
                  {newPlaques.map((plaque, npIdx) => (
                    <div
                      key={npIdx}
                      className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        insertChangeText(subItem, plaque);
                      }}
                    >
                      {plaque}
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
              // Обычные подпункты — вставляем сразу
              <div
                className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  insertPlaqueText("Суставные поверхности", subItem);
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
