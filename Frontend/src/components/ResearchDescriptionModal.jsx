// ResearchDescriptionModal.jsx
import { useState, useRef } from "react";
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import researchData from "./ResearchData";
import JointSpaceSection from "./JointSpaceSection";
import JointSurfaceSection from "./JointSurfaceSection";

export default function ResearchDescriptionModal({ onClose, description }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [expandedPlaque, setExpandedPlaque] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedNarrowingLevel, setSelectedNarrowingLevel] = useState(null);
  const [selectedChangeLevel, setSelectedChangeLevel] = useState(null);
  const textareaRef = useRef(null);

  const researchCategories = researchData.researchCategories;

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: prev[index] === true ? false : true,
    }));
  };

  const insertTextToTextarea = (researchName, projection) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const textToInsert = `${researchName} ${projection}\n\n`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    textarea.value = newText;
    const newCursorPosition = start + textToInsert.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setSelectedResearch(researchName);
    setExpandedCategory(null);
  };

  // Плашки для коленного сустава
  const kneeJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Бугорки",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
  ];

  // Фильтрация элементов по поиску
  const filteredItems = researchCategories[1].items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="p-8 h-full flex">
          {/* Левая часть с textarea */}
          <div className="w-2/3 pr-4">
            <textarea
              ref={textareaRef}
              className="w-full h-full p-4 bg-gray-700 border border-yellow-500 rounded text-yellow-200 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Введите описание исследования..."
              defaultValue={description}
            />
          </div>

          {/* Разделитель */}
          <div className="w-1 flex items-center justify-center">
            <div className="h-full w-px bg-yellow-500"></div>
          </div>

          {/* Правая часть с категориями */}
          <div className="w-1/3 pl-4 flex flex-col">
            <div className="space-y-4">
              <div>
                <div
                  className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer flex justify-between items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(1);
                  }}
                >
                  <span>Вид исследования</span>
                  {expandedCategory === 1 ? (
                    <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
                  )}
                </div>

                {expandedCategory === 1 && (
                  <div className="mt-2 ml-4 flex flex-col">
                    {/* Поиск */}
                    <div className="mb-2">
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
                    <div className="h-[400px] overflow-y-auto space-y-2">
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => {
                          const isExpanded = expandedItems[index] || false;

                          return (
                            <div key={index} onClick={(e) => e.stopPropagation()}>
                              <div
                                className="p-2 bg-gray-600 border-l-2 border-yellow-500 text-yellow-200 text-sm hover:bg-gray-500 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleItem(index)}
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
                                      className="p-1 bg-gray-700 text-gray-300 text-xs hover:bg-gray-600 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        insertTextToTextarea(item.name, subItem);
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
                        <div className="p-2 text-gray-400 text-sm text-center">
                          Ничего не найдено
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Плашки для коленного сустава */}
                {selectedResearch === "Рентгенография коленных суставов" && (
                  <div className="mt-4 space-y-2">
                    {kneeJointPlaques.map((plaque, index) => {
                      const isExpanded = expandedPlaque === plaque;

                      return (
                        <div key={index} onClick={(e) => e.stopPropagation()}>
                          <div
                            className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer flex justify-between items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedPlaque(isExpanded ? null : plaque);
                            }}
                          >
                            <span>{plaque}</span>
                            {isExpanded ? (
                              <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                            ) : (
                              <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>

                          {isExpanded && plaque === "Суставные щели" && (
                            <JointSpaceSection
                              textareaRef={textareaRef}
                              selectedSubItem={selectedSubItem}
                              setSelectedSubItem={setSelectedSubItem}
                              selectedNarrowingLevel={selectedNarrowingLevel}
                              setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                              setExpandedPlaque={setExpandedPlaque}
                            />
                          )}

                          {isExpanded && plaque === "Суставные поверхности" && (
                            <JointSurfaceSection
                              textareaRef={textareaRef}
                              selectedSubItem={selectedSubItem}
                              setSelectedSubItem={setSelectedSubItem}
                              selectedChangeLevel={selectedChangeLevel}
                              setSelectedChangeLevel={setSelectedChangeLevel}
                              setExpandedPlaque={setExpandedPlaque}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
