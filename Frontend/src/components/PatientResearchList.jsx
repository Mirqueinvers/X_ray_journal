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
  const [textareaRef, setTextareaRef] = useState(null);
  const [selectedResearchId, setSelectedResearchId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  useEffect(() => {
    const issuedIds = researches?.filter(r => r.issued_on_hands).map(r => r.id) || [];
    setIssuedResearchIds(issuedIds);
  }, [researches]);

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

  const openTypeModal = (researchId = null) => {
    setSelectedResearchId(researchId);
    setIsTypeModalOpen(true);
  };

  const closeTypeModal = () => setIsTypeModalOpen(false);

  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
    setTempDescription("");
  };

  const handleResearchTypeSelect = (researchName) => {
    setSelectedResearch(researchName);
  };

  const handleInsertText = (text, researchName) => {
    setSelectedResearch(researchName);
    setTempDescription(text);
    setIsTypeModalOpen(false);
    setIsDescriptionModalOpen(true);
  };

  const handleResearchClick = (research) => {
    setSelectedResearchId(research.id);
    const hasDescription = research.description && research.description.trim() !== "";

    if (hasDescription) {
      setSelectedDescription(research.description);
      setIsViewModalOpen(true);
    } else {
      openTypeModal(research.id);
    }
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
              e.stopPropagation(); // ← Останавливаем всплытие
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
                <PencilIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={(e) => { e.stopPropagation(); onEdit?.(r); }}
                  title="Редактировать"
                />
                <TrashIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer hover:text-red-500"
                  onClick={(e) => { e.stopPropagation(); onDelete?.(r.id); }}
                  title="Удалить"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleIssue(r.id); }}
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

      {isTypeModalOpen && (
        <ResearchTypeModal
          onClose={closeTypeModal}
          onResearchSelect={handleResearchTypeSelect}
          onInsertText={handleInsertText}
        />
      )}

      {isDescriptionModalOpen && (
        <ResearchDescriptionModal
          onClose={closeDescriptionModal}
          selectedResearch={selectedResearch}
          description={tempDescription || selectedDescription}
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
