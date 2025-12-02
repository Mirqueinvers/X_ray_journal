import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BaseModal from "../common/BaseModal";

export default function LungPatternModal({ onClose, insertTextToTextarea }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [selectedContour, setSelectedContour] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [selectedSegments, setSelectedSegments] = useState([]);

  // Для уникальности используем Map с text как ключом
  const areas = [
    { id: 1, text: "S1 правого легкого", pos: { top: "14%", left: "41%" } },
    { id: 2, text: "S2 правого легкого", pos: { top: "36.5%", left: "34.5%" } },
    { id: 3, text: "S3 правого легкого", pos: { top: "31%", left: "41%" } },
    { id: 4, text: "S4 правого легкого", pos: { top: "57%", left: "34.5%" } },
    { id: 5, text: "S5 правого легкого", pos: { top: "56%", left: "40%" } },
    { id: 6, text: "S8 правого легкого", pos: { top: "72.7%", left: "32.5%" } },
    { id: 7, text: "S1 левого легкого", pos: { top: "13%", left: "54.5%" } },
    { id: 8, text: "S2 левого легокго", pos: { top: "17%", left: "60%" } },
    { id: 9, text: "S3 левого легкого", pos: { top: "29%", left: "56%" } },
    { id: 10, text: "S4 левого легкого", pos: { top: "44%", left: "58.5%" } },
    { id: 11, text: "S5 левого легкого", pos: { top: "58%", left: "61%" } },
    { id: 12, text: "S8 левого легкого", pos: { top: "71%", left: "65%" } },
    { id: 13, text: "S1 левого легкого", pos: { top: "11%", left: "83.8%" } },
    { id: 14, text: "S2 левого легкого", pos: { top: "25%", left: "88%" } },
    { id: 15, text: "S3 левого легкого", pos: { top: "26%", left: "78.7%" } },
    { id: 16, text: "S6 левого легкого", pos: { top: "40%", left: "87.5%" } },
    { id: 17, text: "S4 левого легкого", pos: { top: "45%", left: "75%" } },
    { id: 18, text: "S5 левого легкого", pos: { top: "58%", left: "74%" } },
    { id: 19, text: "S7 левого легкого", pos: { top: "50%", left: "81.5%" } },
    { id: 20, text: "S8 левого легкого", pos: { top: "59%", left: "80%" } },
    { id: 21, text: "S9 левого легкого", pos: { top: "64.5%", left: "83.5%" } },
    { id: 22, text: "S10 левого легкого", pos: { top: "59%", left: "89%" } },
  ];

  const types = ["Инфильтративная", "Очаговая", "Округлая"];
  const intensities = ["Низкая", "Средняя", "Высокая"];
  const contours = ["Четкий", "Не четкий", "Ровный", "Не ровный"];
  const structures = ["Однородная", "Не однородная"];

  const handleClickSelect = (value, setter, state) => {
    setter(state === value ? null : value);
  };

  const toggleSegment = (id) => {
    setSelectedSegments((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const insertSelected = () => {
    if (selectedSegments.length === 0) return;

    // Сохраняем всю вашу сложную логику генерации текста
    const parts = selectedSegments.map((seg) => {
      const typeText = selectedType ? selectedType.toLowerCase() : "";
      
      const intensityText = selectedIntensity
        ? selectedIntensity === "Низкая" ? "низкой" :
          selectedIntensity === "Средняя" ? "средней" :
          "высокой"
        : "";

      const contourText = selectedContour.length > 0
        ? selectedContour.map(c => 
            c === "Четкий" ? "четким" :
            c === "Не четкий" ? "не четким" :
            c === "Ровный" ? "ровным" :
            "не ровным"
          ).join(", ")
        : "";

      const structureText = selectedStructure
        ? selectedStructure === "Однородная" ? "однородной" : "неоднородной"
        : "";

      const contourFormatted = contourText ? `с ${contourText} контуром` : "";
      const structureFormatted = structureText ? `${structureText} структуры` : "";

      return `В ${seg} определяется ${typeText} тень${intensityText ? ` ${intensityText} интенсивности` : ""}${contourFormatted ? `, ${contourFormatted}` : ""}${structureFormatted ? `, ${structureFormatted}` : ""}.`;
    });

    const finalText = parts.join(" ");
    
    // 2. Используем пропс для вставки
    insertTextToTextarea("\n" + finalText);
  };

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      size="custom"
      showCloseButton={true}
      closeOnOverlayClick={true}
      className="bg-gray-900 text-white"
      contentClassName="w-[983px] h-[680px] overflow-hidden"
    >
      {/* Нижняя секция с картинкой и сегментами */}
      <div className="absolute top-0 w-full" style={{ height: "403px" }}>
        <img
          src="/images/lungs.jpg"
          alt="Легкие"
          className="w-full h-full object-cover rounded"
        />
        {areas.map(({ id, text, pos }) => (
          <button
            key={id}
            onClick={() => toggleSegment(text)}
            className={`absolute w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-yellow-100/30 ${
              selectedSegments.includes(text) ? "bg-yellow-400/50" : ""
            }`}
            style={pos}
          />
        ))}
      </div>

      {/* Верхняя секция кнопок */}
      <div className="absolute bottom-0 left-0 w-full h-[270px] bg-gray-900 flex flex-col justify-center px-6 py-4 space-y-3">
        {/* Вид */}
        <div className="flex items-center space-x-4">
          <span className="text-yellow-400 font-semibold">Вид:</span>
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

        {/* Контур */}
        <div className="flex items-center space-x-4">
          <span className="text-yellow-400 font-semibold">Контур:</span>
          {contours.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedContour((prev) =>
                  prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c]
                );
              }}
              className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                selectedContour.includes(c) ? "bg-yellow-400/50" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Структура */}
        <div className="flex items-center space-x-4">
          <span className="text-yellow-400 font-semibold">Структура:</span>
          {structures.map((s) => (
            <button
              key={s}
              onClick={() => handleClickSelect(s, setSelectedStructure, selectedStructure)}
              className={`px-3 py-1.5 rounded-full border border-yellow-400 text-yellow-200 hover:bg-yellow-400/30 ${
                selectedStructure === s ? "bg-yellow-400/50" : ""
              }`}
            >
              {s}
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
    </BaseModal>
  );
}