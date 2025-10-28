import { PencilIcon, TrashIcon, DocumentDuplicateIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import ResearchDescriptionModal from './ResearchDescriptionModal';

export default function PatientResearchList({ patientId, researches, onEdit, onDelete, onIssue }) {
  const [issuedResearchIds, setIssuedResearchIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Инициализируем состояние на основе данных с сервера
  useEffect(() => {
    const issuedIds = researches?.filter(r => r.issued_on_hands).map(r => r.id) || [];
    setIssuedResearchIds(issuedIds);
  }, [researches]);
  
  if (!researches || researches.length === 0) return null;

  console.log(`--- Рендер PatientResearchList для patientId=${patientId}`);
  console.log('Исходные исследования:', researches);

  // Функция для выдачи снимков
  const handleIssue = (researchId) => {
    // Если исследование уже выдано, то отменяем выдачу
    const isCurrentlyIssued = issuedResearchIds.includes(researchId) || 
                             researches.find(r => r.id === researchId)?.issued_on_hands;
    
    if (isCurrentlyIssued) {
      handleCancelIssue(researchId);
    } else {
      setIssuedResearchIds(prev => [...prev, researchId]);
      onIssue?.(researchId, false); // false - не отмена, а выдача
    }
  };

  // Функция для отмены выдачи
  const handleCancelIssue = (researchId) => {
    setIssuedResearchIds(prev => prev.filter(id => id !== researchId));
    onIssue?.(researchId, true); // true - отмена выдачи
  };

  // Открыть модальное окно описания
  const openDescriptionModal = () => {
    setIsModalOpen(true);
  };

  // Закрыть модальное окно
  const closeDescriptionModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-3 flex flex-row gap-2 overflow-x-auto">
      {researches.map(r => {
        const isIssued = issuedResearchIds.includes(r.id) || r.issued_on_hands;
        
        console.log('--- Исследование id=', r.id);
        console.log('Все поля исследования:', r);

        return (
          <div
            key={r.id}
            className="relative border-2 border-yellow-500 rounded-md p-2 bg-gray-800 text-yellow-200 text-sm min-w-[200px] flex-shrink-0"
          >
            {/* Иконка описания в левом верхнем углу */}
            <div className="absolute top-1 left-1">
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  openDescriptionModal();
                }}
                className="h-4 w-4 text-yellow-400 cursor-pointer hover:text-yellow-300"
                title="Описание исследования"
              >
                <InformationCircleIcon />
              </button>
            </div>

            {/* Кнопки редактирования, удаления и выдачи */}
            <div className="absolute top-1 right-1 flex gap-1">
              <PencilIcon
                className="h-4 w-4 text-yellow-400 cursor-pointer hover:text-yellow-300"
                onClick={(e) => { e.stopPropagation(); onEdit?.(r); }}
                title="Редактировать"
              />
              <TrashIcon
                className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700"
                onClick={(e) => { e.stopPropagation(); onDelete?.(r.id); }}
                title="Удалить"
              />
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleIssue(r.id); // Объединенная функция для выдачи/отмены
                }}
                className={`h-4 w-4 cursor-pointer ${
                  isIssued 
                    ? 'text-green-500 hover:text-green-300' 
                    : 'text-blue-500 hover:text-blue-300'
                }`}
                title={isIssued ? "Отменить выдачу" : "Выдать снимки"}
              >
                {isIssued ? (
                  <CheckCircleIcon />
                ) : (
                  <DocumentDuplicateIcon />
                )}
              </button>
            </div>

            {/* Основные данные исследования */}
            <div className="mt-3"><strong>Диагноз:</strong> {r.dsnapr}</div>
            <div><strong>Область:</strong> {r.research_region}</div>
            <div><strong>Тип:</strong> {r.research_type}</div>
            <div><strong>Кассета:</strong> {r.cassete_size}</div>
            <div><strong>Исследований:</strong> {r.numb_of_proc}</div>
            <div><strong>Доза:</strong> {r.dose} мЗв</div>
            <div><strong>Направил:</strong> {r.sent}</div>
            
            {/* Блок статуса без разделительной полосы */}
            {isIssued && (
              <div className="mt-2 text-green-400">
                <strong>Статус:</strong> Снимки выданы на руки
              </div>
            )}
          </div>
        );
      })}
      
      {/* Модальное окно описания исследования */}
      {isModalOpen && (
        <ResearchDescriptionModal onClose={closeDescriptionModal} />
      )}
    </div>
  );
}
