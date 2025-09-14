export default function EditPatientModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}) {
  if (!isOpen) return null;

  return (
  <div
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-gray-900 text-yellow-200 rounded-lg p-6 w-full max-w-md border border-yellow-500"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
        aria-label="Закрыть"
        type="button"
      >
        &times;
      </button>

      <h3 className="text-lg font-bold mb-4 text-center text-yellow-300">
        Редактировать пациента
      </h3>

      <input
        id="fio"
        placeholder="ФИО"
        value={formData.fio}
        onChange={onChange}
        className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-yellow-200 border border-yellow-500 text-center"
      />
      <input
        id="birth_date"
        placeholder="Дата рождения (ДДММГГГ)"
        value={formData.birth_date}
        onChange={onChange}
        maxLength={8}
        className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-yellow-200 border border-yellow-500 text-center"
      />
      <input
        id="adress"
        placeholder="Адрес"
        value={formData.adress}
        onChange={onChange}
        className="w-full mb-4 px-2 py-1 rounded bg-gray-800 text-yellow-200 border border-yellow-500 text-center"
      />

      <div className="flex justify-between">
        <button
          onClick={onSave}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
        >
          Сохранить изменения
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 text-yellow-200 px-4 py-2 rounded hover:bg-gray-500"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
);

}
