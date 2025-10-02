import { useState } from "react";
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import researchData from "./ResearchData";

export default function ResearchTypeModal({ onClose, onResearchSelect, onInsertText, onOpenDescriptionModal }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const researchCategories = researchData.researchCategories;

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: prev[index] === true ? false : true,
    }));
  };

  // Фильтрация исследований по поиску
  const filteredItems = researchCategories[1].items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResearchSelect = (researchName, projection) => {
    // Ищем полное исследование в данных
    const fullResearch = researchCategories[1].items.find(item => item.name === researchName);
    
    if (projection) {
      // Если выбрана проекция, вставляем текст в описание
      const textToInsert = `${researchName} ${projection}\n\n`;
      onInsertText(textToInsert, researchName); // Передаем полное название исследования
      onClose();
      onOpenDescriptionModal();
    } else if (fullResearch) {
      // Если только исследование, вставляем его и открываем модалку описания
      onInsertText(`${fullResearch.name}\n\n`, fullResearch.name);
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
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-6 h-full">
          <h2 className="text-xl font-bold text-yellow-200 mb-4 text-center">Выбор вида исследования</h2>
          
          {/* Поле поиска */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Поиск исследования..."
              className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Список исследований */}
          <div className="h-[500px] overflow-y-auto space-y-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isExpanded = expandedItems[index] || false;

                return (
                  <div key={index} onClick={(e) => e.stopPropagation()}>
                    <div
                      className="p-3 bg-gray-600 border-l-2 border-yellow-500 text-yellow-200 hover:bg-gray-500 cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        if (!isExpanded) {
                          // Если элемент не развернут, просто разворачиваем его
                          toggleItem(index);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {isExpanded ? (
                        <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>

                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="p-2 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Передаем и название исследования, и проекцию
                              handleResearchSelect(item.name, subItem);
                            }}
                          >
                            {subItem}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-gray-400 text-sm text-center">
                Ничего не найдено
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}