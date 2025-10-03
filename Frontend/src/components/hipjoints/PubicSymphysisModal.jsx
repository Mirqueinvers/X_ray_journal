// Frontend/src/components/hipjoints/PubicSymphysisModal.jsx
import React, { useState } from "react";

export default function PubicSymphysisModal({ isOpen, onClose, textareaRef }) {
  const [selectedOptions, setSelectedOptions] = useState({
    symmetry: "",
    osteophytes: [],
    surfaces: "",
  });
  const [isNormal, setIsNormal] = useState(false);

  const handleNormalClick = () => {
    setIsNormal(true);
    setSelectedOptions({ symmetry: "", osteophytes: [], surfaces: "" });
  };

  const handleSymmetryChange = (option) => {
    setIsNormal(false);
    setSelectedOptions(prev => ({ ...prev, symmetry: option }));
  };

  const handleOsteophytesChange = (option) => {
    setIsNormal(false);
    setSelectedOptions(prev => ({
      ...prev,
      osteophytes: prev.osteophytes.includes(option)
        ? prev.osteophytes.filter(opt => opt !== option)
        : [...prev.osteophytes, option]
    }));
  };

  const handleSurfacesChange = (option) => {
    setIsNormal(false);
    setSelectedOptions(prev => ({ ...prev, surfaces: option }));
  };

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

const generateDescription = () => {
  // Если выбрана Норма
  if (isNormal) return "Лонное сочленение симметрично";

  // Начало описания
  let description = "Лонное сочленение";

  // Симметричность
  if (selectedOptions.symmetry === "Ассиметричная") {
    description += " ассиметрично"; // без запятой
  } else if (selectedOptions.symmetry === "Симметрична") {
    description += " симметрично"; // без запятой
  }

  const otherParts = [];

  // Остеофиты
  if (selectedOptions.osteophytes.length > 0) {
    const mapping = {
      "Верхние": "верхнего",
      "Нижние": "нижнего"
    };
    const mapped = selectedOptions.osteophytes.map(opt => mapping[opt] || opt);

    let osteophytesText = "";
    if (mapped.length === 1) {
      osteophytesText = mapped[0] + " края";
    } else if (mapped.length === 2) {
      osteophytesText = mapped[0] + " и " + mapped[1] + " края";
    } else {
      osteophytesText = mapped.slice(0, -1).join(", ") + " и " + mapped[mapped.length - 1] + " края";
    }

    otherParts.push(`имеются остеофиты в области ${osteophytesText}`);
  }

  // Суставные поверхности
  if (selectedOptions.surfaces && selectedOptions.surfaces !== "Не изменены") {
    otherParts.push(`суставные поверхности ${selectedOptions.surfaces.toLowerCase()}`);
  }

  // Если есть остеофиты или суставные поверхности, добавляем их через запятую
  if (otherParts.length > 0) {
    description += ", " + otherParts.join(", ");
  }

  return description + ".";
};







  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10" title="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          
          {/* Норма */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-medium mb-2">Норма</h3>
            <button
              className={`w-[11%] p-3 bg-gray-700 border rounded text-yellow-200 border-yellow-500 transition-colors ${
                isNormal ? "bg-yellow-500 text-gray-900 border-yellow-400" : "hover:bg-gray-600"
              }`}
              onClick={handleNormalClick}
            >
              Норма
            </button>
          </div>

          {/* Симметричность */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-medium mb-2">Симметричность</h3>
            <div className="flex space-x-3">
              {["Симметрична", "Ассиметричная"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedOptions.symmetry === option
                      ? "bg-yellow-500 text-gray-900 border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-yellow-500 hover:bg-gray-600"
                  }`}
                  onClick={() => handleSymmetryChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Остеофиты */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-medium mb-2">Остеофиты</h3>
            <div className="flex flex-wrap gap-2">
              {["Верхние", "Нижние"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedOptions.osteophytes.includes(option)
                      ? "bg-yellow-500 text-gray-900 border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-yellow-500 hover:bg-gray-600"
                  }`}
                  onClick={() => handleOsteophytesChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Суставные поверхности */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-medium mb-2">Суставные поверхности</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Не изменены",
                "Незначительно склерозированы",
                "Умеренно склерозированы",
                "Выраженно склерозированы"
              ].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedOptions.surfaces === option
                      ? "bg-yellow-500 text-gray-900 border-yellow-400"
                      : "bg-gray-700 text-yellow-200 border-yellow-500 hover:bg-gray-600"
                  }`}
                  onClick={() => handleSurfacesChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            <button 
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
              onClick={() => {
                insertTextToTextarea(generateDescription());
                onClose();
              }}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
