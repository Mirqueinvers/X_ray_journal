import { useState } from "react";
import BaseModal from "../common/BaseModal";
import VertebraeGrid from "./VertebraeGrid";

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

    const firstIndex = allVertebrae.indexOf(selected[0]);
    const secondIndex = allVertebrae.indexOf(selected[1]);
    const [from, to] =
      firstIndex < secondIndex
        ? [selected[0], selected[1]]
        : [selected[1], selected[0]];
    const insertText = `Позвоночный столб визуализируется на уровне ${from}-${to}.`;

    const finalText = `\n${insertText}`;
    insertTextToTextarea(finalText);
    onClose();
  };

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      size="custom"
      showCloseButton={true}
      closeOnOverlayClick={true}
      className="bg-gray-900 text-white"
      contentClassName="w-[750px] h-[600px] overflow-hidden p-6"
    >
      <h2 className="text-yellow-300 text-lg mb-4">Выберите 2 позвонка</h2>

      {/* Секции по отделам */}
      <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
        {Object.entries(vertebraeGroups).map(([section, verts]) => (
          <div key={section}>
            <h3 className="text-yellow-400 mb-2">{section}</h3>
            <VertebraeGrid
              vertebrae={verts}
              selected={selected}
              onToggle={toggleSelect}
              max={2}
            />
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
    </BaseModal>
  );
}