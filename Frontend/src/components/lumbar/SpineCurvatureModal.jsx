import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SpineCurvatureModal({ onClose, textareaRef }) {
  const [selected, setSelected] = useState([]);
  const [curveType, setCurveType] = useState("C-образно");
  const [cobbAngle, setCobbAngle] = useState("");

  const vertebraeGroups = {
    "Шейный отдел": ["C1","C2","C3","C4","C5","C6","C7"],
    "Грудной отдел": ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"],
    "Поясничный отдел": ["L1","L2","L3","L4","L5"],
    "Крестцовый отдел": ["S1","S2","S3","S4","S5"],
  };

  const allVertebrae = Object.values(vertebraeGroups).flat();

  const maxSelect = curveType === "C-образно" ? 3 : 4;

  const toggleSelect = (v) => {
    if (selected.includes(v)) {
      setSelected(selected.filter((x) => x !== v));
    } else if (selected.length < maxSelect) {
      setSelected([...selected, v]);
    } else {
      setSelected([...selected.slice(0, maxSelect - 1), v]);
    }
  };

  const insertSelected = () => {
    if (!textareaRef.current) return;
    if ((curveType === "C-образно" && selected.length !== 3) ||
        (curveType === "S-образно" && selected.length !== 4)) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const sortedSelected = selected.slice().sort((a,b) => allVertebrae.indexOf(a) - allVertebrae.indexOf(b));

    let insertText = "";

    if (curveType === "C-образно") {
      const from = sortedSelected[0];
      const to = sortedSelected[2];
      const mid = sortedSelected[1];

      insertText = `Позвоночный столб ${curveType} искривлен на уровне ${from}-${to} с высотой в ${mid}`;
      if (cobbAngle.trim() !== "") {
        insertText += `, угол отклонения ${cobbAngle}° по методу Кобба`;
      }
      insertText += ".\n";
    } else {
      // S-образно
      const from = sortedSelected[0];
      const to = sortedSelected[3];
      const mid1 = sortedSelected[1];
      const mid2 = sortedSelected[2];

      insertText = `Позвоночный столб ${curveType} искривлен на уровне ${from}-${to} с высотой искривления в ${mid1} и ${mid2}.\n`;
    }

    const newText = value.substring(0, start) + insertText + value.substring(end);
    textarea.value = newText;

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    textarea.focus();
    textarea.setSelectionRange(start + insertText.length, start + insertText.length);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative w-[750px] h-[750px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">Выберите {maxSelect} позвонка{maxSelect > 1 ? "s" : ""}</h2>

        <div className="flex gap-4 mb-4">
          {["C-образно", "S-образно"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setCurveType(type);
                setSelected([]);
                setCobbAngle(""); // сброс угла при смене типа
              }}
              className={`px-4 py-2 rounded border ${
                curveType === type
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Угол отклонения только для С-образного */}
        {curveType === "C-образно" && (
          <div className="mb-4">
            <label className="text-yellow-300 mr-2">Угол отклонения (°):</label>
            <input
              type="number"
              value={cobbAngle}
              onChange={(e) => setCobbAngle(e.target.value)}
              className="px-2 py-1 rounded bg-gray-700 text-yellow-200 border border-gray-500 w-24"
            />
          </div>
        )}

        <div className="space-y-4 overflow-y-auto max-h-[520px] pr-2">
          {Object.entries(vertebraeGroups).map(([section, verts]) => (
            <div key={section}>
              <h3 className="text-yellow-400 mb-2">{section}</h3>
              <div className="grid grid-cols-8 gap-2">
                {verts.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleSelect(v)}
                    className={`px-3 py-2 border rounded text-sm ${
                      selected.includes(v)
                        ? "bg-yellow-500 text-black border-yellow-400"
                        : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={insertSelected}
          disabled={selected.length !== maxSelect}
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            selected.length === maxSelect
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
