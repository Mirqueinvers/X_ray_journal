import React, { useState, useRef, useEffect } from "react";

export default function DiagnosisModal({ onClose, insertTextToTextarea, patientName }) {
  const [diagnosisText, setDiagnosisText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  }, []);

  const handleAdd = () => {
    if (diagnosisText.trim() !== "") {
      insertTextToTextarea("\n\n"+ "Диагноз: " + diagnosisText.trim());
      setDiagnosisText("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Закрыть"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Диагноз
        </h2>
        {patientName && (
          <p className="text-sm text-gray-500 mb-4">
            Добавить диагноз для пациента: <span className="font-medium text-gray-700">{patientName}</span>
          </p>
        )}

        <div className="mb-4">
          <textarea
            ref={textareaRef}
            rows={4}
            value={diagnosisText}
            onChange={(e) => setDiagnosisText(e.target.value)}
            placeholder="Введите диагноз..."
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all resize-none"
          />
        </div>

        <div className="flex justify-start mt-4 space-x-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-blue-400 hover:bg-gray-800 text-white font-semibold transition"
          >
            Добавить
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
