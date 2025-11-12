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
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Закрыть окно"
          type="button"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Редактировать исследование
        </h2>

        {Object.entries(researchData).map(([name, value]) => {
          // пропускаем поля id, description и issued_on_hand
          if (name === "id" || name === "description" || name === "issued_on_hands") return null;
          return (
            <input
              key={name}
              id={name}
              name={name}
              placeholder={researchPlaceholders[name] || name}
              value={value || ""}
              onChange={onChange}
              className="border border-gray-300 mb-3 w-full px-3 py-2 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
              autoComplete="off"
            />
          );
        })}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onSave}
            className="bg-black text-white font-medium px-5 py-2.5 rounded-md hover:bg-gray-800 transition"
            type="button"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-md hover:bg-gray-300 transition"
            type="button"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
