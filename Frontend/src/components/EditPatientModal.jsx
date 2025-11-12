import { useEffect, useRef } from "react";

export default function EditPatientModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}) {
  const fioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (fioRef.current && document.activeElement !== fioRef.current) {
          fioRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleBlur(e) {
    const { id, value } = e.target;
    const capitalized = capitalizeFirstLetter(value);
    if (value === capitalized) return;

    onChange({
      target: {
        id,
        value: capitalized,
      },
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Закрыть"
          type="button"
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
          Редактировать пациента
        </h3>

        <div className="mb-3">
          <label
            htmlFor="fio"
            className="block text-sm text-gray-600 mb-1"
            title="Введите ФИО пациента"
          >
            ФИО <span className="text-gray-900">*</span>
          </label>
          <input
            ref={fioRef}
            id="fio"
            placeholder="ФИО"
            value={formData.fio}
            onChange={onChange}
            onBlur={handleBlur}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-800 border border-gray-300 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="birth_date"
            className="block text-sm text-gray-600 mb-1"
            title="Введите дату рождения (ДДММГГГГ)"
          >
            Дата рождения <span className="text-gray-900">*</span>
          </label>
          <input
            id="birth_date"
            placeholder="ДДММГГГГ"
            value={formData.birth_date}
            onChange={onChange}
            onBlur={handleBlur}
            maxLength={8}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-800 border border-gray-300 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="adress"
            className="block text-sm text-gray-600 mb-1"
            title="Введите адрес пациента"
          >
            Адрес
          </label>
          <input
            id="adress"
            placeholder="Адрес"
            value={formData.adress}
            onChange={onChange}
            onBlur={handleBlur}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-800 border border-gray-300 text-center focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onSave}
            className="bg-black text-white font-medium px-5 py-2.5 rounded-md hover:bg-gray-800 transition"
            type="button"
            title="Сохранить изменения пациента"
          >
            Сохранить изменения
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-md hover:bg-gray-300 transition"
            type="button"
            title="Отмена редактирования"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
