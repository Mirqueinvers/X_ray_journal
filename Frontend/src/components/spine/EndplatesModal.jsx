import { useState } from "react";
import BaseModal from "../common/BaseModal";
import VertebraeGrid from "./VertebraeGrid";
import { buildSegments, joinWithAnd } from "./spine";

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
    if (shmorl.find((s) => s.vertebra === v && s.side === side)) {
      setShmorl(shmorl.filter((s) => !(s.vertebra === v && s.side === side)));
    } else {
      setShmorl([...shmorl, { vertebra: v, side }]);
    }
  };

  const insertSelected = () => {
    let insertText = "";

    if (unchanged && shmorl.length === 0) {
      insertText =
        "Замыкательные пластинки ровные, чёткие, склеротических и деструктивных изменений не выявлено.";
    } else {
      let sclerosisParts = [];
      let shmorlParts = [];

      for (const sev of ["умеренно", "выраженно", "резко"]) {
        const segs = buildSegments(selected[sev], vertebrae);
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
      contentClassName="w-[850px] h-[700px] overflow-hidden p-6"
    >
      <h2 className="text-yellow-300 text-lg mb-4">Замыкательные пластинки</h2>

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
        <div className="mb-4">
          <VertebraeGrid
            vertebrae={vertebrae}
            selected={selected[activeSeverity] || []}
            onToggle={toggleVertebra}
            disabled={!activeSeverity}
          />
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
    </BaseModal>
  );
}