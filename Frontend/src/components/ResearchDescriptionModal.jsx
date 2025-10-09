
import { useState, useRef, useEffect } from "react";
import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import KneeResearchPlaques from "./knees/KneeResearchPlaques";
import HipResearchPlaques from "./hipjoints/HipResearchPlaques";
import FeetResearchPlaques from "./foot/FootResearchPlaques";
import HandResearchPlaques from "./hand/HandResearchPlaques";
import LumbarResearchPlaques from "./spine/LumbarResearchPlaques";
import ThoracicResearchPlaques from "./spine/ThoracicResearchPlaques";
import OsteophytesModal from "./knees/OsteophytesModal";
import LumbarOsteophytesModal from "./spine/OsteophytesModal";
import LungResearchPlaques from "./lungs/LungResearchPlaques";
import ThoracicOsteophytesModal from "./spine/OsteophytesModal";
import CervicalResearchPlaques from "./spine/CervicalResearchPlaques";
import JointSpaceSection from "./knees/JointSpaceModal"; // Импортируем модальное окно суставных щелей
import JointSurfaceModal from "./knees/JointSurfaceModal"; // Импортируем модальное окно суставных поверхностей
import HipJointSpaceModal from "./hipjoints/HipJointSpaceModal";
import HipJointSurfaceModal from "./hipjoints/HipJointSurfaceModal";
import HipOsteophytesModal from "./hipjoints/HipOsteophytesModal";
import PubicSymphysisModal from "./hipjoints/PubicSymphysisModal";
import HandJointSpaceModal from "./hand/HandJointSpaceModal";
import HandJointSurfaceModal from "./hand/HandJointSurfaceModal";
import HandOsteophytesModal from "./hand/HandOsteophytesModal";
import HandCongruencyModal from "./hand/HandCongruencyModal";
import FootJointSpaceModal from "./foot/FootJointSpaceModal";
import FootJointSurfaceModal from "./foot/FootJointSurfaceModal";
import FootOsteophytesModal from "./foot/FootOsteophytesModal";
import FootCongruencyModal from "./foot/FootCongruencyModal";
import AnkleResearchPlaques from "./anklejoints/AnkleResearchPlaques";
import AnkleJoinSpaceModal from "./anklejoints/AnkleJoinSpaceModal";
import AnkleJointSurfaceModal from "./anklejoints/AnkleJointSurfaceModal";










