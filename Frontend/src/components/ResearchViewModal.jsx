import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import API_BASE from "./api";

export default function ResearchViewModal({ researchId, description: initialDescription, onClose }) {
  const [description, setDescription] = useState(initialDescription || "");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(initialDescription || "");
  const textareaRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.stopPropagation();
    }
  };

  const hasChanges = description !== originalDescription;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[1200px] h-[700px] overflow-hidden flex flex-col border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          title="Закрыть"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Контент */}
        <div className="flex flex-col flex-1 p-8 bg-gray-50">
          {loading ? (
            <div className="text-gray-500 flex items-center justify-center h-full">
              Загрузка описания...
            </div>
          ) : (
            <>
              <h3 className="text-gray-800 font-semibold mb-4 text-lg">
                Описание исследования
              </h3>

              <textarea
                ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 w-full p-4 rounded-xl text-gray-800 resize-none transition outline-none border ${
                  isEditing
                    ? "bg-white border-gray-300 focus:border-gray-500 focus:ring-0"
                    : "bg-gray-100 border-transparent cursor-not-allowed text-gray-500"
                }`}
                readOnly={!isEditing}
                placeholder={
                  isEditing
                    ? "Введите описание исследования..."
                    : "Описание отсутствует"
                }
              />

              {hasChanges && isEditing && (
                <div className="mt-2 text-sm text-gray-500">
                  Есть несохранённые изменения
                </div>
              )}

              {/* Кнопки управления */}
              <div className="mt-6 flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Редактировать
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving || !hasChanges}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                        saving || !hasChanges
                          ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
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
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
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
