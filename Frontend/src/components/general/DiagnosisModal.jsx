import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import diagnosisSamples from "./diagnosisSamples";

export default function DiagnosisModal({ 
  isOpen, 
  onClose, 
  researchType, 
  onDiagnosisSelect 
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  // Получаем примеры диагнозов для данного типа исследования
  const examples = diagnosisSamples[researchType] || [];
  
  // Фильтруем примеры по поисковому запросу
  const filteredExamples = examples.filter(example =>
    example.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (diagnosis) => {
    onDiagnosisSelect(diagnosis);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="flex justify-between items-center p-4 border-b border-yellow-500">
          <h2 className="text-xl font-bold text-yellow-200">
            Выбор диагноза - {getResearchTypeName(researchType)}
          </h2>
          <button
            onClick={onClose}
            className="text-yellow-400 hover:text-yellow-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Поиск */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Поиск диагноза..."
            className="w-full p-3 bg-gray-700 border border-yellow-500 rounded text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Список диагнозов */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 gap-2">
            {filteredExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleSelect(example)}
                className="p-3 bg-gray-700 text-yellow-200 rounded border border-yellow-500 hover:bg-gray-600 hover:border-yellow-400 transition-colors text-left"
              >
                {example}
              </button>
            ))}
          </div>
          
          {filteredExamples.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              Диагнозы не найдены
            </div>
          )}
        </div>

        {/* Кнопка ручного ввода */}
        <div className="p-4 border-t border-yellow-500">
          <button
            onClick={() => handleSelect("")}
            className="w-full p-3 bg-gray-700 text-yellow-200 rounded border border-yellow-500 hover:bg-gray-600 hover:border-yellow-400 transition-colors"
          >
            Ввести диагноз вручную
          </button>
        </div>
      </div>
    </div>
  );
}

// Функция для получения читаемого названия типа исследования
function getResearchTypeName(researchType) {
  const names = {
    ogk: "Органы грудной клетки",
    knee: "Коленные суставы",
    foot: "Стопы",
    hand: "Кисти",
    hip: "Тазобедренные суставы",
    spine: "Позвоночник",
    shoulder: "Плечевые суставы",
    elbow: "Локтевые суставы",
    wrist: "Лучезапястные суставы",
    ankle: "Голеностопные суставы",
    calcaneus: "Пяточные кости",
    paranasal: "Придаточные пазухи носа"
  };
  return names[researchType] || researchType;
}