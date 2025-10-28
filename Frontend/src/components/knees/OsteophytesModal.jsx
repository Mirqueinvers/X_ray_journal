import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function OsteophytesModal({ onClose, textareaRef }) {
  const [selected, setSelected] = useState([]);

  const osteophytes = [
    { id: 1, text: "латеральной поверхности левой бедренной кости", pos: { top: "15%", right: "10%" } },
    { id: 2, text: "медиальной поверхности левой бедренной кости", pos: { top: "15%", right: "30%" } },
    { id: 3, text: "медиальной поверхности левой большеберцовой кости", pos: { bottom: "15%", right: "30%" } },
    { id: 4, text: "латеральной поверхности левой большеберцовой кости", pos: { bottom: "15%", right: "10%" } },
    { id: 5, text: "латеральной поверхности правой бедренной кости", pos: { top: "15%", left: "10%" } },
    { id: 6, text: "медиальной поверхности правой бедренной кости", pos: { top: "15%", left: "30%" } },
    { id: 7, text: "медиальной поверхности правой большеберцовой кости", pos: { bottom: "15%", left: "30%" } },
    { id: 8, text: "латеральной поверхности правой большеберцовой кости", pos: { bottom: "15%", left: "10%" } },
  ];

  const toggleSelect = (text) => {
    setSelected((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
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
          parts.push(`${surfacePluralMap[surface]} поверхностях ${boneMap[bone]} кости`);
        } else {
          if (sides.left) parts.push(`${surfaceMap[surface]} поверхности левой ${boneMap[bone]} кости`);
          if (sides.right) parts.push(`${surfaceMap[surface]} поверхности правой ${boneMap[bone]} кости`);
        }
      });
    });

    // --- Объединяем медиальную и латеральную поверхности одной кости ---
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
  if (!textareaRef.current || selected.length === 0) return;
  const textarea = textareaRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  let insertText = generateInsertText(selected);

  // 🟡 исключения для "медиальной и латеральной поверхностей одной кости"
  insertText = insertText
    .replace(/медиальной поверхности (левой|правой) (\S+) кости и латеральной поверхности \1 \2 кости/g,
             "медиальной и латеральной поверхностях $1 $2 кости")
    .replace(/латеральной поверхности (левой|правой) (\S+) кости и медиальной поверхности \1 \2 кости/g,
             "медиальной и латеральной поверхностях $1 $2 кости")
    .replace(/медиальных поверхностях бедренной кости/g, "медиальных поверхностях бедренных костей")
    .replace(/латеральных поверхностях бедренной кости/g, "латеральных поверхностях бедренных костей")
    .replace(/медиальных поверхностях большеберцовой кости/g, "медиальных поверхностях большеберцовых костей")
    .replace(/латеральных поверхностях большеберцовой кости/g, "латеральных поверхностях большеберцовых костей");         
             

  // 🟡 исключения для множественных костей (бедренных и большеберцовых)
  insertText = insertText
    .replace(/медиальных поверхностях бедренной кости и медиальных поверхностях большеберцовой кости/g,
             "медиальных поверхностях бедренных и большеберцовых костей")
    .replace(/латеральных поверхностях бедренной кости и латеральных поверхностях большеберцовой кости/g,
             "латеральных поверхностях бедренных и большеберцовых костей");

  const newText = value.substring(0, start) + insertText + "\n" + value.substring(end);
  textarea.value = newText;

  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  textarea.focus();
  textarea.setSelectionRange(start + newText.length, start + newText.length);
  onClose();
};


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[800px] h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-20"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <img
          src="/images/knee-xray.jpg"
          alt="Картинка коленного сустава"
          className="w-full h-full object-cover"
        />

        {osteophytes.map(({ id, text, pos }) => (
          <button
            key={id}
            onClick={() => toggleSelect(text)}
            className={`absolute w-28 h-12 border rounded bg-black/40 border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
              selected.includes(text) ? "bg-yellow-400/50" : ""
            }`}
            style={pos}
          >
            {id} {/* <-- вместо обрезанного текста теперь выводим id */}
          </button>
        ))}

        <button
          onClick={insertSelected}
          className="absolute bottom-4 right-4 px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
