import { useState } from "react";
import BaseModal from "../common/BaseModal";
import VertebraeGrid from "./VertebraeGrid";
import { buildSegments } from "./spine";

export default function IntervertebralDiscsModal({ onClose, insertTextToTextarea }) {
  const [activeSeverity, setActiveSeverity] = useState(null);
  const [selected, setSelected] = useState({
    умеренно: [],
    выраженно: [],
    резко: [],
  });
  const [unchanged, setUnchanged] = useState(true);

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

  const insertSelected = () => {
    let insertText = "";

    if (unchanged) {
      insertText = "Высота пространств межпозвонковых дисков не изменена.";
    } else {
      let parts = [];
      for (const sev of ["умеренно", "выраженно", "резко"]) {
        const segs = buildSegments(selected[sev], vertebrae);
        if (segs.length > 0) {
          parts.push(`${sev} снижена в сегментах ${segs.join(", ")}`);
        }
      }
      if (parts.length === 0) return;
      insertText = `Высота пространств межпозвонковых дисков ${parts.join(", ")}.`;
    }

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
      contentClassName="w-[800px] h-[650px] overflow-hidden p-6"
    >
      <h2 className="text-yellow-300 text-lg mb-4">Выберите позвонки и степень сужения</h2>

      {/* кнопки степеней + не изменена */}
      <div className="flex gap-2 mb-4 flex-wrap">
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
        <div className="mb-4">
          <VertebraeGrid
            vertebrae={vertebrae}
            selected={selected[activeSeverity] || []}
            onToggle={toggleVertebra}
            disabled={!activeSeverity}
          />
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
    </BaseModal>
  );
}