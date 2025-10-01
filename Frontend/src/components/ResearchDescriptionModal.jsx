// Frontend/src/components/ResearchDescriptionModal.jsx
// ResearchDescriptionModal.jsx
import { useState, useRef, useEffect } from "react";
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import researchData from "./ResearchData";
import KneeResearchPlaques from "./knees/KneeResearchPlaques";
import HipResearchPlaques from "./hipjoints/HipResearchPlaques";
import AnkleResearchPlaques from "./anklejoints/AnkleResearchPlaques";
import FeetResearchPlaques from "./feet/FeetResearchPlaques";
import HandResearchPlaques from "./hand/HandResearchPlaques";
import LumbarResearchPlaques from "./lumbar/LumbarResearchPlaques";
import OsteophytesModal from "./knees/OsteophytesModal";
import HipOsteophytesModal from "./hipjoints/OsteophytesModal";
import FeetOsteophytesModal from "./feet/OsteophytesModal";
import HandOsteophytesModal from "./hand/OsteophytesModal";
import LumbarOsteophytesModal from "./lumbar/OsteophytesModal";
import LungResearchPlaques from "./lungs/LungResearchPlaques";

export default function ResearchDescriptionModal({ onClose, description }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [expandedPlaque, setExpandedPlaque] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedNarrowingLevel, setSelectedNarrowingLevel] = useState(null);
  const [selectedChangeLevel, setSelectedChangeLevel] = useState(null);
  const [selectedShapeLevel, setSelectedShapeLevel] = useState(null);
  const [showOsteophytesModal, setShowOsteophytesModal] = useState(false);
  const [showHipOsteophytesModal, setShowHipOsteophytesModal] = useState(false);
  const [showAnkleOsteophytesModal, setShowAnkleOsteophytesModal] = useState(false);
  const [showFeetOsteophytesModal, setShowFeetOsteophytesModal] = useState(false);
  const [showHandOsteophytesModal, setShowHandOsteophytesModal] = useState(false);
  const [showLumbarOsteophytesModal, setShowLumbarOsteophytesModal] = useState(false);
  const [showLungOsteophytesModal, setShowLungOsteophytesModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

    useEffect(() => {
    const handleKeyDown = (e) => {
      // запрещаем закрытие по пробелу внутри модалки
      if (e.code === "Space" || e.key === " ") {
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

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

  const copyToClipboard = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Добавляем отступы: два сверху и один снизу
    const text = textarea.value;
    const formattedText = `\n\n${text}\n`;
    
    navigator.clipboard.writeText(formattedText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Ошибка копирования:', err);
      });
  };

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
          <div className="w-2/3 pr-4 relative">
            <textarea
              ref={textareaRef}
              className="w-full h-full p-4 bg-gray-700 border border-yellow-500 rounded text-yellow-200 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Введите описание исследования..."
              defaultValue={description}
            />
            
            {/* Кнопка копирования */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard();
              }}
              className="absolute top-2 right-2 p-1 bg-gray-700 border border-yellow-500 rounded text-yellow-200 hover:bg-gray-600 transition-colors"
              title="Копировать"
            >
              <DocumentDuplicateIcon className={`h-5 w-5 ${copied ? 'text-green-400' : 'text-yellow-400'}`} />
            </button>
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
                {["Рентгенография коленных суставов", "Рентгенoграфия левого коленного сустава", "Рентгенография правого коленного сустава"].includes(selectedResearch) && (
                  <KneeResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}
                    showOsteophytesModal={showOsteophytesModal}
                    setShowOsteophytesModal={setShowOsteophytesModal}
                    textareaRef={textareaRef}
                  />
                )}

                {/* Плашки для тазобедренного сустава */}
                {["Рентгенография тазобедренных суставов", "Рентгенография левого тазобедренного сустава", "Рентгенография правого тазобедренного сустава"].includes(selectedResearch) && (
                  <HipResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}
                    showOsteophytesModal={showHipOsteophytesModal}
                    setShowOsteophytesModal={setShowHipOsteophytesModal}
                    textareaRef={textareaRef}
                  />
                )}

                {/* Плашки для голеностопного сустава */}
                {["Рентгенография голеностопных суставов", "Рентгенография левого голеностопного сустава", "Рентгенография правого голеностопного сустава"
                , "Рентгенография локтевых суставов", "Рентгенография левого локтевого сустава", "Рентгенография правого локтевого сустава"].includes(selectedResearch) && (
                  <AnkleResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}

                    textareaRef={textareaRef}
                  />
                )}

                {/* Плашки для стопы */}
                {["Рентгенография стоп", "Рентгенография левой стопы", "Рентгенография правой стопы"].includes(selectedResearch) && (
                  <FeetResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}
                    showOsteophytesModal={showFeetOsteophytesModal}
                    setShowOsteophytesModal={setShowFeetOsteophytesModal}
                    textareaRef={textareaRef}
                  />
                )}

                {/* Плашки для кисти */}
                {["Рентгенография кистей", "Рентгенография левой кисти", "Рентгенография правой кисти"].includes(selectedResearch) && (
                  <HandResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}
                    showOsteophytesModal={showHandOsteophytesModal}
                    setShowOsteophytesModal={setShowHandOsteophytesModal}
                    textareaRef={textareaRef}
                  />
                )}

                {/* Плашки для поясницы */}
                {["Рентгенография поясничного отдела позвоночника", "Рентгенография грудопоясничного отдела позвоночника", "Рентгенография грудного отдела позвоночника", "Рентгенография шейного отдела позвоночника"].includes(selectedResearch) && (
                  <LumbarResearchPlaques
                    expandedPlaque={expandedPlaque}
                    setExpandedPlaque={setExpandedPlaque}
                    selectedSubItem={selectedSubItem}
                    setSelectedSubItem={setSelectedSubItem}
                    selectedNarrowingLevel={selectedNarrowingLevel}
                    setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                    selectedChangeLevel={selectedChangeLevel}
                    setSelectedChangeLevel={setSelectedChangeLevel}
                    selectedShapeLevel={selectedShapeLevel}
                    setSelectedShapeLevel={setSelectedShapeLevel}
                    showOsteophytesModal={showLumbarOsteophytesModal}
                    setShowOsteophytesModal={setShowLumbarOsteophytesModal}
                    textareaRef={textareaRef}
                  />
                )}

                  {/* Плашки для легких */}
                  {["Рентгенография органов грудной клетки", "Рентгенография легких", "Рентгенография левого легкого", "Рентгенография правого легкого"].includes(selectedResearch) && (
                    <LungResearchPlaques
                      expandedPlaque={expandedPlaque}
                      setExpandedPlaque={setExpandedPlaque}
                      selectedSubItem={selectedSubItem}
                      setSelectedSubItem={setSelectedSubItem}
                      selectedNarrowingLevel={selectedNarrowingLevel}
                      setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                      selectedChangeLevel={selectedChangeLevel}
                      setSelectedChangeLevel={setSelectedChangeLevel}
                      selectedShapeLevel={selectedShapeLevel}
                      setSelectedShapeLevel={setSelectedShapeLevel}
                      showOsteophytesModal={showLungOsteophytesModal}
                      setShowOsteophytesModal={setShowLungOsteophytesModal}
                      textareaRef={textareaRef}
                    />
                  )}  

              </div>
            </div>
          </div>
        </div>

        {/* Модалка остеофитов для коленного сустава */}
        {showOsteophytesModal && (
          <OsteophytesModal
            onClose={() => setShowOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {/* Модалка остеофитов для тазобедренного сустава */}
        {showHipOsteophytesModal && (
          <HipOsteophytesModal
            onClose={() => setShowHipOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}



        {/* Модалка остеофитов для стопы */}
        {showFeetOsteophytesModal && (
          <FeetOsteophytesModal
            onClose={() => setShowFeetOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {/* Модалка остеофитов для кисти */}
        {showHandOsteophytesModal && (
          <HandOsteophytesModal
            onClose={() => setShowHandOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {/* Модалка остеофитов для поясницы */}
        {showLumbarOsteophytesModal && (
          <LumbarOsteophytesModal
            onClose={() => setShowLumbarOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

          {/* Модалка остеофитов для легких */}
          {showLungOsteophytesModal && (
            <LungOsteophytesModal
              onClose={() => setShowLungOsteophytesModal(false)}
              textareaRef={textareaRef}
            />
          )}
      </div>
    </div>
  );
}