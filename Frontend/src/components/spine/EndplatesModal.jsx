// Frontend/src/components/lumbar/EndplatesModal.jsx
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function EndplatesModal({ onClose, insertTextToTextarea }) {
  const [activeSeverity, setActiveSeverity] = useState(null);
  const [selected, setSelected] = useState({
    умеренно: [],
    выраженно: [],
    резко: [],
  });
  const [unchanged, setUnchanged] = useState(true);
  const [activeShmorl, setActiveShmorl] = useState(false);

  const [shmorl, setShmorl] = useState([]); // [{vertebra: "L2", side: "верхней"}]

  const vertebrae = [
    "C1","C2","C3","C4","C5","C6","C7",
    "Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12",
    "L1","L2","L3","L4","L5",
    "S1","S2","S3","S4","S5",
  ];

  const toggleVertebra = (v) => {
    if (unchanged || activeShmorl) return;
    const copy = [...selected[activeSeverity]];
    const idx = copy.indexOf(v);
    if (idx >= 0) copy.splice(idx, 1);
    else copy.push(v);
    setSelected({ ...selected, [activeSeverity]: copy });
  };

  const toggleShmorl = (v, side) => {
    const key = `${v}-${side}`;
    if (shmorl.find((s) => s.vertebra === v && s.side === side)) {
      setShmorl(shmorl.filter((s) => !(s.vertebra === v && s.side === side)));
    } else {
      setShmorl([...shmorl, { vertebra: v, side }]);
    }
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

  const joinWithAnd = (arr) => {
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(", ") + " и " + arr[arr.length - 1];
  };


const insertSelected = () => {
  // ВАША ЛОГИКА ГЕНЕРАЦИИ ТЕКСТА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ
  let insertText = "";

  if (unchanged && shmorl.length === 0) {
    insertText =
      "Замыкательные пластинки ровные, чёткие, склеротических и деструктивных изменений не выявлено.";
  } else {
    let sclerosisParts = [];
    let shmorlParts = [];

    for (const sev of ["умеренно", "выраженно", "резко"]) {
      const segs = buildSegments(selected[sev]);
      if (segs.length > 0) {
        let sevText =
          sev === "умеренно"
            ? "умеренно выраженный"
            : sev === "выраженно"
            ? "выраженный"
            : "резко выраженный";

        sclerosisParts.push(
          `${sevText} склероз смежных замыкательных пластинок тел ${segs.join(", ")}`
        );
      }
    }

    if (sclerosisParts.length > 0) {
      insertText += `Определяется ${sclerosisParts.join(", ")}.`;
    }

    if (shmorl.length > 0) {
      const grouped = {};
      shmorl.forEach(({ vertebra, side }) => {
        if (!grouped[vertebra]) grouped[vertebra] = [];
        grouped[vertebra].push(side);
      });

      const shmorlTexts = Object.entries(grouped).map(([v, sides]) => {
        if (sides.length === 2) {
          return `верхней и нижней замыкательных пластинок тела ${v} позвонка`;
        } else {
          return `${sides[0]} замыкательной пластинки тела ${v} позвонка`;
        }
      });

      if (insertText) insertText += " ";
      insertText += `Определяется узуративный дефект ${joinWithAnd(shmorlTexts)}.`;
    }
  }

  if (!insertText) return;
  
  // --- ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ ---
  // Добавляем переносы строки и используем пропс для вставки
  const finalText = `\n${insertText}`;
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
        className="relative w-[850px] h-[700px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">
          Замыкательные пластинки
        </h2>

        {/* кнопки режимов */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => {
              setUnchanged(true);
              setActiveSeverity(null);
              setActiveShmorl(false);
              setSelected({ умеренно: [], выраженно: [], резко: [] });
            }}
            className={`px-4 py-2 rounded ${
              unchanged && !activeShmorl
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
            }`}
          >
            Не изменены
          </button>

          {["умеренно","выраженно","резко"].map((sev) => (
            <button
              key={sev}
              onClick={() => {
                setActiveSeverity(sev);
                setActiveShmorl(false);
                setUnchanged(false);
              }}
              className={`px-4 py-2 rounded ${
                activeSeverity === sev && !unchanged && !activeShmorl
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
              }`}
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}

          <button
            onClick={() => {
              setActiveShmorl(true);
              setActiveSeverity(null);
              setUnchanged(false);
            }}
            className={`px-4 py-2 rounded ${
              activeShmorl
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
            }`}
          >
            Грыжи Шморля
          </button>
        </div>

        {/* сетка позвонков для склероза */}
        {!unchanged && !activeShmorl && (
          <div className="grid grid-cols-8 gap-2 overflow-y-auto max-h-[250px] pr-2 mb-4">
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

        {/* блок грыж Шморля */}
        {activeShmorl && (
          <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-[400px] pr-2">
            {vertebrae.map((v) => (
              <div key={v} className="flex flex-col items-center bg-gray-800 rounded p-2">
                <span className="text-yellow-200 text-sm mb-1">{v}</span>
                <button
                  onClick={() => toggleShmorl(v, "верхней")}
                  className={`px-2 py-1 text-xs rounded mb-1 ${
                    shmorl.find((s) => s.vertebra === v && s.side === "верхней")
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
                  }`}
                >
                  Верхняя
                </button>
                <button
                  onClick={() => toggleShmorl(v, "нижней")}
                  className={`px-2 py-1 text-xs rounded ${
                    shmorl.find((s) => s.vertebra === v && s.side === "нижней")
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
                  }`}
                >
                  Нижняя
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={insertSelected}
          disabled={
            !unchanged &&
            ["умеренно","выраженно","резко"].every(s => selected[s].length === 0) &&
            shmorl.length === 0
          }
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            unchanged || ["умеренно","выраженно","резко"].some(s => selected[s].length > 0) || shmorl.length > 0
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
