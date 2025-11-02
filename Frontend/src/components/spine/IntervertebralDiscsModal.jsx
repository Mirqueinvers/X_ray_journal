// Frontend/src/components/lumbar/IntervertebralDiscsModal.jsx
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function IntervertebralDiscsModal({ onClose, insertTextToTextarea }) {
  const [activeSeverity, setActiveSeverity] = useState(null);
  const [selected, setSelected] = useState({
    умеренно: [],
    выраженно: [],
    резко: [],
  });
  const [unchanged, setUnchanged] = useState(true); // по умолчанию "не изменена"

  const vertebrae = [
    "C1","C2","C3","C4","C5","C6","C7",
    "Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12",
    "L1","L2","L3","L4","L5",
    "S1","S2","S3","S4","S5",
  ];

  const toggleVertebra = (v) => {
    if (unchanged) return; 
    const copy = [...selected[activeSeverity]];
    const idx = copy.indexOf(v);
    if (idx >= 0) copy.splice(idx, 1);
    else copy.push(v);
    setSelected({ ...selected, [activeSeverity]: copy });
  };

  const buildSegments = (verts) => {
    if (verts.length === 0) return [];
    const sorted = verts.sort((a, b) => vertebrae.indexOf(a) - vertebrae.indexOf(b));
    const ranges = [];
    let start = sorted[0], prev = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      const curr = sorted[i];
      if (vertebrae.indexOf(curr) === vertebrae.indexOf(prev) + 1) {
        prev = curr;
      } else {
        ranges.push(start === prev ? start : `${start}-${prev}`);
        start = curr;
        prev = curr;
      }
    }
    ranges.push(start === prev ? start : `${start}-${prev}`);
    return ranges;
  };

const insertSelected = () => {
  // ВАША ЛОГИКА ГЕНЕРАЦИИ ТЕКСТА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ
  let insertText = "";

  if (unchanged) {
    insertText = "Высота пространств межпозвонковых дисков не изменена.";
  } else {
    let parts = [];
    for (const sev of ["умеренно", "выраженно", "резко"]) {
      const segs = buildSegments(selected[sev]);
      if (segs.length > 0) {
        parts.push(`${sev} снижена в сегментах ${segs.join(", ")}`);
      }
    }
    if (parts.length === 0) return;
    insertText = `Высота пространств межпозвонковых дисков ${parts.join(", ")}.`;
  }

  // --- ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ ---
  // Добавляем перенос строки и используем пропс для вставки
  const finalText = `\n${insertText}\n`;
  insertTextToTextarea(finalText);
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  onClose();
};

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[800px] h-[650px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">
          Выберите позвонки и степень сужения
        </h2>

        {/* кнопки степеней + не изменена */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {/* кнопка "не изменена" слева */}
          <button
            onClick={() => {
              setUnchanged(true);
              setActiveSeverity(null);
              setSelected({ умеренно: [], выраженно: [], резко: [] });
            }}
            className={`px-4 py-2 rounded ${
              unchanged
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
            }`}
          >
            Не изменена
          </button>

          {["умеренно","выраженно","резко"].map((sev) => (
            <button
              key={sev}
              onClick={() => {
                setActiveSeverity(sev);
                setUnchanged(false);
              }}
              className={`px-4 py-2 rounded ${
                activeSeverity === sev && !unchanged
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
              }`}
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}
        </div>

        {/* сетка позвонков (отключена если "не изменена") */}
        {!unchanged && (
          <div className="grid grid-cols-8 gap-2 overflow-y-auto max-h-[500px] pr-2">
            {vertebrae.map((v) => (
              <button
                key={v}
                onClick={() => toggleVertebra(v)}
                className={`px-3 py-2 border rounded text-sm ${
                  selected[activeSeverity]?.includes(v)
                    ? "bg-yellow-500 text-black border-yellow-400"
                    : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={insertSelected}
          disabled={
            !unchanged &&
            ["умеренно","выраженно","резко"].every(s => selected[s].length === 0)
          }
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            unchanged || ["умеренно","выраженно","резко"].some(s => selected[s].length > 0)
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
