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
    if (showForm && lastNameRef.current) {
      lastNameRef.current.focus();
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

  return (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    onClick={() => setShowForm(false)}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-gray-900 rounded shadow-lg p-6 max-w-md w-full relative text-yellow-200 border-[1px] border-yellow-500"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
        aria-label="Закрыть форму"
        type="button"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4 text-yellow-300">Добавить пациента</h2>

      <input
        ref={lastNameRef}
        id="last_name"
        placeholder={placeholders.last_name || "Фамилия"}
        value={formData.last_name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
        autoComplete="off"
      />
      <input
        id="first_name"
        placeholder={placeholders.first_name || "Имя"}
        value={formData.first_name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
        autoComplete="off"
      />
      <input
        id="middle_name"
        placeholder={placeholders.middle_name || "Отчество"}
        value={formData.middle_name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
        autoComplete="off"
      />

      {Object.entries(formData)
        .filter(([key]) =>
          !["full_name", "last_name", "first_name", "middle_name"].includes(key)
        )
        .map(([key, value]) => (
          <input
            key={key}
            id={key}
            placeholder={placeholders[key] || key}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
            autoComplete="off"
            maxLength={key === "birth_date" ? 8 : undefined}
          />
        ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
          type="button"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
);

}
