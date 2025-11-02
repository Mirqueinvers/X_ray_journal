import React from "react";

export default function BumpsSection({ textareaRef, setExpandedPlaque, insertTextToTextarea }) { // 1. Принимаем пропс
  // Варианты формы бугорков
  const shapeOptions = [
    "не изменены",
    "заострены",
    "уплощены",
    "заострены справа",
    "заостrены слева",
    "уплощены справа",
    "уплощены слева",
  ];

  // --- ИЗМЕНЕННЯ ФУНКЦИЯ ---
  const insertShapeText = (shape) => {
    const fullText = `Бугорки межмыщелковых возвышений ${shape}.`;

    // 2. Вызываем пропс для вставки
    insertTextToTextarea("\n" + fullText);
    
    // Добавляем вызов для сворачивания плашки
    setExpandedPlaque(null);
  };
  // --- КОНЕЦ ИЗMЕНЕНИЙ ---

  return (
    <div className="ml-6 mt-1 space-y-1">
      {shapeOptions.map((shape, idx) => (
        <div
          key={idx}
          className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            insertShapeText(shape);
          }}
        >
          {shape}
        </div>
      ))}
    </div>
  );
}
