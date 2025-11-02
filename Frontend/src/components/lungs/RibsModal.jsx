import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RibsModal({ onClose, insertTextToTextarea }) { // 1. Принимаем пропс
  const [selectedRibs, setSelectedRibs] = useState([]);
  const [fractureType, setFractureType] = useState(""); 
  const [line, setLine] = useState(""); 
  const [displacement, setDisplacement] = useState(""); 
  const [displacementDegree, setDisplacementDegree] = useState("");

  // ... остальной код вашего состояния (ribsRight, ribsLeft) остается без изменений ...
  const ribsRight = Array.from({ length: 12 }, (_, i) => i + 1);
  const ribsLeft = Array.from({ length: 12 }, (_, i) => i + 1);

  const toggleRib = (side, rib) => {
    const ribId = `${side}-${rib}`;
    if (selectedRibs.includes(ribId)) {
      setSelectedRibs(selectedRibs.filter((r) => r !== ribId));
    } else {
      setSelectedRibs([...selectedRibs, ribId]);
    }
  };

  const fractureTypes = {
    "Сросшийся": { single: "сросшийся", plural: "сросшиеся" },
    "Свежий": { single: "свежий", plural: "свежие" },
  };

  const lineForms = {
    "Средне-ключичная": "средне-ключичной",
    "Передняя подмышечная": "передней подмышечной",
    "Средняя подмышечная": "средней подмышечной",
    "Задняя подмышечная": "задней подмышечной",
    "Лопаточная": "лопаточной",
  };

  function formatRibs(ribs) {
    if (ribs.length === 1) return `${ribs[0]}-го ребра`;
    return `${ribs.join(", ")} ребер`;
  }

  // --- ИЗМЕНЕННАЯ ФУНКЦИЯ ---
  const insertSelected = () => {
    if (selectedRibs.length === 0 || !fractureType || !line) return;

    // Сохраняем всю вашу сложную логику генерации текста
    const ribsBySide = { L: [], R: [] };
    selectedRibs.forEach((r) => {
      const [side, num] = r.split("-");
      ribsBySide[side].push(Number(num));
    });

    let phrases = [];
    let isSingle = false;

    if (ribsBySide.L.length > 0) {
      ribsBySide.L.sort((a, b) => a - b);
      isSingle = ribsBySide.L.length === 1;
      phrases.push(`${formatRibs(ribsBySide.L)} левой половины грудной клетки`);
    }
    if (ribsBySide.R.length > 0) {
      ribsBySide.R.sort((a, b) => a - b);
      isSingle = ribsBySide.R.length === 1 && phrases.length === 0;
      phrases.push(`${formatRibs(ribsBySide.R)} правой половины грудной клетки`);
    }

    const ribsText = phrases.join(", ");
    let insertText = "";

    if (fractureType === "Сросшийся") {
      insertText = isSingle
        ? `Определяется ${fractureTypes[fractureType].single} перелом ${ribsText}, по ${lineForms[line]} линии.`
        : `Определяются ${fractureTypes[fractureType].plural} переломы ${ribsText}, по ${lineForms[line]} линии.`;
    } else if (fractureType === "Свежий") {
      let displacementText = "";
      if (displacement === "Без смещения") {
        displacementText = "без смещения";
      } else if (displacement === "Со смещением") {
        if (displacementDegree) {
          displacementText = `со смещением отломков ${displacementDegree}`;
        } else {
          displacementText = "со смещением отломков";
        }
      }

      insertText = isSingle
        ? `Определяется ${fractureTypes[fractureType].single} перелом ${ribsText}, по ${lineForms[line]} линии, ${displacementText}.`
        : `Определяются ${fractureTypes[fractureType].plural} переломы ${ribsText}, по ${lineForms[line]} линии, ${displacementText}.`;
    }

    // Добавляем переносы строки для лучшего форматирования
    const finalText = `${insertText}`;

    // 2. Используем пропс для вставки
    insertTextToTextarea("\n" + finalText);
    
    onClose();
  };
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="relative w-[800px] h-[750px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* ... остальной JSX остается без изменений ... */}
        <h2 className="text-yellow-300 text-lg mb-4">Выберите рёбра</h2>

        <div className="flex gap-8 mb-6">
          <div>
            <h3 className="text-yellow-400 mb-2">Правые рёбра</h3>
            <div className="grid grid-cols-6 gap-2">
              {ribsRight.map((rib) => (
                <button
                  key={`R-${rib}`}
                  onClick={() => toggleRib("R", rib)}
                  className={`px-3 py-2 border rounded text-sm ${
                    selectedRibs.includes(`R-${rib}`)
                      ? "bg-yellow-500 text-black border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {rib}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-yellow-400 mb-2">Левые рёбра</h3>
            <div className="grid grid-cols-6 gap-2">
              {ribsLeft.map((rib) => (
                <button
                  key={`L-${rib}`}
                  onClick={() => toggleRib("L", rib)}
                  className={`px-3 py-2 border rounded text-sm ${
                    selectedRibs.includes(`L-${rib}`)
                      ? "bg-yellow-500 text-black border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {rib}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-yellow-300 mb-2">Состояние перелома</h3>
        <div className="flex gap-4 mb-4">
          {["Сросшийся", "Свежий"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFractureType(type);
                setDisplacement("");
                setDisplacementDegree("");
              }}
              className={`px-4 py-2 rounded border ${
                fractureType === type
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {fractureType === "Свежий" && (
          <>
            <h3 className="text-yellow-300 mb-2">Смещение</h3>
            <div className="flex gap-4 mb-4">
              {["Без смещения", "Со смещением"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDisplacement(opt);
                    setDisplacementDegree("");
                  }}
                  className={`px-4 py-2 rounded border ${
                    displacement === opt
                      ? "bg-yellow-500 text-black border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {displacement === "Со смещением" && (
              <>
                <h3 className="text-yellow-300 mb-2">Величина смещения</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {[
                    "на 1/2 ширины ребра",
                    "на 1/3 ширины ребра",
                    "на 1/4 ширины ребра",
                    "на ширину ребра",
                  ].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setDisplacementDegree(deg)}
                      className={`px-4 py-2 rounded border ${
                        displacementDegree === deg
                          ? "bg-yellow-500 text-black border-yellow-400"
                          : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {deg}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <h3 className="text-yellow-300 mb-2">Линия грудной клетки</h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.keys(lineForms).map((ln) => (
            <button
              key={ln}
              onClick={() => setLine(ln)}
              className={`px-4 py-2 rounded border ${
                line === ln
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
              }`}
            >
              {ln}
            </button>
          ))}
        </div>

        <button
          onClick={insertSelected}
          disabled={
            selectedRibs.length === 0 ||
            !fractureType ||
            !line ||
            (fractureType === "Свежий" &&
              (!displacement || (displacement === "Со смещением" && !displacementDegree)))
          }
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            selectedRibs.length > 0 &&
            fractureType &&
            line &&
            (fractureType !== "Свежий" ||
              (displacement &&
                (displacement !== "Со смещением" || displacementDegree)))
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
