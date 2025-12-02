import { useState } from "react";
import BaseModal from "../common/BaseModal";
import VertebraeGrid from "./VertebraeGrid";
import { buildSegments } from "./spine";

export default function OsteophytesModal({ onClose, insertTextToTextarea }) {
  const [activeSurface, setActiveSurface] = useState("передние");
  const [selected, setSelected] = useState({
    передние: [],
    боковые: [],
  });

  const vertebrae = [
    "C1","C2","C3","C4","C5","C6","C7",
    "Th1","Th2","Th3","Th4","Th5","Th6","Th7","Th8","Th9","Th10","Th11","Th12",
    "L1","L2","L3","L4","L5",
    "S1","S2","S3","S4","S5",
  ];

  const toggleVertebra = (v) => {
    const copy = [...selected[activeSurface]];
    const idx = copy.indexOf(v);
    if (idx >= 0) copy.splice(idx, 1);
    else copy.push(v);
    setSelected({ ...selected, [activeSurface]: copy });
  };

  const insertSelected = () => {
    let parts = [];
    if (selected.передние.length > 0) {
      parts.push(`по передним поверхностям тел ${buildSegments(selected.передние, vertebrae).join(", ")}`);
    }
    if (selected.боковые.length > 0) {
      parts.push(`и боковым поверхностям тел ${buildSegments(selected.боковые, vertebrae).join(", ")}`);
    }
    if (parts.length === 0) return;
    const insertText = `\nОпределяются краевые костные разрастания ${parts.join(" ")}.`;

    insertTextToTextarea(insertText);
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
      contentClassName="w-[800px] h-[650px] overflow-hidden p-6"
    >
      <h2 className="text-yellow-300 text-lg mb-4">Выберите позвонки для остеофитов</h2>

      {/* кнопки поверхностей */}
      <div className="flex gap-2 mb-4">
        {["передние", "боковые"].map((surf) => (
          <button
            key={surf}
            onClick={() => setActiveSurface(surf)}
            className={`px-4 py-2 rounded ${
              activeSurface === surf ? "bg-yellow-400 text-black" : "bg-gray-700 text-yellow-200 hover:bg-gray-600"
            }`}
          >
            {surf.charAt(0).toUpperCase() + surf.slice(1)}
          </button>
        ))}
      </div>

      {/* сетка позвонков */}
      <div className="mb-4">
        <VertebraeGrid
          vertebrae={vertebrae}
          selected={selected[activeSurface]}
          onToggle={toggleVertebra}
        />
      </div>

      <button
        onClick={insertSelected}
        disabled={selected.передние.length === 0 && selected.боковые.length === 0}
        className={`absolute bottom-4 right-4 px-6 py-2 rounded ${
          selected.передние.length > 0 || selected.боковые.length > 0
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-gray-600 text-gray-400 cursor-not-allowed"
        }`}
      >
        Добавить
      </button>
    </BaseModal>
  );
}