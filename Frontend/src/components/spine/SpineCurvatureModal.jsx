import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SpineCurvatureModal({ onClose, insertTextToTextarea }) {
  const [selected, setSelected] = useState([]);
  const [curveType, setCurveType] = useState("не искривлена"); // по дефолту
  const [cobbAngle, setCobbAngle] = useState("");
  const [cCurveDirection, setCCurveDirection] = useState("влево"); // направление C-образного
  const [torsion, setTorsion] = useState(false);

  const vertebraeGroups = {
    "Шейный отдел": ["C1","C2","C3","C4","C5","C6","C7"],
    "Грудной отдел": ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"],
    "Поясничный отдел": ["L1","L2","L3","L4","L5"],
    "Крестцовый отдел": ["S1","S2","S3","S4","S5"],
  };

  const allVertebrae = Object.values(vertebraeGroups).flat();
  const maxSelect = curveType === "C-образно" ? 3 : curveType === "S-образно" ? 4 : 0;

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
  // ВАША ЛОГИКА ГЕНЕРАЦИИ ТЕКСТА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ
  let insertText = "";
  // --- не искривлена ---
  if (curveType === "не искривлена") {
    insertText = "Ось позвоночника не искривлена.";
  } else {
    const sortedSelected = selected.slice().sort(
      (a, b) => allVertebrae.indexOf(a) - allVertebrae.indexOf(b)
    );
    // --- C-образно ---
    if (curveType === "C-образно" && selected.length === 3) {
      const from = sortedSelected[0];
      const to = sortedSelected[2];
      const mid = sortedSelected[1];
      insertText = `Ось позвоночника ${curveType} искривлена ${cCurveDirection} на уровне ${from}-${to} с высотой в ${mid}`;
      if (cobbAngle.trim() !== "") {
        insertText += `, угол отклонения ${cobbAngle}° по методу Кобба`;
      }
      insertText += ".";
    }
    // --- S-образно ---
    if (curveType === "S-образно" && selected.length === 4) {
      const from = sortedSelected[0];
      const to = sortedSelected[3];
      const mid1 = sortedSelected[1];
      const mid2 = sortedSelected[2];
      insertText = `Позвоночный столб ${curveType} искривлен на уровне ${from}-${to} с высотой искривления в ${mid1} и ${mid2}.`;
    }
    // --- торсия ---
    if (torsion) {
      insertText = insertText.replace(/\.$/, ""); // убираем точку в конце
      insertText += ", определяется торсия позвонков на высоте изгиба.";
    }
  }

  if (!insertText) return;

  // --- ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ ---
  // Добавляем перенос строки и используем пропс для вставки
  const finalText = `\n${insertText}\n`;
  insertTextToTextarea(finalText);
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  onClose();
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative w-[750px] h-[750px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">
          Выберите {maxSelect || "тип искривления"} позвонка{maxSelect > 1 ? "s" : ""}
        </h2>

        <div className="flex gap-4 mb-4">
          {["не искривлена", "C-образно", "S-образно"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setCurveType(type);
                setSelected([]);
                setCobbAngle("");
                if(type !== "C-образно") setCCurveDirection("влево");
              }}
              className={`px-4 py-2 rounded border ${
                curveType === type
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Выбор направления для C-образного */}
        {curveType === "C-образно" && (
          <div className="flex gap-2 mb-4">
            {["влево","вправо"].map((dir) => (
              <button
                key={dir}
                onClick={() => setCCurveDirection(dir)}
                className={`px-4 py-2 rounded border ${
                  cCurveDirection === dir
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
                }`}
              >
                {dir.charAt(0).toUpperCase() + dir.slice(1)}
              </button>
            ))}
          </div>
        )}

        {curveType === "C-образно" && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTorsion(!torsion)}
              className={`px-4 py-2 rounded border ${
                torsion
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-gray-700 text-yellow-200 border-gray-500 hover:bg-gray-600"
              }`}
            >
              Торсия
            </button>
          </div>
        )}

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
          {curveType !== "не искривлена" && Object.entries(vertebraeGroups).map(([section, verts]) => (
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
                    disabled={curveType === "не искривлена"}
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
          disabled={curveType !== "не искривлена" && selected.length !== maxSelect}
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            curveType === "не искривлена" || selected.length === maxSelect
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
