import { useState } from "react";
import BaseModal from "../common/BaseModal";

export default function PleuraExpansionModal({ onClose, insertTextToTextarea }) {
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    left: [],
    right: []
  });

  const sideOptions = ["Уплощена", "Спайка", "Релаксация", "Не четкая"];

  const toggleSide = (side) => {
    setSelectedSides(prev =>
      prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
    );
  };

  const toggleSideOption = (side, option) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[side];
      return {
        ...prev,
        [side]: currentOptions.includes(option)
          ? currentOptions.filter(opt => opt !== option)
          : [...currentOptions, option]
      };
    });
  };

  const toNoun = (word) => {
    switch (word.toLowerCase()) {
      case "уплощена": return "уплощение";
      case "спайка": return "спайка";
      case "релаксация": return "релаксация";
      case "не четкая": return "нечеткость";
      default: return word;
    }
  };

  const generateDescription = () => {
    const leftOpts = selectedOptions.left;
    const rightOpts = selectedOptions.right;

    const formatOption = (opt) => {
      switch(opt.toLowerCase()) {
        case "спайка": return "спайка";
        case "релаксация": return "релаксация";
        case "уплощена": return "уплощена";
        case "не четкая": return "не четкая";
        default: return opt;
      }
    };

    // Одинаковые опции на обеих сторонах
    const isBothSame = leftOpts.length && rightOpts.length && JSON.stringify(leftOpts.sort()) === JSON.stringify(rightOpts.sort());
    if (isBothSame) {
      const types = leftOpts.map(formatOption);
      if (types.every(opt => ["спайка", "релаксация"].includes(opt))) {
        return `Определяются ${types.join(", ")} купола диафрагмы с обеих сторон.`;
      } else {
        return `Диафрагма ${types.join(", ")} с обеих сторон.`;
      }
    }

    // Разные стороны
    const leftText = leftOpts.length ? 
      leftOpts.map(opt => {
        const t = formatOption(opt);
        return ["спайка", "релаксация"].includes(t) ? `Определяется ${t} купола диафрагмы слева` : `Диафрагма слева ${t}`;
      }).join("; ") : "";

    const rightText = rightOpts.length ? 
      rightOpts.map(opt => {
        const t = formatOption(opt);
        return ["спайка", "релаксация"].includes(t) ? `Определяется ${t} купола диафрагмы справа` : `Диафрагма справа ${t}`;
      }).join("; ") : "";

    // Добавляем текст о стороне без особенностей
    const leftEmpty = !leftOpts.length && rightOpts.length ? "слева без особенностей" : "";
    const rightEmpty = !rightOpts.length && leftOpts.length ? "справа без особенностей" : "";

    // Собираем финальный текст и добавляем точку
    const parts = [leftText, rightText, leftEmpty, rightEmpty].filter(Boolean);
    return parts.join("; ").trim().replace(/;?$/, "."); // добавили точку
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
          backgroundImage: `url(/images/lungs-front.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          className={`absolute top-[66%] w-[210px] h-32 border-2 ${selectedSides.includes("right") ? 'bg-yellow-200/30 border-yellow-400' : 'border-yellow-500 bg-transparent'} rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
          style={{ left: "30%" }}
          onClick={(e) => { e.stopPropagation(); toggleSide("right"); }}
        >
          <span className="text-white text-sm font-medium">Правый</span>
        </div>

        <div
          className={`absolute top-[66%] w-[210px] h-32 border-2 ${selectedSides.includes("left") ? 'bg-yellow-200/30 border-yellow-400' : 'border-yellow-500 bg-transparent'} rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
          style={{ left: "54%" }}
          onClick={(e) => { e.stopPropagation(); toggleSide("left"); }}
        >
          <span className="text-white text-sm font-medium">Левый</span>
        </div>

        {selectedSides.includes("right") && (
          <div className="absolute top-[66%] ml-[20%] w-28 space-y-2">
            {sideOptions.map((option, index) => (
              <div
                key={`right-${index}`}
                className={`p-2 border text-xs text-white ${selectedOptions.right.includes(option) ? 'bg-yellow-500 border-yellow-400' : 'border-yellow-500 bg-gray-600'} rounded cursor-pointer transition-all duration-200`}
                onClick={(e) => { e.stopPropagation(); toggleSideOption("right", option); }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        
        {selectedSides.includes("left") && (
          <div className="absolute top-[66%] ml-[71%] w-28 space-y-2">
            {sideOptions.map((option, index) => (
              <div
                key={`left-${index}`}
                className={`p-2 border text-xs text-white ${selectedOptions.left.includes(option) ? 'bg-yellow-500 border-yellow-400' : 'border-yellow-500 bg-gray-600'} rounded cursor-pointer transition-all duration-200`}
                onClick={(e) => { e.stopPropagation(); toggleSideOption("left", option); }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
          onClick={() => {
            insertTextToTextarea("\n" + generateDescription());
            onClose();
          }}
        >
          Добавить
        </button>
      </div>
    </BaseModal>
  );
}