export default function ResearchDescriptionModal({ onClose, description, selectedResearch, setTextareaRef }) {
  const [expandedPlaque, setExpandedPlaque] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedNarrowingLevel, setSelectedNarrowingLevel] = useState(null);
  const [selectedChangeLevel, setSelectedChangeLevel] = useState(null);
  const [selectedShapeLevel, setSelectedShapeLevel] = useState(null);
  const [showOsteophytesModal, setShowOsteophytesModal] = useState(false);
  const [showHipOsteophytesModal, setShowHipOsteophytesModal] = useState(false);
  const [showLumbarOsteophytesModal, setShowLumbarOsteophytesModal] = useState(false);
  const [showThoracicOsteophytesModal, setShowThoracicOsteophytesModal] = useState(false);
  const [showLungOsteophytesModal, setShowLungOsteophytesModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isJointSpaceModalOpen, setIsJointSpaceModalOpen] = useState(false); // Состояние для модального окна суставных щелей
  const [isJointSurfaceModalOpen, setIsJointSurfaceModalOpen] = useState(false); // Состояние для модального окна суставных поверхностей
  const [isHipJointSpaceModalOpen, setIsHipJointSpaceModalOpen] = useState(false);
  const [isHipJointSurfaceModalOpen, setIsHipJointSurfaceModalOpen] = useState(false);
  const [isHipJointOsteophytesModalOpen, setIsHipJointOsteophytesModalOpen] = useState(false);
  const [isPubicSymphysisModalOpen, setIsPubicSymphysisModalOpen] = useState(false);
  const [isHandJointSpaceModalOpen, setIsHandJointSpaceModalOpen] = useState(false);
  const [isHandJointSurfaceModalOpen, setIsHandJointSurfaceModalOpen] = useState(false);
  const [showHandOsteophytesModal, setShowHandOsteophytesModal] = useState(false);
  const [showHandCongruencyModal, setShowHandCongruencyModal] = useState(false);
  const [isFootJointSpaceModalOpen, setIsFootJointSpaceModalOpen] = useState(false);
  const [isFootJointSurfaceModalOpen, setIsFootJointSurfaceModalOpen] = useState(false);
  const [showFeetOsteophytesModal, setShowFeetOsteophytesModal] = useState(false);
  const [showFootCongruencyModal, setShowFootCongruencyModal] = useState(false);
  const [isAnkleJointSpaceModalOpen, setIsAnkleJointSpaceModalOpen] = useState(false); // Изменено на булево значение
  const [ankleJointSide, setAnkleJointSide] = useState(null); // Добавлено состояние для стороны сустава
  const [isAnkleJointSurfaceModalOpen, setIsAnkleJointSurfaceModalOpen] = useState(false);






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
                  setIsJointSpaceModalOpen={setIsJointSpaceModalOpen} // Передаем сеттер для модального окна суставных щелей
                  setIsJointSurfaceModalOpen={setIsJointSurfaceModalOpen} // Передаем сеттер для модального окна суставных поверхностей
                />
              )}

              {/* Плашки для тазобедренного сустава */}
              {selectedResearch && ["Рентгенография тазобедренных суставов", "Рентгенoграфия левого тазобедренного сустава", "Рентгенография правого тазобедренного сустава"].includes(selectedResearch) && (
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
                  setIsHipJointSpaceModalOpen={setIsHipJointSpaceModalOpen}
                  setIsHipJointSurfaceModalOpen={setIsHipJointSurfaceModalOpen}
                  setIsHipJointOsteophytesModalOpen={setIsHipJointOsteophytesModalOpen}
                  setIsPubicSymphysisModalOpen={setIsPubicSymphysisModalOpen}



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
                  showFeetOsteophytesModal={showFeetOsteophytesModal} // Переименован с showOsteophytesModal
                  setShowFeetOsteophytesModal={setShowFeetOsteophytesModal} // Переименован с setShowOsteophytesModal
                  textareaRef={textareaRef}
                  setIsFootJointSpaceModalOpen={setIsFootJointSpaceModalOpen}
                  setIsFootJointSurfaceModalOpen={setIsFootJointSurfaceModalOpen}
                  showFootCongruencyModal={showFootCongruencyModal}
                  setShowFootCongruencyModal={setShowFootCongruencyModal}

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
                  textareaRef={textareaRef}
                  setIsHandJointSpaceModalOpen={setIsHandJointSpaceModalOpen}
                  setIsHandJointSurfaceModalOpen={setIsHandJointSurfaceModalOpen}
                  setShowHandOsteophytesModal={setShowHandOsteophytesModal}
                  setShowHandCongruencyModal={setShowHandCongruencyModal} // Добавить этот пропс


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
              {selectedResearch && ["Рентгенография голеностопных суставов", "Рентгенография левого голеностопного сустава", "Рентгенография правого голеностопного сустава"].includes(selectedResearch) && (
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
                  setIsAnkleJointSpaceModalOpen={setIsAnkleJointSpaceModalOpen}
                  setIsAnkleJointSurfaceModalOpen={setIsAnkleJointSurfaceModalOpen}

                  setAnkleJointSide={setAnkleJointSide}
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

        {/* Модальное окно суставных щелей */}
        <JointSpaceSection
          isOpen={isJointSpaceModalOpen}
          onClose={() => setIsJointSpaceModalOpen(false)}
          textareaRef={textareaRef}
        />

        {/* Модальное окно суставных поверхностей */}
        <JointSurfaceModal
          isOpen={isJointSurfaceModalOpen}
          onClose={() => setIsJointSurfaceModalOpen(false)}
          textareaRef={textareaRef}
        />
        
        {/* Добавляем модальное окно в JSX */}
        {isHipJointSpaceModalOpen && (
          <HipJointSpaceModal
            isOpen={isHipJointSpaceModalOpen}
            onClose={() => setIsHipJointSpaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {isHipJointSurfaceModalOpen && (
          <HipJointSurfaceModal
            isOpen={isHipJointSurfaceModalOpen}
            onClose={() => setIsHipJointSurfaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {isHipJointOsteophytesModalOpen && (
          <HipOsteophytesModal
            isOpen={isHipJointOsteophytesModalOpen}
            onClose={() => setIsHipJointOsteophytesModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {isPubicSymphysisModalOpen && (
          <PubicSymphysisModal
            isOpen={isPubicSymphysisModalOpen}
            onClose={() => setIsPubicSymphysisModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {isHandJointSpaceModalOpen && (
          <HandJointSpaceModal
            isOpen={isHandJointSpaceModalOpen}
            onClose={() => setIsHandJointSpaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {isHandJointSurfaceModalOpen && (
          <HandJointSurfaceModal
            isOpen={isHandJointSurfaceModalOpen}
            onClose={() => setIsHandJointSurfaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

        {showHandOsteophytesModal && (
          <HandOsteophytesModal
            isOpen={showHandOsteophytesModal} // Добавлен пропс isOpen
            onClose={() => setShowHandOsteophytesModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {showHandCongruencyModal && (
          <HandCongruencyModal
            isOpen={showHandCongruencyModal}
            onClose={() => setShowHandCongruencyModal(false)}
            textareaRef={textareaRef}
          />
        )}

        {isFootJointSpaceModalOpen && (
          <FootJointSpaceModal
            isOpen={isFootJointSpaceModalOpen}
            onClose={() => setIsFootJointSpaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}
       
        {isFootJointSurfaceModalOpen && (
          <FootJointSurfaceModal
            isOpen={isFootJointSurfaceModalOpen}
            onClose={() => setIsFootJointSurfaceModalOpen(false)}
            textareaRef={textareaRef}
          />
        )}

          {showFeetOsteophytesModal && (
            <FootOsteophytesModal
              isOpen={showFeetOsteophytesModal} // Добавлен пропс isOpen
              onClose={() => setShowFeetOsteophytesModal(false)}
              textareaRef={textareaRef}
            />
          )}

          {showFootCongruencyModal && (
            <FootCongruencyModal
              isOpen={showFootCongruencyModal}
              onClose={() => setShowFootCongruencyModal(false)}
              textareaRef={textareaRef}
            />
          )}

          {isAnkleJointSpaceModalOpen && (
            <AnkleJoinSpaceModal
              isOpen={isAnkleJointSpaceModalOpen}
              onClose={() => {
                setIsAnkleJointSpaceModalOpen(false);
                setAnkleJointSide(null);
              }}
              textareaRef={textareaRef}
              side={ankleJointSide}
            />
          )}

          {isAnkleJointSurfaceModalOpen && (
            <AnkleJointSurfaceModal
              isOpen={isAnkleJointSurfaceModalOpen}
              onClose={() => setIsAnkleJointSurfaceModalOpen(false)}
              textareaRef={textareaRef}
            />
          )}
      </div>
    </div>
  );
}