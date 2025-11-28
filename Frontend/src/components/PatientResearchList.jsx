import { PencilIcon, TrashIcon, DocumentDuplicateIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useModal, useModalWithData } from './hooks/useModal';
import ResearchTypeModal from './ResearchTypeModal';
import ResearchDescriptionModal from './ResearchDescriptionModal';
import ResearchViewModal from './ResearchViewModal';

export default function PatientResearchList({ 
  patientId, 
  researches, 
  onDelete, 
  onIssue,
  onEdit,           // Для редактирования данных исследования
  onEditDescription, // Для редактирования описания исследования
  onUpdateResearch 
}) {
  // Заменяем множественные useState на useModal хуки
  const typeModal = useModal();           // Для модалки выбора типа исследования
  const descriptionModal = useModalWithData(); // Для модалки описания
  const viewModal = useModalWithData();   // Для модалки просмотра описания

  const [issuedResearchIds, setIssuedResearchIds] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [textareaRef, setTextareaRef] = useState(null);

  useEffect(() => {
    const issuedIds = researches?.filter(r => r.issued_on_hands).map(r => r.id) || [];
    setIssuedResearchIds(issuedIds);
  }, [researches]);

  // НОВАЯ ФУНКЦИЯ: обработчик успешного сохранения описания
  const handleDescriptionSaved = (updatedResearch) => {
    if (onUpdateResearch) {
      onUpdateResearch(updatedResearch);
    }
    descriptionModal.closeModal();
    setSelectedResearch(null);
  };

  const handleIssue = (researchId) => {
    const isCurrentlyIssued =
      issuedResearchIds.includes(researchId) ||
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

  const handleResearchTypeSelect = (researchName) => {
    setSelectedResearch(researchName);
  };

  const handleInsertText = (text, researchName) => {
    setSelectedResearch(researchName);
    descriptionModal.openModal({ 
      text, 
      researchName,
      researchId: typeModal.modalData?.researchId 
    });
    typeModal.closeModal();
  };

  const handleResearchClick = (research) => {
    const hasDescription = research.description && research.description.trim() !== "";

    if (hasDescription) {
      viewModal.openModal({
        id: research.id,
        description: research.description
      });
    } else {
      typeModal.openModal({ researchId: research.id });
    }
  };

  // Функция для открытия модалки редактирования данных исследования
  const handleEditResearch = (research) => {
    console.log('Opening edit research modal for:', research); // Отладочный лог
    onEdit?.(research); // Вызываем функцию редактирования данных из родительского компонента
  };

  // Функция для открытия модалки редактирования описания
  const handleEditDescription = (research) => {
    onEditDescription?.(research);
  };

  return (
    <div className="mt-3 flex flex-col gap-4">
      {researches.map((r, index) => {
        const isIssued = issuedResearchIds.includes(r.id) || r.issued_on_hands;
        const hasDescription = r.description && r.description.trim() !== "";

        return (
          <div
            key={r.id}
            onClick={(e) => {
              e.stopPropagation();
              handleResearchClick(r);
            }}
            className={`cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
              hasDescription ? 'hover:border-green-400' : 'hover:border-gray-400'
            }`}
          >
            <div className="flex justify-between items-center p-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                  Исследование #{index + 1}
                </span>

                {hasDescription && (
                  <span className="text-green-600 text-xs font-semibold">
                    (описание добавлено)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Кнопка редактирования данных исследования */}
                <PencilIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleEditResearch(r);
                  }}
                  title="Редактировать данные"
                />
                

                
                <TrashIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer hover:text-red-500"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onDelete?.(r.id); 
                  }}
                  title="Удалить"
                />
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleIssue(r.id); 
                  }}
                  className={`h-5 w-5 cursor-pointer ${
                    isIssued ? 'text-green-500 hover:text-green-300' : 'text-gray-500 hover:text-blue-300'
                  }`}
                  title={isIssued ? "Отменить выдачу" : "Выдать снимки"}
                >
                  {isIssued ? <CheckCircleIcon /> : <DocumentDuplicateIcon />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 p-3 text-sm text-gray-700">
              <div><strong>Диагноз:</strong> {r.dsnapr}</div>
              <div><strong>Область:</strong> {r.research_region}</div>
              <div><strong>Тип:</strong> {r.research_type}</div>
              <div><strong>Кассета:</strong> {r.cassete_size}</div>
              <div><strong>Количество:</strong> {r.numb_of_proc}</div>
              <div><strong>Доза:</strong> {r.dose} мЗв</div>
              <div><strong>Направил:</strong> {r.sent}</div>
            </div>

            {isIssued && (
              <div className="px-3 pb-3 text-blue-600 text-xs font-medium">
                <strong>Статус:</strong> Снимки выданы на руки
              </div>
            )}
          </div>
        );
      })}

      {/* Модалка выбора типа исследования */}
      {typeModal.isOpen && (
        <ResearchTypeModal
          onClose={typeModal.closeModal}
          onResearchSelect={handleResearchTypeSelect}
          onInsertText={handleInsertText}
          researchId={typeModal.modalData?.researchId}
        />
      )}

      {/* Модалка описания исследования */}
      {descriptionModal.isOpen && (
        <ResearchDescriptionModal
          onClose={descriptionModal.closeModal}
          selectedResearch={selectedResearch}
          description={descriptionModal.modalData?.text || ""}
          researchId={descriptionModal.modalData?.researchId}
          setTextareaRef={setTextareaRef}
          onDescriptionSaved={handleDescriptionSaved}
        />
      )}

      {/* Модалка просмотра описания */}
      {viewModal.isOpen && (
        <ResearchViewModal
          onClose={viewModal.closeModal}
          researchId={viewModal.modalData?.id}
          description={viewModal.modalData?.description}
        />
      )}
    </div>
  );
}