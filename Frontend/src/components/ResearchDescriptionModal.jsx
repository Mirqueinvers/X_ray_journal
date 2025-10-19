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
  setTextareaRef
}) {
  const [expandedPlaque, setExpandedPlaque] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedNarrowingLevel, setSelectedNarrowingLevel] = useState(null);
  const [selectedChangeLevel, setSelectedChangeLevel] = useState(null);
  const [selectedShapeLevel, setSelectedShapeLevel] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (setTextareaRef) setTextareaRef(textareaRef.current);
  }, [setTextareaRef]);

  useEffect(() => {
    if (description && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.value = description;
      textarea.focus();
      textarea.setSelectionRange(description.length, description.length);
    }
  }, [description]);

  const insertTextToTextarea = (textToInsert) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

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

  const saveDescription = async () => {
    if (!researchId) return;
    const text = textareaRef.current?.value || "";
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/save-research-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ research_id: researchId, description: text })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
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
    "Рентгенография коленных суставов": ResearchPlaques.KneeResearchPlaques,
    "Рентгенография левого коленного сустава": ResearchPlaques.KneeResearchPlaques,
    "Рентгенография правого коленного сустава": ResearchPlaques.KneeResearchPlaques,
    "Рентгенография тазобедренных суставов": ResearchPlaques.HipResearchPlaques,
    "Рентгенография левого тазобедренного сустава": ResearchPlaques.HipResearchPlaques,
    "Рентгенография правого тазобедренного сустава": ResearchPlaques.HipResearchPlaques,
    "Рентгенография стоп": ResearchPlaques.FeetResearchPlaques,
    "Рентгенография левой стопы": ResearchPlaques.FeetResearchPlaques,
    "Рентгенография правой стопы": ResearchPlaques.FeetResearchPlaques,
    "Рентгенография стоп (плоскостопие)": ResearchPlaques.FlatfootResearchPlaques,
    "Рентгенография кистей": ResearchPlaques.HandResearchPlaques,
    "Рентгенография левой кисти": ResearchPlaques.HandResearchPlaques,
    "Рентгенография правой кисти": ResearchPlaques.HandResearchPlaques,
    "Рентгенография поясничного отдела позвоночника": ResearchPlaques.LumbarResearchPlaques,
    "Рентгенография грудопоясничного отдела позвоночника": ResearchPlaques.LumbarResearchPlaques,
    "Рентгенография грудного отдела позвоночника": ResearchPlaques.ThoracicResearchPlaques,
    "Рентгенография шейного отдела позвоночника": ResearchPlaques.CervicalResearchPlaques,
    "Рентгенография органов грудной клетки": ResearchPlaques.LungResearchPlaques,
    "Рентгенография легких": ResearchPlaques.LungResearchPlaques,
    "Рентгенография левого легкого": ResearchPlaques.LungResearchPlaques,
    "Рентгенография правого легкого": ResearchPlaques.LungResearchPlaques,
    "Рентгенография голеностопных суставов": ResearchPlaques.AnkleResearchPlaques,
    "Рентгенография локтевых суставов": ResearchPlaques.ElbowResearchPlaques,
    "Рентгенография плечевых суставов": ResearchPlaques.ShoulderResearchPlaques,
    "Рентгенография лучезапястных суставов": ResearchPlaques.WristResearchPlaques,
    "Рентгенография пяточных костей": ResearchPlaques.CalcaneusResearchPlaques,
    "Рентгенография придаточных пазух носа": ResearchPlaques.ParanasalResearchPlaques,
    "Рентгенография грудной клетки": ResearchPlaques.ChestResearchPlaques
  };

  const ResearchComponent = researchMap[selectedResearch];

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="relative bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // клики внутри модалки не закрывают
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-8 h-full flex flex-col">
          <div className="flex h-full">
            {/* Левая часть — textarea */}
            <div className="w-2/3 pr-4 relative flex flex-col">
              <textarea
                ref={textareaRef}
                className="w-full h-full p-4 bg-gray-700 border border-yellow-500 rounded text-yellow-200 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-1"
                placeholder="Введите описание исследования..."
                defaultValue={description}
              />

              {/* Кнопка сохранить */}
              <button
                onClick={saveDescription}
                className="mt-2 p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 hover:bg-gray-600 transition-colors"
              >
                {saving ? "Сохраняем..." : saveSuccess ? "Сохранено!" : "Сохранить"}
              </button>
            </div>

            {/* Разделитель */}
            <div className="w-1 flex items-center justify-center">
              <div className="h-full w-px bg-yellow-500"></div>
            </div>

            {/* Правая часть — плашки */}
            <div className="w-1/3 pl-4">
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
                  setOpenModal={setOpenModal}
                  insertTextToTextarea={insertTextToTextarea}
                />
              )}
            </div>
          </div>

          {/* Вложенные модалки */}
          {openModal && (() => {
            // Обрабатываем модалки с параметрами (например, SpineDiagnosisModal:cervical)
            if (openModal.startsWith("SpineDiagnosisModal:")) {
              const region = openModal.split(":")[1]; // "cervical", "thoracic" или "lumbar"
              const ModalComponent = Modals["SpineDiagnosisModal"];
              if (!ModalComponent) return null;
              return (
                <ModalComponent 
                  isOpen={true} 
                  onClose={() => setOpenModal(null)} 
                  textareaRef={textareaRef}
                  spineRegion={region} // ← передаем регион
                />
              );
            }
            
            // Обычные модалки без параметров
            const ModalComponent = Modals[openModal];
            if (!ModalComponent) return null;
            return <ModalComponent isOpen={true} onClose={() => setOpenModal(null)} textareaRef={textareaRef} />;
          })()}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
