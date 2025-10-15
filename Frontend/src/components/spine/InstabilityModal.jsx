import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function InstabilityModal({ onClose, textareaRef }) {
  const [mode, setMode] = useState("Норма"); // "Норма" или "Нестабильность"
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedMagnitude, setSelectedMagnitude] = useState(null);
  const [selectedVertebrae, setSelectedVertebrae] = useState([]);

  const vertebrae = [
    "C1","C2","C3","C4","C5","C6","C7",
    "Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12",
    "L1","L2","L3","L4","L5",
    "S1","S2","S3","S4","S5",
  ];

  const directions = ["Кпереди", "Кзади"];
  const magnitudes = [
    "1/2 тела позвонка",
    "1/3 тела позвонка",
    "1/4 тела позвонка",
    "1/5 тела позвонка"
  ];

  const toggleVertebra = (v) => {
    const copy = [...selectedVertebrae];
    const idx = copy.indexOf(v);
    if (idx >= 0) copy.splice(idx, 1);
    else copy.push(v);
    setSelectedVertebrae(copy);
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
    if (!textareaRef.current) return;
    let insertText = "";

    if (mode === "Норма") {
      insertText = "Соотношение задних отделов тел позвонков не изменено.";
    } else {
      if (!selectedDirection || !selectedMagnitude || selectedVertebrae.length === 0) return;
      const segs = buildSegments(selectedVertebrae);
      const firstVertebra = selectedVertebrae[0];
      insertText = `Определяется нестабильность позвонков в сегменте ${segs.join(", ")} за счет смещения ${firstVertebra.toUpperCase()} ${selectedDirection.toLowerCase()} на величину ${selectedMagnitude}.`;
    }

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const newText = value.substring(0, start) + insertText + value.substring(end);

    textarea.value = newText;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
    textarea.setSelectionRange(start + insertText.length, start + insertText.length);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="relative w-[850px] h-[700px] bg-gray-900 rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">Соотношение позвонков</h2>

        {/* Переключатели режимов */}
        <div className="flex gap-3 mb-4">
          {["Норма", "Нестабильность"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg font-medium ${
                mode === m
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === "Нестабильность" && (
          <>
            {/* сетка позвонков */}
            <div className="grid grid-cols-8 gap-2 overflow-y-auto max-h-[300px] pr-2 mb-4">
              {vertebrae.map((v) => (
                <button
                  key={v}
                  onClick={() => toggleVertebra(v)}
                  className={`px-3 py-2 border rounded text-sm ${
                    selectedVertebrae.includes(v)
                      ? "bg-yellow-500 text-black border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* направление */}
            <div className="flex gap-2 mb-2 mt-2">
              {directions.map((dir) => (
                <button
                  key={dir}
                  onClick={() => setSelectedDirection(dir)}
                  className={`px-4 py-2 rounded ${
                    selectedDirection === dir
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>

            {/* величина */}
            <div className="flex gap-2 mb-4">
              {magnitudes.map((mag) => (
                <button
                  key={mag}
                  onClick={() => setSelectedMagnitude(mag)}
                  className={`px-4 py-2 rounded ${
                    selectedMagnitude === mag
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
                  }`}
                >
                  {mag}
                </button>
              ))}
            </div>
          </>
        )}

        {/* кнопка Добавить */}
        <button
          onClick={insertSelected}
          disabled={
            mode === "Нестабильность" &&
            (!selectedDirection || !selectedMagnitude || selectedVertebrae.length === 0)
          }
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            mode === "Норма" ||
            (selectedDirection && selectedMagnitude && selectedVertebrae.length > 0)
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
