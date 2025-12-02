// Frontend/src/components/general/DiagnosisModal.jsx
import React, { useState, useRef, useEffect } from "react";
import BaseModal from "../common/BaseModal.jsx";

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
      insertTextToTextarea("\n\n" + "Заключение: " + diagnosisText.trim());
      setDiagnosisText("");
      onClose();
    }
  };

  // ИЗМЕНЕННАЯ ФУНКЦИЯ
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Для Enter: предотвращаем поведение по умолчанию и всплытие
      e.preventDefault();
      e.stopPropagation();

      // Вставляем перенос строки вручную
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = diagnosisText.substring(0, start) + "\n" + diagnosisText.substring(end);
      setDiagnosisText(newText);

      // Возвращаем курсор в правильную позицию
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    } else if (e.key === ' ') { // Для пробела
      // Предотвращаем всплытие, но разрешаем действие по умолчанию (вставку пробела)
      e.stopPropagation();
      // НЕ нужно вызывать preventDefault(), чтобы позволить браузеру вставить пробел
    }
  };

  const title = patientName 
    ? `Заключение для ${patientName}`
    : "Заключение";

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title={title}
      size="small"
    >
      <div className="p-6">
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            rows={4}
            value={diagnosisText}
            onChange={(e) => setDiagnosisText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите заключение..."
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all resize-none"
          />
        </div>

        <div className="flex justify-start space-x-2">
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
    </BaseModal>
  );
}