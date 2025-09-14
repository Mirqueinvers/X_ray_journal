import { useEffect, useRef } from "react";
import AutocompleteInput from "./AutocompleteInput";

const fieldLabels = {
  dsnapr: "Диагноз направительный",
  research_region: "Область исследования",
  research_type: "Тип исследования",
  cassete_size: "Размер кассеты",
  numb_of_proc: "Количество процедур",
  dose: "Доза облучения",
  sent: "Направивший врач",
};

export default function AddResearchModal({
  modalPatientId,
  closeModal,
  researchForm,
  researchPlaceholders,
  handleResearchChange,
  saveResearch,
}) {
  const diagnosisRef = useRef(null);

  // Фокус на диагноз и "Рентген" по умолчанию
  useEffect(() => {
    if (modalPatientId) {
      setTimeout(() => {
        if (diagnosisRef.current) {
          diagnosisRef.current.focus();
        }
      }, 50);

      if (!researchForm.research_type) {
        handleResearchChange({
          target: { name: "research_type", value: "Рентген" },
        });
      }
    }
  }, [modalPatientId]);

  // Автозаполнение
useEffect(() => {
  const presets = {
    "Органы грудной клетки": { cassete_size: "35x35", numb_of_proc: "1", dose: "0.15" },
    "Шейный отдел позвоночника": { cassete_size: "18x24", numb_of_proc: "2", dose: "0.33" },
    "Грудной отдел позвоночника": { cassete_size: "30x40", numb_of_proc: "2", dose: "1.16" },
    "Поясничный отдел позвоночника": { cassete_size: "30x40", numb_of_proc: "2", dose: "3.3" },
    "Тазобедренные суставы": { cassete_size: "30x40", numb_of_proc: "1", dose: "1.5" },
    "Череп, гол. мозг, ЧЛО": { cassete_size: "18х24", numb_of_proc: "1", dose: "0.11", sent: "ЛОР" },
    "Органы брюшной полости": { cassete_size: "30x40", numb_of_proc: "1", dose: "2.4" },
    "Верхние конечности": { dose: "0.02" },
    "Нижние конечности": { dose: "0.02" },
  };

  const selected = presets[researchForm.research_region];
  if (selected) {
    Object.entries(selected).forEach(([name, value]) => {
      handleResearchChange({ target: { name, value } });
    });
  }
}, [researchForm.research_region]);


  function handleDiagnosisBlur(e) {
    const val = e.target.value;
    if (val.length > 0) {
      const formatted = val[0].toUpperCase() + val.slice(1);
      if (formatted !== val) {
        handleResearchChange({
          target: { name: "dsnapr", value: formatted },
        });
      }
    }
  }

  if (!modalPatientId) return null;

  return (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 "
    onClick={closeModal}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-gray-900 rounded shadow-lg p-6 max-w-md w-full relative text-yellow-200 border-[1px] border-yellow-500"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
        aria-label="Закрыть окно"
        type="button"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4 text-yellow-300">
        Добавить исследование
      </h2>

      {Object.entries(researchForm).map(([name, value]) => {
        const placeholder = researchPlaceholders[name];

        if (name === "dose" || name === "dsnapr") {
          return (
            <div key={name}>
              <input
                name={name}
                placeholder={fieldLabels[name] || name}
                value={value}
                onChange={handleResearchChange}
                onBlur={name === "dsnapr" ? handleDiagnosisBlur : undefined}
                ref={name === "dsnapr" ? diagnosisRef : undefined}
                className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
                autoComplete="off"
              />
            </div>
          );
        }

        if (Array.isArray(placeholder)) {
          return (
            <AutocompleteInput
              key={name}
              name={name}
              value={value}
              options={placeholder}
              placeholder={fieldLabels[name] || name}
              onChange={handleResearchChange}
              className="bg-gray-800 text-yellow-200"
            />
          );
        }

        return (
          <div key={name}>
            <input
              name={name}
              placeholder={fieldLabels[name] || name}
              value={value}
              onChange={handleResearchChange}
              className="border border-yellow-500 mb-2 w-full px-2 py-1 rounded bg-gray-800 text-yellow-200"
              autoComplete="off"
            />
          </div>
        );
      })}

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={saveResearch}
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
          type="button"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
);

}
