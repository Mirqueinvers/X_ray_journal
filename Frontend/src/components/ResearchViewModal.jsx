import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import API_BASE from './api';

export default function ResearchViewModal({ researchId, description: initialDescription, onClose }) {
  const [description, setDescription] = useState(initialDescription || "");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(initialDescription || "");
  const textareaRef = useRef(null);

  // Загружаем описание, если не передано
  useEffect(() => {
    if (!researchId) return;

    if (!initialDescription) {
      setLoading(true);
      axios
        .get(`${API_BASE}/api/get-research-description?research_id=${researchId}`)
        .then((res) => {
          if (res.data.success) {
            const desc = res.data.description || "";
            setDescription(desc);
            setOriginalDescription(desc);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setDescription(initialDescription);
      setOriginalDescription(initialDescription);
    }
  }, [researchId, initialDescription]);

  const handleSave = () => {
    if (!researchId) return;
    setSaving(true);
    axios
      .post(`${API_BASE}/api/save-research-description`, {
        research_id: researchId,
        description,
      })
      .then((res) => {
        if (res.data.success) {
          setOriginalDescription(description);
          setIsEditing(false);
          console.log("Описание успешно сохранено");
        }
      })
      .catch((error) => console.error("Ошибка при сохранении описания:", error))
      .finally(() => setSaving(false));
  };

  const handleCancelEdit = () => {
    setDescription(originalDescription);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  // ⚙️ Исправляем Enter — теперь он делает перенос строки, а не закрывает модалку
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.stopPropagation(); // предотвращаем закрытие
    }
  };

  const hasChanges = description !== originalDescription;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Контент */}
        <div className="flex flex-col flex-1 p-8">
          {loading ? (
            <div className="text-yellow-400 flex items-center justify-center h-full">
              Загрузка описания...
            </div>
          ) : (
            <>
              <h3 className="text-yellow-200 font-semibold mb-2">Описание исследования</h3>

              <textarea
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 w-full p-4 bg-gray-700 border rounded text-yellow-200 resize-none focus:outline-none focus:ring-2 transition ${
                  isEditing
                    ? "border-yellow-500 focus:ring-yellow-500"
                    : "border-gray-600 focus:ring-gray-600 cursor-not-allowed opacity-80"
                }`}
                readOnly={!isEditing}
                placeholder={
                  isEditing ? "Введите описание исследования..." : "Описание отсутствует"
                }
              />

              {hasChanges && isEditing && (
                <div className="mt-2 text-sm text-yellow-400">
                  Есть несохранённые изменения
                </div>
              )}

              {/* Кнопки управления — внизу слева */}
              <div className="mt-6 flex justify-start gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 rounded border border-yellow-500 text-yellow-400 hover:text-yellow-300 hover:border-yellow-300 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Редактировать
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving || !hasChanges}
                      className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors ${
                        saving || !hasChanges
                          ? "border-gray-500 text-gray-400 cursor-not-allowed"
                          : "border-yellow-500 text-yellow-400 hover:text-yellow-300 hover:border-yellow-300"
                      }`}
                    >
                      {saving ? (
                        "Сохранение..."
                      ) : (
                        <>
                          <CheckIcon className="h-5 w-5" />
                          Сохранить
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 rounded border border-yellow-500 text-yellow-400 hover:text-yellow-300 hover:border-yellow-300 transition-colors"
                    >
                      Отмена
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
