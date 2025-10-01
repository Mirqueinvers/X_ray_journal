import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RibsModal({ onClose, textareaRef }) {
  const [selectedRibs, setSelectedRibs] = useState([]);
  const [fractureType, setFractureType] = useState(""); 
  const [line, setLine] = useState(""); 

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
  if (ribs.length === 1) {
    return `${ribs[0]}-го ребра`;
  }
  return `${ribs.join(", ")} ребер`;
}

const insertSelected = () => {
  if (!textareaRef.current || selectedRibs.length === 0 || !fractureType || !line) return;

  const textarea = textareaRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

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
    isSingle = ribsBySide.R.length === 1 && phrases.length === 0; // если только одно ребро всего
    phrases.push(`${formatRibs(ribsBySide.R)} правой половины грудной клетки`);
  }

  const ribsText = phrases.join(", ");

  const insertText = isSingle
    ? `\nОпределяется ${fractureTypes[fractureType].single} перелом ${ribsText}, по ${lineForms[line]} линии.\n`
    : `\nОпределяются ${fractureTypes[fractureType].plural} переломы ${ribsText}, по ${lineForms[line]} линии.\n`;

  const newText = value.substring(0, start) + insertText + value.substring(end);
  textarea.value = newText;

  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  textarea.focus();
  textarea.setSelectionRange(start + insertText.length, start + insertText.length);

  onClose();
};

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      
    >
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

        <h2 className="text-yellow-300 text-lg mb-4">Выберите рёбра</h2>

        {/* Левое и правое */}
        <div className="flex gap-8 mb-6">
          {/* Левое */}
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

          {/* Правое */}
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
        </div>

        {/* Состояние перелома */}
        <h3 className="text-yellow-300 mb-2">Состояние перелома</h3>
        <div className="flex gap-4 mb-6">
          {["Сросшийся", "Свежий"].map((type) => (
            <button
              key={type}
              onClick={() => setFractureType(type)}
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

        {/* Линия грудной клетки */}
        <h3 className="text-yellow-300 mb-2">Линия грудной клетки</h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {["Средне-ключичная", "Передняя подмышечная", "Средняя подмышечная", "Задняя подмышечная", "Лопаточная"].map(
            (ln) => (
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
            )
          )}
        </div>

        {/* Добавить */}
        <button
          onClick={insertSelected}
          disabled={selectedRibs.length === 0 || !fractureType || !line}
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            selectedRibs.length > 0 && fractureType && line
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
