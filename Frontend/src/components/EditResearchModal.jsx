export default function EditResearchModal({
  isOpen,
  onClose,
  researchData,
  researchPlaceholders,
  onChange,
  onSave,
}) {
  if (!isOpen) return null;

  return (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-gray-900 text-yellow-200 border border-yellow-500 rounded p-6 max-w-md w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
        aria-label="Закрыть окно"
        type="button"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4 text-yellow-300">
        Редактировать исследование
      </h2>

      {Object.entries(researchData).map(([name, value]) => {
        if (name === "id") return null; // пропускаем поле с id
        return (
          <input
            key={name}
            id={name}
            name={name}
            placeholder={researchPlaceholders[name] || name}
            value={value || ""}
            onChange={onChange}
            className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
            autoComplete="off"
          />
        );
      })}

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onSave}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
          type="button"
        >
          Сохранить
        </button>
        <button
          onClick={onClose}
          className="bg-gray-700 text-yellow-200 px-4 py-2 rounded hover:bg-gray-600"
          type="button"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
);

}
