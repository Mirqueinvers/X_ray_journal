import { useEffect, useRef } from "react";

export default function AddPatientModal({
  showForm,
  setShowForm,
  formData,
  placeholders,
  handleChange,
  handleSubmit,
}) {
  const lastNameRef = useRef(null);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        if (lastNameRef.current && document.activeElement !== lastNameRef.current) {
          lastNameRef.current.focus();
        }
      }, 100);
    }
  }, [showForm]);

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleBlur(e) {
    const { id, value } = e.target;
    const capitalized = capitalizeFirstLetter(value);
    if (value === capitalized) return;

    handleChange({
      target: {
        id,
        value: capitalized,
      },
    });
  }

  if (!showForm) return null;

  // Человеческие названия для label и title
  const fieldTitles = {
    last_name: "Фамилия",
    first_name: "Имя",
    middle_name: "Отчество",
    birth_date: "Дата рождения",
    address: "Адрес",
    phone: "Телефон",
    polis: "Полис",
    snils: "СНИЛС",
    passport: "Паспорт",
    organization: "Организация",
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setShowForm(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Закрыть форму"
          type="button"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Новый пациент
        </h2>
        <p className="text-sm text-gray-500 mb-5">Заполните данные пациента</p>

        {/* Фамилия */}
        <div className="mb-3">
          <label
            htmlFor="last_name"
            className="block text-sm text-gray-600 mb-1"
            title="Введите фамилию пациента"
          >
            Фамилия <span className="text-gray-900">*</span>
          </label>
          <input
            ref={lastNameRef}
            id="last_name"
            placeholder="Фамилия"
            value={formData.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        {/* Имя */}
        <div className="mb-3">
          <label
            htmlFor="first_name"
            className="block text-sm text-gray-600 mb-1"
            title="Введите имя пациента"
          >
            Имя <span className="text-gray-900">*</span>
          </label>
          <input
            id="first_name"
            placeholder="Имя"
            value={formData.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        {/* Отчество */}
        <div className="mb-3">
          <label
            htmlFor="middle_name"
            className="block text-sm text-gray-600 mb-1"
            title="Введите отчество пациента"
          >
            Отчество
          </label>
          <input
            id="middle_name"
            placeholder="Отчество"
            value={formData.middle_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            autoComplete="off"
          />
        </div>

        {/* Остальные поля */}
        {Object.entries(formData)
          .filter(([key]) =>
            !["full_name", "last_name", "first_name", "middle_name"].includes(key)
          )
          .map(([key, value]) => (
            <div className="mb-3" key={key}>
              <label
                htmlFor={key}
                className="block text-sm text-gray-600 mb-1"
                title={`Введите ${fieldTitles[key] || key}`}
              >
                {fieldTitles[key] || key}
              </label>
              <input
                id={key}
                placeholder={placeholders[key] || fieldTitles[key] || key}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                           focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
                autoComplete="off"
                maxLength={key === "birth_date" ? 8 : undefined}
              />
            </div>
          ))}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-medium px-5 py-2.5 rounded-md hover:bg-gray-800 transition"
            type="button"
            title="Сохранить данные пациента"
          >
            Сохранить пациента
          </button>
        </div>
      </div>
    </div>
  );
}
