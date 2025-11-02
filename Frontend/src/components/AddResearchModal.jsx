import { useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";

export default function AddResearchModal({
  modalPatientId,
  closeModal,
  researchForm,
  researchPlaceholders,
  handleResearchChange,
  saveResearch,
  patientName,
}) {
  const diagnosisRef = useRef(null);

  // Фокус на диагноз при открытии модалки
  useEffect(() => {
    if (modalPatientId) {
      setTimeout(() => {
        if (diagnosisRef.current && document.activeElement !== diagnosisRef.current) {
          diagnosisRef.current.focus();
        }
      }, 100);
    }
  }, [modalPatientId]);

  // Автозаполнение полей при выборе области
  useEffect(() => {
    const presets = {
      "Органы грудной клетки": { cassete_size: "35x35", numb_of_proc: "1", dose: "0.15" },
      "Шейный отдел позвоночника": { cassete_size: "18x24", numb_of_proc: "2", dose: "0.33" },
      "Грудной отдел позвоночника": { cassete_size: "30x40", numb_of_proc: "2", dose: "1.16" },
      "Поясничный отдел позвоночника": { cassete_size: "30x40", numb_of_proc: "2", dose: "3.3" },
      "Тазобедренные суставы": { cassete_size: "30x40", numb_of_proc: "1", dose: "1.5" },
      "Череп, гол. мозг, ЧLO": { cassete_size: "18х24", numb_of_proc: "1", dose: "0.11", sent: "ЛОР" },
      "Органы брюшной полости": { cassete_size: "30x40", numb_of_proc: "1", dose: "2.4" },
      "Верхние конечности": { dose: "0.02" },
      "Нижние конечности": { dose: "0.02" },
    };

    const region = researchForm.research_region;
    if (!region) return;

    const preset = presets[region];
    if (!preset) return;

    Object.entries(preset).forEach(([name, value]) => {
      // Заполняем только пустые поля, чтобы не мешать ручному вводу
      if (!researchForm[name]) {
        handleResearchChange({ target: { name, value } });
      }
    });
  }, [researchForm.research_region, handleResearchChange]);

  // Форматирование диагноза
  function handleDiagnosisBlur(e) {
    const val = e.target.value;
    if (val.length > 0) {
      const formatted = val[0].toUpperCase() + val.slice(1);
      if (formatted !== val) {
        handleResearchChange({ target: { name: "dsnapr", value: formatted } });
      }
    }
  }

  if (!modalPatientId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Закрыть"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Новое исследование
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Добавить исследование для пациента:{' '}
          <span className="font-medium text-gray-700">{patientName}</span>
        </p>

        {/* Диагноз */}
        <div className="mb-4 relative rounded-md">
          <label className="block text-sm text-gray-600 mb-1">
            Направительный диагноз <span className="text-gray-900">*</span>
          </label>
          <div className="relative rounded-md">
            <textarea
              name="dsnapr"
              value={researchForm.dsnapr}
              onChange={handleResearchChange}
              onBlur={handleDiagnosisBlur}
              ref={diagnosisRef}
              rows={4}
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                        focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all resize-none"
            />
            {!researchForm.dsnapr && (
              <span className="absolute top-2.5 left-3 text-sm text-gray-500 pointer-events-none">
                Укажите диагноз
              </span>
            )}
          </div>
        </div>

        {/* Сетка с селектами и инпутами */}
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            name="research_region"
            label="Область исследования"
            options={researchPlaceholders.research_region || []}
            value={researchForm.research_region}
            onChange={handleResearchChange}
            placeholder="Выберите область"
            dropdownWidth="280px" // только для области исследования
          />

          <CustomSelect
            name="research_type"
            label="Тип исследования"
            options={researchPlaceholders.research_type || []}
            value={researchForm.research_type}
            onChange={handleResearchChange}
            placeholder="Выберите тип"
          />

          <CustomSelect
            name="cassete_size"
            label="Кассета"
            options={researchPlaceholders.cassete_size || []}
            value={researchForm.cassete_size}
            onChange={handleResearchChange}
            placeholder="Выберите кассету"
          />

          {/* Количество исследований */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Количество исследований <span className="text-gray-900">*</span>
            </label>
            <input
              type="number"
              name="numb_of_proc"
              min="1"
              value={researchForm.numb_of_proc}
              onChange={handleResearchChange}
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                         focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            />
          </div>

          {/* Доза */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Доза облучения <span className="text-gray-900">*</span>
            </label>
            <input
              name="dose"
              value={researchForm.dose}
              onChange={handleResearchChange}
              placeholder="мЗв"
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                         focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            />
          </div>

          {/* Направивший врач */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Направивший врач <span className="text-gray-900">*</span>
            </label>
            <input
              name="sent"
              value={researchForm.sent}
              onChange={handleResearchChange}
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                         focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Кнопка сохранения */}
        <div className="flex justify-end mt-6">
          <button
            onClick={saveResearch}
            className="bg-black text-white font-medium px-5 py-2.5 rounded-md hover:bg-gray-800 transition"
          >
            Добавить исследование
          </button>
        </div>
      </div>
    </div>
  );
}
