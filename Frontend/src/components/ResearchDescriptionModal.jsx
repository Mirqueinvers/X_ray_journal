import { useState, useRef, useEffect } from "react";
import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import KneeResearchPlaques from "./knees/KneeResearchPlaques";
import HipResearchPlaques from "./hipjoints/HipResearchPlaques";
import AnkleResearchPlaques from "./anklejoints/AnkleResearchPlaques";
import FeetResearchPlaques from "./feet/FeetResearchPlaques";
import HandResearchPlaques from "./hand/HandResearchPlaques";
import LumbarResearchPlaques from "./spine/LumbarResearchPlaques";
import ThoracicResearchPlaques from "./spine/ThoracicResearchPlaques";
import OsteophytesModal from "./knees/OsteophytesModal";
import LumbarOsteophytesModal from "./spine/OsteophytesModal";
import LungResearchPlaques from "./lungs/LungResearchPlaques";
import ThoracicOsteophytesModal from "./spine/OsteophytesModal";
import CervicalResearchPlaques from "./spine/CervicalResearchPlaques";
import JointSpaceSection from "./knees/JointSpaceModal"; // 1. Импортируем наш модальный окно

export default function ResearchDescriptionModal({ onClose, description, selectedResearch, setTextareaRef }) {
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
  const [showThoracicOsteophytesModal, setShowThoracicOsteophytesModal] = useState(false);
  const [showLungOsteophytesModal, setShowLungOsteophytesModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isJointSpaceModalOpen, setIsJointSpaceModalOpen] = useState(false); // 2. Добавляем состояние для модального окна суставных щелей
  const textareaRef = useRef(null);

  // Добавим отладочную информацию
  useEffect(() => {
    console.log("ResearchDescriptionModal selectedResearch:", selectedResearch);
  }, [selectedResearch]);

  useEffect(() => {
    // Передаем textareaRef родительскому компоненту
    if (setTextareaRef) {
      setTextareaRef(textareaRef.current);
    }
  }, [setTextareaRef]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // Эффект для вставки текста при открытии модалки
  useEffect(() => {
    if (description && textareaRef.current) {
      const textarea = textareaRef.current;
      // Устанавливаем значение и фокусируемся на поле
      textarea.value = description;
      textarea.focus();
      
      // Перемещаем курсор в конец
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [description]);

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
  };

  const copyToClipboard = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

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

          {/* Правая часть с плашками */}
          <div className="w-1/3 pl-4">
            <div className="space-y-4">
              {/* Плашки для коленного сустава */}
              {selectedResearch && ["Рентгенография коленных суставов", "Рентгенoграфия левого коленного сустава", "Рентгенография правого коленного сустава"].includes(selectedResearch) && (
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
                  setIsJointSpaceModalOpen={setIsJointSpaceModalOpen} // 3. Передаем сеттер для модального окна
                />
              )}

              {/* Плашки для тазобедренного сустава */}
              {selectedResearch && ["Рентгенография тазобедренных суставов", "Рентгенographия левого тазобедренного сустава", "Рентгенография правого тазобедренного сустава"].includes(selectedResearch) && (
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
              {selectedResearch && ["Рентгенография голenостопных суставов", "Рентгенография левого голеностопного сустава", "Рентгенография правого голеностопного сустава"
              , "Рентгенография локтевых суставов", "Рентгенография левого локtевого сустава", "Рентгенография правого локтевого сустава"].includes(selectedResearch) && (
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
              {selectedResearch && ["Рентгенография стоп", "Рентгенография левой стопы", "Рентгенография правой стопы"].includes(selectedResearch) && (
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
              {selectedResearch && ["Рентгенография кистей", "Рентгенография левой кисти", "Рентгенография правой кисти"].includes(selectedResearch) && (
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
              {selectedResearch && ["Рентгенография поясничного отдела позвоночника", "Рентгенография грудопоясничного отдела позвоночника"].includes(selectedResearch) && (
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

              {/* Плашки для грудного отдела */}
              {selectedResearch && ["Рентгенография грудного отдела позвоночника"].includes(selectedResearch) && (
                <ThoracicResearchPlaques
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
                  showOsteophytesModal={showThoracicOsteophytesModal}
                  setShowOsteophytesModal={setShowThoracicOsteophytesModal}
                  textareaRef={textareaRef}
                />
              )}

              {/* Плашки для шейного отдела позвоночника */}
              {selectedResearch && ["Рентгенография шейного отдела позвоночника"].includes(selectedResearch) && (
                <CervicalResearchPlaques
                  expandedPlaque={expandedPlaque}
                  setExpandedPlaque={setExpandedPlaque}
                  textareaRef={textareaRef}
                />
              )}

               {/* Плашки для легких */}
              {selectedResearch && ["Рентгенография органов грудной клетки", "Рентгенография легких", "Рентгенография левого легкого", "Рентгенография правого легкого"].includes(selectedResearch) && (
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

        {/* Модалки остеофитов */}
        {showOsteophytesModal && (
          <OsteophytesModal
            onClose={() => setShowOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showHipOsteophytesModal && (
          <HipOsteophytesModal
            onClose={() => setShowHipOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showFeetOsteophytesModal && (
          <FeetOsteophytesModal
            onClose={() => setShowFeetOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showHandOsteophytesModal && (
          <HandOsteophytesModal
            onClose={() => setShowHandOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showLumbarOsteophytesModal && (
          <LumbarOsteophytesModal
            onClose={() => setShowLumbarOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showThoracicOsteophytesModal && (
          <ThoracicOsteophytesModal
            onClose={() => setShowThoracicOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showLungOsteophytesModal && (
          <LungOsteophytesModal
            onClose={() => setShowLungOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {/* 4. Рендерим модальное окно суставных щелей здесь */}
        <JointSpaceSection
          isOpen={isJointSpaceModalOpen}
          onClose={() => setIsJointSpaceModalOpen(false)}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
}