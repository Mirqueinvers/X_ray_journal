import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Modals from "./allModals";
import * as ResearchPlaques from "./researchPlaques";

export default function ResearchDescriptionModal({
  onClose,
  description,
  selectedResearch,
  researchId,
  setTextareaRef,
  onDescriptionSaved
}) {
  const [expandedPlaque, setExpandedPlaque] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedNarrowingLevel, setSelectedNarrowingLevel] = useState(null);
  const [selectedChangeLevel, setSelectedChangeLevel] = useState(null);
  const [selectedShapeLevel, setSelectedShapeLevel] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [text, setText] = useState(description || "");
  const textareaRef = useRef(null);
  const [insertionData, setInsertionData] = useState(null);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  const [hasEndoprosthesis, setHasEndoprosthesis] = useState(false);

  useEffect(() => setText(description || ""), [description]);
  useEffect(() => {
    if (setTextareaRef) setTextareaRef(textareaRef.current);
  }, [setTextareaRef]);

  useEffect(() => {
    if (text && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(text.length, text.length);
    }
  }, [text]);

  useEffect(() => {
    if (!insertionData || !textareaRef.current) return;
    const { textToInsert, start, end } = insertionData;

    setText((current) => {
      const newText = current.substring(0, start) + textToInsert + current.substring(end);
      setTimeout(() => {
        const newCursor = start + textToInsert.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursor, newCursor);
      }, 0);
      return newText;
    });
    setInsertionData(null);
  }, [insertionData]);

  const insertTextToTextarea = (textToInsert) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    setInsertionData({ textToInsert, start, end });
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      setText((currentText) => {
        const newText = currentText.substring(0, start) + "\n" + currentText.substring(end);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
        
        return newText;
      });
    } else if (e.key === ' ') {
      // ИСПРАВЛЕНИЕ: предотвращаем стандартное поведение и вставляем пробел вручную
      e.preventDefault();
      e.stopPropagation();

      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      setText((currentText) => {
        const newText = currentText.substring(0, start) + " " + currentText.substring(end);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
        
        return newText;
      });
    }
  };

  const handleOpenModal = (modalName) => {
    setIsNestedModalOpen(true);
    setOpenModal(modalName);
  };

  const handleCloseNestedModal = () => {
    setIsNestedModalOpen(false);
    setOpenModal(null);
  };

  const saveDescription = async () => {
    const textToSave = text;
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/save-research-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ research_id: researchId, description: textToSave })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        
        const updatedResearch = {
          id: researchId,
          description: textToSave,
        };
        
        if (onDescriptionSaved) {
          onDescriptionSaved(updatedResearch);
        } else {
          onClose();
        }
      } else {
        console.error("Ошибка сохранения:", data.error);
      }
    } catch (err) {
      console.error("Ошибка запроса:", err);
    } finally {
      setSaving(false);
    }
  };

  const researchMap = {
    // ... существующие маппинги ...
    "Рентгенография коленных суставов": ResearchPlaques.KneeResearchPlaques,
    // ... другие маппинги ...
    "Рентгенография грудной клетки": ResearchPlaques.ChestResearchPlaques,
    "Общее": ResearchPlaques.GeneralResearchPlaques,
    "Костный возраст": ResearchPlaques.BoneAgeResearchPlaques,
  };

  const ResearchComponent = researchMap[selectedResearch];

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
      onClick={!isNestedModalOpen ? onClose : undefined}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[1300px] h-[700px] flex flex-col overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-1 h-full gap-6 p-6">
          <div className="flex flex-col w-2/3 h-full">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Введите описание исследования..."
              className="flex-1 resize-none bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <button
              onClick={() => {
                if (textareaRef.current) {
                  const textToCopy = "\n\n" + textareaRef.current.value + "\n";
                  navigator.clipboard.writeText(textToCopy).catch(err => console.error(err));
                }
                saveDescription();
              }}
              className="mt-3 self-start px-5 py-2 bg-blue-400 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
            >
              {saving ? "Сохраняем..." : saveSuccess ? "Сохранено!" : "Сохранить и скопировать"}
            </button>
          </div>

          <div className="w-px bg-gray-200"></div>

          <div className="flex-1 h-full overflow-y-auto pr-2">
            {ResearchComponent && (
              <ResearchComponent
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
                setOpenModal={handleOpenModal}
                insertTextToTextarea={insertTextToTextarea}
                hasEndoprosthesis={hasEndoprosthesis}
                setHasEndoprosthesis={setHasEndoprosthesis}
              />
            )}
          </div>
        </div>

        {openModal && (() => {
          // НОВОЕ: Обработка костного возраста с параметром пола
          if (openModal.startsWith("BoneAgeModal")) {
            const genderParam = openModal.includes(":female") ? "female" : "male";
            const BoneAgeModal = Modals.BoneAgeModal;
            if (!BoneAgeModal) return null;
            return (
              <BoneAgeModal
                isOpen={true}
                onClose={handleCloseNestedModal}
                gender={genderParam}
              />
            );
          }

          // Обработка SpineDiagnosisModal (существующая логика)
          if (openModal.startsWith("SpineDiagnosisModal:")) {
            const region = openModal.split(":")[1];
            const ModalComponent = Modals["SpineDiagnosisModal"];
            if (!ModalComponent) return null;
            return (
              <ModalComponent
                isOpen={true}
                onClose={handleCloseNestedModal}
                textareaRef={textareaRef}
                spineRegion={region}
                insertTextToTextarea={insertTextToTextarea}
                hasEndoprosthesis={hasEndoprosthesis}
              />
            );
          }

          // Остальные модалки
          const ModalComponent = Modals[openModal];
          if (!ModalComponent) return null;
          return (
            <ModalComponent
              isOpen={true}
              onClose={handleCloseNestedModal}
              textareaRef={textareaRef}
              insertTextToTextarea={insertTextToTextarea}
              hasEndoprosthesis={hasEndoprosthesis}
            />
          );
        })()}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}