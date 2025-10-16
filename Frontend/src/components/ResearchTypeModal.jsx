import { useState } from "react";
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import researchData from "./ResearchData";

export default function ResearchTypeModal({ onClose, onResearchSelect, onInsertText, onOpenDescriptionModal }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const researchCategories = researchData.researchCategories;

  const toggleItem = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleResearchClick = (researchName, projection) => {
    const fullResearch = researchCategories[1].items.find(item => item.name === researchName);

    if (projection) {
      let selectedResearchName = researchName;
      let displayResearchName = researchName;

      if (researchName === "Рентгенография стоп" && projection === "плоскостопие") {
        displayResearchName = "Рентгенография стоп";
        selectedResearchName = "Рентгенография стоп (плоскостопие)";
      }

      // Добавляем обработку для Рентгенографии грудной клетки
      let textToInsert = "";
      if (researchName === "Рентгенография грудной клетки") {
        if (projection === "правой половины" || projection === "левой половины") {
          textToInsert = `Рентгенография ${projection} грудной клетки в прямой проекции.\n\n`;
        } else {
          textToInsert = `${researchName} ${projection}\n\n`;
        }
      } else {
        const cleanName = displayResearchName.replace(/\s*\(плоскостопие\)/i, "");
        textToInsert = `${cleanName} ${projection}\n\n`;
      }
      
      onInsertText(textToInsert, researchName);
      onResearchSelect(selectedResearchName);
      onClose();
      onOpenDescriptionModal();
    } else if (fullResearch) {
      const cleanName = fullResearch.name.replace(/\s*\(плоскостопие\)/i, "");
      onInsertText(`${cleanName}\n\n`, cleanName);
      onResearchSelect(fullResearch.name);
      onClose();
      onOpenDescriptionModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-yellow-200 mb-4 text-center">Выбор вида исследования</h2>

          <input
            type="text"
            placeholder="Поиск исследования..."
            className="w-full p-2 mb-4 bg-gray-700 border border-yellow-500 rounded text-yellow-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="grid grid-cols-3 gap-2">
            {researchCategories[1].items
              .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, index) => {
                const isExpanded = expandedItems[item.name] || false;

                return (
                  <div key={index} className="relative">
                    {/* Кнопка исследования */}
                    <button
                      className="w-full bg-gray-700 text-yellow-200 py-1 px-2 text-sm rounded flex items-center hover:bg-gray-600 break-words"
                      onClick={() => toggleItem(item.name)}
                    >
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.subItems?.length > 0 && (
                        isExpanded ? <ChevronDownIcon className="h-4 w-4 ml-1" /> :
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      )}
                    </button>

                    {/* Подсписок проекций */}
                    {isExpanded && item.subItems && (
                      <div className="absolute left-0 mt-1 bg-gray-700 rounded shadow-lg z-20 w-48 p-1 flex flex-col gap-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            className="bg-gray-600 text-gray-200 py-1 px-2 rounded text-xs text-left hover:bg-gray-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResearchClick(item.name, subItem);
                            }}
                          >
                            {subItem}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
