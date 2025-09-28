// Frontend/src/components/lungs/SinusExpansionModal.jsx
import { useState } from "react";

export default function SinusExpansionModal({ onClose, textareaRef }) {
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

  const sideOptions = ["Визуализируется не четко", "Не визуализируется", "Спайка"];

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current 
        ? current + "\n" + text 
        : text;
      
      // Вызываем событие input для React
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  };

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
    switch (word.toLowerCase()) {
      case "визуализируется не четко":
        return "визуализируется не четко";
      case "не визуализируется":
        return "не визуализируется";
      case "спайка":
        return "определяется спайка";
      default:
        return word;
    }
  };

  const toPlural = (word) => {
    switch (word.toLowerCase()) {
      case "визуализируется не четко":
        return "визуализируются не четко";
      case "не визуализируется":
        return "не визуализируются";
      case "спайка":
        return "определяются спайки";
      default:
        return word;
    }
  };

  if (leftOpts.length && rightOpts.length) {
    // одинаковые опции на обеих сторонах
    if (JSON.stringify(leftOpts.sort()) === JSON.stringify(rightOpts.sort())) {
      if (leftOpts.includes("Спайка")) {
        return "Определяются спайки синусов плевры.";
      }
      return `Синусы плевры ${leftOpts.map(toPlural).join(", ")}.`;
    } else {
      return `Синус левого легкого ${leftOpts.map(toSingular).join(", ")}; синус правого легкого ${rightOpts.map(toSingular).join(", ")}.`;
    }
  }

  if (leftOpts.length)
    return `Синус левого легкого ${leftOpts.map(toSingular).join(", ")}; правого не изменен.`;
  if (rightOpts.length)
    return `Синус правого легкого ${rightOpts.map(toSingular).join(", ")}; левого не изменен.`;

  return "Синусы плевры не изменены.";
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer">
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

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
            className={`absolute bottom-[13%] w-28 h-20 border-2 ${
              selectedSides.includes("right") 
                ? 'bg-yellow-200/30 border-yellow-400' 
                : 'border-yellow-500 bg-transparent'
            } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
            style={{ left: "30%" }}
            onClick={(e) => { e.stopPropagation(); toggleSide("right"); }}
          >
            <span className="text-white text-sm font-medium">Правый</span>
          </div>

          <div
            className={`absolute bottom-[13%] w-28 h-20 border-2 ${
              selectedSides.includes("left") 
                ? 'bg-yellow-200/30 border-yellow-400' 
                : 'border-yellow-500 bg-transparent'
            } rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200`}
            style={{ left: "61%" }}
            onClick={(e) => { e.stopPropagation(); toggleSide("left"); }}
          >
            <span className="text-white text-sm font-medium">Левый</span>
          </div>

          {/* Опции для выбранных сторон */}
          {selectedSides.includes("right") && (
            <div className="absolute bottom-[13%] ml-[20%] w-28 space-y-2">
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
            <div className="absolute bottom-[13%] ml-[71%] w-28 space-y-2">
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
              insertTextToTextarea(generateDescription());
              onClose();
            }}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}