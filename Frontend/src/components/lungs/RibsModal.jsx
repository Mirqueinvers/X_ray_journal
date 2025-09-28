// Frontend/src/components/lungs/RibsModal.jsx
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function RibsModal({ onClose, textareaRef }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSide, setSelectedSide] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [selectedSegments, setSelectedSegments] = useState([]);

  // Для уникальности используем Map с text как ключом
  const ribs = [
    { id: 1, text: "I ребро", pos: { top: "18%", left: "32%" } },
    { id: 2, text: "II ребро", pos: { top: "23%", left: "31%" } },
    { id: 3, text: "III ребро", pos: { top: "28%", left: "30%" } },
    { id: 4, text: "IV ребро", pos: { top: "33%", left: "29%" } },
    { id: 5, text: "V ребро", pos: { top: "38%", left: "28%" } },
    { id: 6, text: "VI ребро", pos: { top: "43%", left: "27%" } },
    { id: 7, text: "VII ребро", pos: { top: "48%", left: "26%" } },
    { id: 8, text: "VIII ребро", pos: { top: "53%", left: "25%" } },
    { id: 9, text: "IX ребро", pos: { top: "58%", left: "24%" } },
    { id: 10, text: "X ребро", pos: { top: "63%", left: "23%" } },
    { id: 11, text: "XI ребро", pos: { top: "68%", left: "22%" } },
    { id: 12, text: "XII ребро", pos: { top: "73%", left: "21%" } },
    { id: 13, text: "I ребро", pos: { top: "18%", left: "67%" } },
    { id: 14, text: "II ребро", pos: { top: "23%", left: "68%" } },
    { id: 15, text: "III ребро", pos: { top: "28%", left: "69%" } },
    { id: 16, text: "IV ребро", pos: { top: "33%", left: "70%" } },
    { id: 17, text: "V ребро", pos: { top: "38%", left: "71%" } },
    { id: 18, text: "VI ребро", pos: { top: "43%", left: "72%" } },
    { id: 19, text: "VII ребро", pos: { top: "48%", left: "73%" } },
    { id: 20, text: "VIII ребро", pos: { top: "53%", left: "74%" } },
    { id: 21, text: "IX ребро", pos: { top: "58%", left: "75%" } },
    { id: 22, text: "X ребро", pos: { top: "63%", left: "76%" } },
    { id: 23, text: "XI ребро", pos: { top: "68%", left: "77%" } },
    { id: 24, text: "XII ребро", pos: { top: "73%", left: "78%" } },
  ];

  const types = ["Перелом", "Деформация", "Остеопороз", "Остеосклероз"];
  const sides = ["Слева", "Справа"];
  const levels = ["I-II", "III-V", "VI-VIII", "IX-XII"];
  const intensities = ["Слабый", "Умеренный", "Выраженный"];

  const handleClickSelect = (value, setter, state) => {
    setter(state === value ? null : value);
  };

  const toggleSide = (side) => {
    setSelectedSide(prev =>
      prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
    );
  };

  const toggleLevel = (level) => {
    setSelectedLevel(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleSegment = (id) => {
    setSelectedSegments((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const insertSelected = () => {
    if (!textareaRef?.current || selectedSegments.length === 0) return;

    const textarea = textareaRef.current;
    const parts = selectedSegments.map(seg => {
      const typeText = selectedType ? selectedType.toLowerCase() : "";
      const sideText = selectedSide.length > 0 ? selectedSide.join(", ") + " " : "";
      const levelText = selectedLevel.length > 0 ? "уровни " + selectedLevel.join(", ") : "";
      const intensityText = selectedIntensity ? 
        selectedIntensity === "Слабый" ? "слабой" :
        selectedIntensity === "Умеренный" ? "умеренной" :
        "выраженной"
        : "";

      return `В ${sideText}${seg} ${typeText}${intensityText ? ` ${intensityText}` : ""}${levelText ? `, ${levelText}` : ""}.`;
    });

    const current = textarea.value;
    textarea.value = current + (current.length > 0 ? " " : "") + parts.join(" ");
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="relative w-[983px] h-[680px] bg-gray-900 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-20"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Нижняя секция с картинкой и ребрами */}
        <div className="absolute top-0 w-full" style={{ height: "403px" }}>
          <img
            src="/images/lungs.jpg"
            alt="Легкие"
            className="w-full h-full object-cover rounded"
          />
          {ribs.map(({ id, text, pos }) => (
            <button
              key={id}
              onClick={() => toggleSegment(text)}
              className={`absolute w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-yellow-100/30 ${
                selectedSegments.includes(text) ? "bg-yellow-400/50" : ""
              }`}
              style={pos}
            >
              {id}
            </button>
          ))}
        </div>

        {/* Верхняя секция кнопок */}
        <div className="absolute bottom-0 left-0 w-full h-[270px] bg-gray-900 flex flex-col justify-center px-6 py-4 space-y-3">
          {/* Тип патологии */}
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-semibold">Тип патологии:</span>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => handleClickSelect(type, setSelectedType, selectedType)}
                className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                  selectedType === type ? "bg-yellow-400/50" : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Сторона */}
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-semibold">Сторона:</span>
            {sides.map((side) => (
              <button
                key={side}
                onClick={() => toggleSide(side)}
                className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                  selectedSide.includes(side) ? "bg-yellow-400/50" : ""
                }`}
              >
                {side}
              </button>
            ))}
          </div>

          {/* Уровень ребер */}
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-semibold">Уровень:</span>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                  selectedLevel.includes(level) ? "bg-yellow-400/50" : ""
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Интенсивность */}
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-semibold">Интенсивность:</span>
            {intensities.map((i) => (
              <button
                key={i}
                onClick={() => handleClickSelect(i, setSelectedIntensity, selectedIntensity)}
                className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                  selectedIntensity === i ? "bg-yellow-400/50" : ""
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          {/* Кнопка добавить */}
          <div className="mt-2">
            <button
              onClick={() => {
                insertSelected();
                onClose();
              }}
              className="px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}