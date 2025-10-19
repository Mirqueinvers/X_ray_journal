import { PencilIcon, TrashIcon, DocumentDuplicateIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import ResearchTypeModal from './ResearchTypeModal';
import ResearchDescriptionModal from './ResearchDescriptionModal';
import ResearchViewModal from './ResearchViewModal';

export default function PatientResearchList({ patientId, researches, onEdit, onDelete, onIssue }) {
  const [issuedResearchIds, setIssuedResearchIds] = useState([]);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [currentDescription, setCurrentDescription] = useState("");
  const [insertedText, setInsertedText] = useState("");
  const [textareaRef, setTextareaRef] = useState(null);
  const [selectedResearchId, setSelectedResearchId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  useEffect(() => {
    const issuedIds = researches?.filter(r => r.issued_on_hands).map(r => r.id) || [];
    setIssuedResearchIds(issuedIds);
  }, [researches]);

  if (!researches || researches.length === 0) return null;

  const handleIssue = (researchId) => {
    const isCurrentlyIssued = issuedResearchIds.includes(researchId) ||
      researches.find(r => r.id === researchId)?.issued_on_hands;

    if (isCurrentlyIssued) {
      handleCancelIssue(researchId);
    } else {
      setIssuedResearchIds(prev => [...prev, researchId]);
      onIssue?.(researchId, false);
    }
  };

  const handleCancelIssue = (researchId) => {
    setIssuedResearchIds(prev => prev.filter(id => id !== researchId));
    onIssue?.(researchId, true);
  };

  const openTypeModal = (ref) => {
    setTextareaRef(ref);
    setIsTypeModalOpen(true);
  };

  const closeTypeModal = () => setIsTypeModalOpen(false);
  const handleResearchTypeSelect = (researchName) => {
    setSelectedResearch(researchName);
    setCurrentDescription("");
  };

  const handleOpenDescriptionModal = () => setIsDescriptionModalOpen(true);
  const handleInsertText = (text, researchName) => {
    setInsertedText(text);
    setSelectedResearch(researchName);
  };
  const closeDescriptionModal = () => setIsDescriptionModalOpen(false);

  // Функция для обработки клика по кнопке "Описание"
  const handleDescriptionClick = (research) => {
    setSelectedResearchId(research.id);
    
    // Проверяем, есть ли описание в данных исследования
    // Убедитесь, что research.description приходит с бэкенда
    console.log('Research data:', research); // Добавьте это для отладки
    
    if (research.description && research.description.trim() !== "") {
      // Есть описание — открываем модалку просмотра
      setSelectedDescription(research.description);
      setIsViewModalOpen(true);
    } else {
      // Нет описания — открываем модалку выбора типа исследования
      openTypeModal();
    }
  };

  return (
    <div className="mt-3 flex flex-row gap-2 overflow-x-auto">
      {researches.map(r => {
        const isIssued = issuedResearchIds.includes(r.id) || r.issued_on_hands;

        return (
          <div
            key={r.id}
            className="relative border-2 border-yellow-500 rounded-md bg-gray-800 text-yellow-200 text-sm min-w-[200px] flex-shrink-0"
          >
            {/* Блок кнопок сверху */}
            <div className="relative flex gap-1 p-1 bg-gray-800 rounded-t-md">
              {/* Разорванный бордер снизу */}
              <span className="absolute left-2 right-2 bottom-0 border-b border-yellow-500"></span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDescriptionClick(r);
                }}
                className="px-2 py-0.5 rounded border border-yellow-500 text-yellow-400 hover:text-yellow-300 hover:border-yellow-300 text-xs self-start transition-colors"
                title="Описание исследования"
              >
                Описание
              </button>

              <PencilIcon
                className="h-5 w-5 ml-14 text-yellow-400 cursor-pointer hover:text-yellow-300"
                onClick={(e) => { e.stopPropagation(); onEdit?.(r); }}
                title="Редактировать"
              />
              <TrashIcon
                className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={(e) => { e.stopPropagation(); onDelete?.(r.id); }}
                title="Удалить"
              />
              <button
                onClick={(e) => { e.stopPropagation(); handleIssue(r.id); }}
                className={`h-5 w-5 cursor-pointer ${isIssued ? 'text-green-500 hover:text-green-300' : 'text-blue-500 hover:text-blue-300'}`}
                title={isIssued ? "Отменить выдачу" : "Выдать снимки"}
              >
                {isIssued ? <CheckCircleIcon /> : <DocumentDuplicateIcon />}
              </button>
            </div>

            {/* Основное содержимое исследования */}
            <div className="p-2">
              <div><strong>Диагноз:</strong> {r.dsnapr}</div>
              <div><strong>Область:</strong> {r.research_region}</div>
              <div><strong>Тип:</strong> {r.research_type}</div>
              <div><strong>Кассета:</strong> {r.cassete_size}</div>
              <div><strong>Исследований:</strong> {r.numb_of_proc}</div>
              <div><strong>Доза:</strong> {r.dose} мЗв</div>
              <div><strong>Направил:</strong> {r.sent}</div>
              {isIssued && (
                <div className="mt-2 text-green-400">
                  <strong>Статус:</strong> Снимки выданы на руки
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Модальные окна */}
      {isTypeModalOpen && (
        <ResearchTypeModal
          onClose={closeTypeModal}
          onResearchSelect={handleResearchTypeSelect}
          onInsertText={handleInsertText}
          onOpenDescriptionModal={handleOpenDescriptionModal}
        />
      )}
      
      {isDescriptionModalOpen && (
        <ResearchDescriptionModal
          onClose={closeDescriptionModal}
          selectedResearch={selectedResearch}
          description={insertedText}
          researchId={selectedResearchId}
          setTextareaRef={setTextareaRef}
        />
      )}

      {isViewModalOpen && (
        <ResearchViewModal
          onClose={() => setIsViewModalOpen(false)}
          researchId={selectedResearchId}
          description={selectedDescription}
        />
      )}
    </div>
  );
}
