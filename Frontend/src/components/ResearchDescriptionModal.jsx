// Frontend/src/components/ResearchDescriptionModal.jsx
import { useState, useRef, useEffect } from "react";
import BaseModal from "./common/BaseModal";
import * as Modals from "./allModals";
import * as ResearchPlaques from "./researchPlaques";
import ChronologicalAgeModal from "./bone_age/ChronologicalAgeModal";
import API_BASE from "./api";

export default function ResearchDescriptionModal({
  isOpen,
  onClose,
  description,
  selectedResearch,
  researchId,
  setTextareaRef,
  onDescriptionSaved,
  modalData
}) {
  const modalIsOpen = isOpen;

  if (!modalIsOpen) return null;

  const [plaqueState, setPlaqueState] = useState({
    expandedPlaque: null,
    selectedSubItem: null,
    selectedNarrowingLevel: null,
    selectedChangeLevel: null,
    selectedShapeLevel: null
  });

  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    success: false,
    error: null
  });

  const [openModal, setOpenModal] = useState(null);
  const [text, setText] = useState(description || "");
  const textareaRef = useRef(null);
  const [insertionData, setInsertionData] = useState(null);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  // НОВОЕ: отдельное состояние для хронологического возраста
  const [boneAgeData, setBoneAgeData] = useState(null);
  const [hasEndoprosthesis, setHasEndoprosthesis] = useState(false);

  // ИСПРАВЛЯЕМ: обновляем текст при изменении modalData
  useEffect(() => {
    if (modalData?.text !== undefined) {
      setText(modalData.text);
    } else if (description) {
      setText(description);
    }
  }, [modalData, description]);

  // ИСПРАВЛЯЕМ: получаем research_id из modalData если не передан напрямую
  const effectiveResearchId = researchId || modalData?.researchId;
  console.log('ResearchDescriptionModal - researchId from props:', researchId);
  console.log('ResearchDescriptionModal - researchId from modalData:', modalData?.researchId);
  console.log('ResearchDescriptionModal - effectiveResearchId:', effectiveResearchId);
  
  useEffect(() => {
    if (setTextareaRef) setTextareaRef(textareaRef.current);
  }, [setTextareaRef]);

  // НОВЫЙ: автоматический фокус на поле при открытии модалки
  useEffect(() => {
    if (!modalIsOpen) return;
    
    const timer = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const cursorPosition = text.length > 0 ? text.length : 0;
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [modalIsOpen, text.length]);

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

  // УПРАВЛЯЕМЫЙ обработчик клавиш
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
      e.stopPropagation();
    }
  };

  const handleOpenModal = (modalName) => {
    console.log('Opening modal:', modalName);
    setIsNestedModalOpen(true);
    setOpenModal(modalName);
  };

  const handleCloseNestedModal = () => {
    console.log('Closing nested modal');
    setIsNestedModalOpen(false);
    setOpenModal(null);
    setBoneAgeData(null);
  };

  // НОВЫЙ обработчик для данных хронологического возраста
  const handleChronologicalAgeSubmit = (ageData) => {
    console.log('=== CHRONOLOGICAL AGE SUBMIT ===');
    console.log('Received age data:', ageData);
    
    const genderParam = ageData.gender === 'female' ? 'female' : 'male';
    console.log('Gender param:', genderParam);
    
    setBoneAgeData({
      age: ageData.age,
      gender: ageData.gender
    });
    
    console.log('Set bone age data:', { age: ageData.age, gender: ageData.gender });
    
    // Сначала закрываем ChronologicalAgeModal
    setOpenModal(null);
    setIsNestedModalOpen(false);
    
    // Затем открываем BoneAgeModal с задержкой
    setTimeout(() => {
      const boneAgeModalName = `BoneAgeModal:${genderParam}`;
      console.log('Opening BoneAgeModal with name:', boneAgeModalName);
      console.log('Available modals in Modals:', Object.keys(Modals));
      
      setOpenModal(boneAgeModalName);
      setIsNestedModalOpen(true);
    }, 200);
  };

  const saveDescription = async () => {
    console.log('saveDescription called with researchId:', effectiveResearchId);
    console.log('text to save:', text);
    
    if (!effectiveResearchId) {
      setSaveStatus(prev => ({ 
        ...prev, 
        saving: false, 
        error: 'Не указан research_id' 
      }));
      return;
    }
    
    setSaveStatus(prev => ({ ...prev, saving: true, error: null }));
    
    const textToSave = text;
    try {
      const res = await fetch(`${API_BASE}/api/save-research-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ research_id: effectiveResearchId, description: textToSave })
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus(prev => ({ ...prev, saving: false, success: true }));
        setTimeout(() => setSaveStatus(prev => ({ ...prev, success: false })), 2000);
        
        const updatedResearch = {
          id: effectiveResearchId,
          description: textToSave,
        };
        
        if (onDescriptionSaved) {
          onDescriptionSaved(updatedResearch);
        } else {
          onClose();
        }
      } else {
        setSaveStatus(prev => ({ 
          ...prev, 
          saving: false, 
          error: data.error || 'Ошибка сохранения' 
        }));
      }
    } catch (err) {
      console.error('Ошибка сохранения описания:', err);
      setSaveStatus(prev => ({ 
        ...prev, 
        saving: false, 
        error: 'Ошибка запроса: ' + err.message 
      }));
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
    "Рентгенография грудной клетки": ResearchPlaques.ChestResearchPlaques,
    "Общее": ResearchPlaques.GeneralResearchPlaques,
    "Костный возраст": ResearchPlaques.BoneAgeResearchPlaques,
  };

  const ResearchComponent = researchMap[selectedResearch];

  const modalContent = (
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
          {saveStatus.saving ? "Сохраняем..." : 
           saveStatus.success ? "Сохранено!" : 
           saveStatus.error ? "Ошибка" : "Сохранить и скопировать"}
        </button>
        
        {/* Показать ошибку если есть */}
        {saveStatus.error && (
          <div className="mt-2 text-red-500 text-sm">
            {saveStatus.error}
          </div>
        )}
      </div>

      <div className="w-px bg-gray-200"></div>

      <div className="flex-1 h-full overflow-y-auto pr-2">
        {ResearchComponent && (
          <ResearchComponent
            expandedPlaque={plaqueState.expandedPlaque}
            setExpandedPlaque={(value) => setPlaqueState(prev => ({ ...prev, expandedPlaque: value }))}
            selectedSubItem={plaqueState.selectedSubItem}
            setSelectedSubItem={(value) => setPlaqueState(prev => ({ ...prev, selectedSubItem: value }))}
            selectedNarrowingLevel={plaqueState.selectedNarrowingLevel}
            setSelectedNarrowingLevel={(value) => setPlaqueState(prev => ({ ...prev, selectedNarrowingLevel: value }))}
            selectedChangeLevel={plaqueState.selectedChangeLevel}
            setSelectedChangeLevel={(value) => setPlaqueState(prev => ({ ...prev, selectedChangeLevel: value }))}
            selectedShapeLevel={plaqueState.selectedShapeLevel}
            setSelectedShapeLevel={(value) => setPlaqueState(prev => ({ ...prev, selectedShapeLevel: value }))}
            textareaRef={textareaRef}
            setOpenModal={handleOpenModal}
            insertTextToTextarea={insertTextToTextarea}
            hasEndoprosthesis={hasEndoprosthesis}
            setHasEndoprosthesis={setHasEndoprosthesis}
          />
        )}
      </div>

      {/* Вложенные модалки */}
      {openModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }}>
          {console.log('Rendering modal:', openModal)}
          {console.log('BoneAgeData:', boneAgeData)}
          {console.log('IsNestedModalOpen:', isNestedModalOpen)}
          
          {openModal.startsWith("ChronologicalAgeModal") ? (
            <ChronologicalAgeModal
              isOpen={true}
              onClose={handleCloseNestedModal}
              gender={openModal.includes(":female") ? "female" : "male"}
              onAgeSubmit={handleChronologicalAgeSubmit}
            />
          ) : openModal.startsWith("BoneAgeModal") ? (
            <Modals.BoneAgeModal
              isOpen={true}
              onClose={handleCloseNestedModal}
              gender={openModal.includes(":female") ? "female" : "male"}
              chronologicalAge={boneAgeData?.age}
              insertTextToTextarea={insertTextToTextarea}
            />
          ) : (
            (() => {
              const ModalComponent = Modals[openModal];
              if (!ModalComponent) {
                console.error('Modal component not found:', openModal);
                console.log('Available modals:', Object.keys(Modals));
                return null;
              }
              return (
                <ModalComponent
                  isOpen={true}
                  onClose={handleCloseNestedModal}
                  textareaRef={textareaRef}
                  insertTextToTextarea={insertTextToTextarea}
                  hasEndoprosthesis={hasEndoprosthesis}
                />
              );
            })()
          )}
        </div>
      )}
    </div>
  );

  return (
    <BaseModal
      isOpen={modalIsOpen}
      onClose={onClose}
      title="Описание исследования"
      size="custom"
      contentClassName="w-[1300px] h-[700px] overflow-hidden relative"
      bodyClassName="p-0"
      closeOnOverlayClick={!isNestedModalOpen}
    >
      {modalContent}
    </BaseModal>
  );
}