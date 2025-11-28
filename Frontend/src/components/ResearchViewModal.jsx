// Frontend/src/components/ResearchViewModal.jsx
import { useState, useEffect, useRef } from "react";
import { CheckIcon, PencilIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import API_BASE from "./api";
import BaseModal from "./common/BaseModal";

export default function ResearchViewModal({ researchId, description: initialDescription, onClose }) {
  const [description, setDescription] = useState(initialDescription || "");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(initialDescription || "");
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`\n\n${description}\n`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

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

  // Определяем, открыта ли модалка
  const isOpen = !!researchId || !!initialDescription;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      showCloseButton={true}
      closeOnOverlayClick={true}
      titleClassName="mb-4"
      bodyClassName="bg-gray-50 p-0"
      contentClassName="w-[1200px] h-[700px] overflow-hidden"
    >
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            Загрузка описания...
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full p-8 bg-gray-50">
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
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                >
                  <PencilIcon className="h-5 w-5 text-blue-500" />
                  Редактировать
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!description}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    description 
                      ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:shadow-sm hover:border-green-400" 
                      : "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                  }`}
                  title="Копировать описание"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5 text-gray-400" />
                  )}
                  {copied ? "Скопировано!" : "Копировать"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    saving || !hasChanges
                      ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "border-green-400 text-green-700 bg-green-50 hover:bg-green-100 hover:shadow-sm"
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                      Сохранение...
                    </>
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </BaseModal>
  );
}