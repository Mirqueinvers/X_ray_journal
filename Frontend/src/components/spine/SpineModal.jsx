import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SpineModal({ onClose, insertTextToTextarea }) {
  const [selected, setSelected] = useState([]);

  // Группы позвонков
  const vertebraeGroups = {
    "Шейный отдел": ["C1","C2","C3","C4","C5","C6","C7"],
    "Грудной отдел": ["Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12"],
    "Поясничный отдел": ["L1","L2","L3","L4","L5"],
    "Крестцовый отдел": ["S1","S2","S3","S4","S5"],
  };

  const allVertebrae = Object.values(vertebraeGroups).flat();

  const toggleSelect = (v) => {
    if (selected.includes(v)) {
      setSelected(selected.filter((x) => x !== v));
    } else if (selected.length < 2) {
      setSelected([...selected, v]);
    } else {
      setSelected([selected[0], v]); // максимум 2
    }
  };

const insertSelected = () => {
  if (selected.length !== 2) return;

  // ВАША ЛОГИКА ГЕНЕРАЦИИ ТЕКСТА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ
  const firstIndex = allVertebrae.indexOf(selected[0]);
  const secondIndex = allVertebrae.indexOf(selected[1]);
  const [from, to] =
    firstIndex < secondIndex
      ? [selected[0], selected[1]]
      : [selected[1], selected[0]];
  const insertText = `Позвоночный столб визуализируется на уровне ${from}-${to}.`;

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
        className="relative w-[750px] h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-yellow-300 text-lg mb-4">Выберите 2 позвонка</h2>

        {/* Секции по отделам */}
        <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
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

        {/* Добавить */}
        <button
          onClick={insertSelected}
          disabled={selected.length !== 2}
          className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
            selected.length === 2
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
