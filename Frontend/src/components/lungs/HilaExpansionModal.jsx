import { useState } from "react";
import BaseModal from "../common/BaseModal";

export default function HilaExpansionModal({ onClose, insertTextToTextarea }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    left: [],
    right: []
  });

  const options = [
    "Симметричное расширение",
    "Несимметричное расширение",
    "Усиление сосудистого рисунка"
  ];

  const sideOptions = ["Расширен", "Уплотнен", "Подтянут кверху", "Подтянут книзу"];

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

  const generateDescription = () => {
    const leftOpts = selectedOptions.left;
    const rightOpts = selectedOptions.right;

    const toSingular = (word) => {
      switch(word.toLowerCase()) {
        case "расширен": return "расширен";
        case "уплотнен": return "уплотнен";
        case "подтянут кверху": return "подтянут кверху";
        case "подтянут книзу": return "подтянут книзу";
        default: return word;
      }
    };

    const toPlural = (word) => {
      switch(word.toLowerCase()) {
        case "расширен": return "расширены";
        case "уплотнен": return "уплотнены";
        case "подтянут кверху": return "подтянуты кверху";
        case "подтянут книзу": return "подтянуты книзу";
        default: return word;
      }
    };

    if (leftOpts.length && rightOpts.length) {
      // Если одинаковые опции на обеих сторонах — объединяем
      if (JSON.stringify(leftOpts.sort()) === JSON.stringify(rightOpts.sort())) {
        return `Корни легких ${leftOpts.map(toPlural).join(", ")}.`;
      } else {
        return `Корень левого легкого ${leftOpts.map(toSingular).join(", ")}; корень правого легкого ${rightOpts.map(toSingular).join(", ")}.`;
      }
    }

    if (leftOpts.length) return `Корень левого легкого ${leftOpts.map(toSingular).join(", ")}; правого не изменен.`;
    if (rightOpts.length) return `Корень правого легкого ${rightOpts.map(toSingular).join(", ")}; левого не изменен.`;

    return "Изменений нет.";
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
      {/* Фон с легкими */}
      <div 
        className="w-full h-full relative"
        style={{ 
          backgroundImage: `url(/images/lungs-front.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Сегменты правый/левый */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-20 h-40 border-2 ${
            selectedSides.includes("right") 
              ? 'bg-yellow-200/30 border-yellow-400' 
              : 'border-yellow-500 bg-transparent'
          } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
          style={{ left: "42%" }}
          onClick={(e) => { e.stopPropagation(); toggleSide("right"); }}
        >
          <span className="text-white font-medium">Правый</span>
        </div>

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-20 h-40 border-2 ${
            selectedSides.includes("left") 
              ? 'bg-yellow-200/30 border-yellow-400' 
              : 'border-yellow-500 bg-transparent'
          } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
          style={{ left: "52%" }}
          onClick={(e) => { e.stopPropagation(); toggleSide("left"); }}
        >
          <span className="text-white font-medium">Левый</span>
        </div>

        {/* Опции для выбранных сторон */}
        {selectedSides.includes("right") && (
          <div className="absolute top-1/2 transform -translate-y-1/2 ml-[32%] w-28 space-y-2">
            {sideOptions.map((option, index) => (
              <div
                key={`right-${index}`}
                className={`p-2 border text-xs text-white ${
                  selectedOptions.right.includes(option) 
                    ? 'bg-yellow-500 border-yellow-400' 
                    : 'border-yellow-500 bg-gray-600'
                } rounded cursor-pointer transition-all duration-200`}
                onClick={(e) => { e.stopPropagation(); toggleSideOption("right", option); }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        {selectedSides.includes("left") && (
          <div className="absolute top-1/2 transform -translate-y-1/2 ml-[59.5%] w-28 space-y-2">
            {sideOptions.map((option, index) => (
              <div
                key={`left-${index}`}
                className={`p-2 border text-xs text-white ${
                  selectedOptions.left.includes(option) 
                    ? 'bg-yellow-500 border-yellow-400' 
                    : 'border-yellow-500 bg-gray-600'
                } rounded cursor-pointer transition-all duration-200`}
                onClick={(e) => { e.stopPropagation(); toggleSideOption("left", option); }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка добавить слева внизу */}
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