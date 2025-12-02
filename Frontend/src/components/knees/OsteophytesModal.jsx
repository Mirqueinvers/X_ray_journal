// Frontend/src/components/knees/OsteophytesModal.jsx
import { useState } from "react";
import BaseModal from "../common/BaseModal.jsx";

const OSTEOPHYTES_DATA = [
  { id: 1, text: "латеральной поверхности левой бедренной кости", pos: { top: "30%", right: "22%" } },
  { id: 2, text: "медиальной поверхности левой бедренной кости", pos: { top: "30%", right: "35%" } },
  { id: 3, text: "медиальной поверхности левой большеберцовой кости", pos: { bottom: "50%", right: "35%" } },
  { id: 4, text: "латеральной поверхности левой большеберцовой кости", pos: { bottom: "50%", right: "22%" } },
  { id: 5, text: "латеральной поверхности правой бедренной кости", pos: { top: "30%", left: "22%" } },
  { id: 6, text: "медиальной поверхности правой бедренной кости", pos: { top: "30%", left: "35%" } },
  { id: 7, text: "медиальной поверхности правой большеберцовой кости", pos: { bottom: "50%", left: "35%" } },
  { id: 8, text: "латеральной поверхности правой большеберцовой кости", pos: { bottom: "50%", left: "22%" } },
];

export default function OsteophytesModal({ onClose, insertTextToTextarea }) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (text) => {
    setSelected(prev => prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]);
  };

  const generateInsertText = (selected) => {
    const surfaceMap = { "медиальная": "медиальной", "латеральная": "латеральной" };
    const surfacePluralMap = { "медиальная": "медиальных", "латеральная": "латеральных" };
    const boneMap = { "бедренная": "бедренной", "большеберцовая": "большеберцовой" };
    const bonePluralMap = { "бедренная": "бедренных", "большеберцовая": "большеберцовых" };

    const table = {
      "медиальная": { "бедренная": { left: false, right: false }, "большеберцовая": { left: false, right: false } },
      "латеральная": { "бедренная": { left: false, right: false }, "большеберцовая": { left: false, right: false } },
    };

    selected.forEach(text => {
      const side = text.includes("левой") ? "left" : "right";
      const surface = text.includes("латеральной") ? "латеральная" : "медиальная";
      const boneType = text.includes("бедренной") ? "бедренная" : "большеберцовая";
      table[surface][boneType][side] = true;
    });

    const allSurfaces = ["медиальная", "латеральная"];
    const allBones = ["бедренная", "большеберцовая"];
    const allSelected = allSurfaces.every(surf =>
      allBones.every(bone => table[surf][bone].left && table[surf][bone].right)
    );

    if (allSelected) {
      return `Определяются краевые костные разрастания на ${surfacePluralMap["медиальная"]} и ${surfacePluralMap["латеральная"]} поверхностях ${bonePluralMap["бедренная"]} и ${bonePluralMap["большеберцовая"]} костей.`;
    }

    const parts = [];

    Object.entries(table).forEach(([surface, bones]) => {
      Object.entries(bones).forEach(([bone, sides]) => {
        if (sides.left && sides.right) {
          parts.push(`${surfacePluralMap[surface]} поверхностях ${bonePluralMap[bone]} костей`);
        } else {
          if (sides.left) parts.push(`${surfaceMap[surface]} поверхности левой ${boneMap[bone]} кости`);
          if (sides.right) parts.push(`${surfaceMap[surface]} поверхности правой ${boneMap[bone]} кости`);
        }
      });
    });

    const mergeSurfacesSameBone = (parts) => {
      const merged = [];
      const used = new Set();

      for (let i = 0; i < parts.length; i++) {
        if (used.has(i)) continue;
        const part = parts[i];
        const match = part.match(/(медиальной|латеральной) поверхности (левой|правой) (бедренной|большеберцовой) кости/);
        if (match) {
          const [_, surface, side, bone] = match;
          const otherIndex = parts.findIndex((p, idx) => {
            if (idx === i || used.has(idx)) return false;
            return p.includes(`${side} ${bone} кости`) &&
                   ((surface === "медиальной" && p.includes("латеральной")) ||
                    (surface === "латеральной" && p.includes("медиальной")));
          });
          if (otherIndex !== -1) {
            merged.push(`медиальной и латеральной поверхностях ${side} ${bone} кости`);
            used.add(i);
            used.add(otherIndex);
            continue;
          }
        }
        merged.push(part);
        used.add(i);
      }
      return merged;
    };

    const finalParts = mergeSurfacesSameBone(parts);

    if (finalParts.length === 1) return `Определяются краевые костные разрастания на ${finalParts[0]}.`;
    if (finalParts.length === 2) return `Определяются краевые костные разрастания на ${finalParts.join(" и ")}.`;
    return `Определяются краевые костные разрастания на ${finalParts.slice(0, -1).join(", ")}, ${finalParts[finalParts.length - 1]}.`;
  };

  const insertSelected = () => {
    if (selected.length === 0) return;
    const textToInsert = generateInsertText(selected);
    insertTextToTextarea("\n" + textToInsert);
    onClose();
  };

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      size="custom"
      showCloseButton={true}
      closeOnOverlayClick={true}
      className="bg-gray-800 text-white"
      contentClassName="w-[350mm] h-[148.5mm] overflow-hidden"
    >
      <div 
        className="w-full h-full relative" 
        style={{
          backgroundImage: `url(/images/knee-right.png), url(/images/knee-left.png)`,
          backgroundSize: "contain",
          backgroundPosition: "10% 95%, 90% 95%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#374151",
        }}
      >
        {OSTEOPHYTES_DATA.map(({ id, text, pos }) => (
          <button
            key={id}
            onClick={() => toggleSelect(text)}
            className={`absolute w-28 h-12 border rounded bg-black/40 border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
              selected.includes(text) ? "bg-yellow-400/50" : ""
            }`}
            style={pos}
          >
            {id}
          </button>
        ))}

        <button
          onClick={insertSelected}
          className="absolute bottom-4 right-4 px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Добавить
        </button>
      </div>
    </BaseModal>
  );
}