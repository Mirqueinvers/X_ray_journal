import { useState } from "react";
import BaseModal from "../common/BaseModal";
import VertebraeGrid from "./VertebraeGrid";
import { buildSegments } from "./spine";

export default function InstabilityModal({ onClose, insertTextToTextarea }) {
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

  const insertSelected = () => {
    let insertText = "";

    if (mode === "Норма") {
      insertText = "Соотношение задних отделов тел позвонков не изменено.";
    } else {
      if (!selectedDirection || !selectedMagnitude || selectedVertebrae.length === 0) return;
      const segs = buildSegments(selectedVertebrae, vertebrae);
      const firstVertebra = selectedVertebrae[0];
      insertText = `Определяется нестабильность позвонков в сегменте ${segs.join(", ")} за счет смещения ${firstVertebra.toUpperCase()} ${selectedDirection.toLowerCase()} на величину ${selectedMagnitude}.`;
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
          <div className="mb-4">
            <VertebraeGrid
              vertebrae={vertebrae}
              selected={selectedVertebrae}
              onToggle={toggleVertebra}
            />
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
    </BaseModal>
  );
}