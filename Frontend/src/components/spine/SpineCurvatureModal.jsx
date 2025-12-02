import { useState } from "react";
import BaseModal from "../common/BaseModal";
import GroupedVertebraeGrid from "./GroupedVertebraeGrid";

export default function SpineCurvatureModal({ onClose, insertTextToTextarea }) {
  const [selected, setSelected] = useState([]);
  const [curveType, setCurveType] = useState("не искривлена");
  const [cobbAngle, setCobbAngle] = useState("");
  const [cCurveDirection, setCCurveDirection] = useState("влево");
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
    let insertText = "";

    if (curveType === "не искривлена") {
      insertText = "Ось позвоночника не искривлена.";
    } else {
      const sortedSelected = selected.slice().sort(
        (a, b) => allVertebrae.indexOf(a) - allVertebrae.indexOf(b)
      );

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

      if (curveType === "S-образно" && selected.length === 4) {
        const from = sortedSelected[0];
        const to = sortedSelected[3];
        const mid1 = sortedSelected[1];
        const mid2 = sortedSelected[2];
        insertText = `Позвоночный столб ${curveType} искривлен на уровне ${from}-${to} с высотой искривления в ${mid1} и ${mid2}.`;
      }

      if (torsion) {
        insertText = insertText.replace(/\.$/, "");
        insertText += ", определяется торсия позвонков на высоте изгиба.";
      }
    }

    if (!insertText) return;

    const finalText = `\n${insertText}\n`;
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
      contentClassName="w-[750px] h-[750px] overflow-hidden p-6"
    >
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
              if (type !== "C-образно") setCCurveDirection("влево");
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

      {curveType !== "не искривлена" && (
        <GroupedVertebraeGrid
          groups={vertebraeGroups}
          selected={selected}
          onToggle={toggleSelect}
          max={maxSelect}
          disabled={curveType === "не искривлена"}
        />
      )}

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
    </BaseModal>
  );
}