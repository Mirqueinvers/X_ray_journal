import { useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PatientResearchList from './PatientResearchList';
import API_BASE from './api';

export default function DayResult({
  selectedDate,
  patientsOnDate,
  setPatientsOnDate,
  focusedPatientId,
  setFocusedPatientId,
  openModal,
  openEditModal,
  deletePatient,
  formatBirthDate,
  onEditResearch,
}) {
  // Функция удаления исследования
  const handleDeleteResearch = async (researchId) => {
    if (!confirm('Удалить исследование?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/research/${researchId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPatientsOnDate(prev =>
          prev.map(p => ({ ...p, researches: p.researches.filter(r => r.id !== researchId) }))
        );
      } else {
        alert(data.error || 'Ошибка при удалении');
      }
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      alert('Ошибка сервера');
    }
  };

  // Функция выдачи/отмены выдачи снимков
  const handleIssueResearch = async (researchId, isCancel) => {
    try {
      const res = await fetch(`${API_BASE}/api/research/${researchId}/issue`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issued_on_hands: !isCancel // Если isCancel=true (отмена), устанавливаем false
        })
      });

      const data = await res.json();
      if (data.success) {
        setPatientsOnDate(prev =>
          prev.map(patient => ({
            ...patient,
            researches: patient.researches.map(research =>
              research.id === researchId 
                ? { ...research, issued_on_hands: !isCancel }
                : research
            )
          }))
        );
      } else {
        alert(data.error || 'Ошибка при обновлении статуса');
      }
    } catch (err) {
      console.error('Ошибка при обновlении статуса:', err);
      alert('Ошибка сервера');
    }
  };

  // useEffect для загрузки пациентов и их исследований
  useEffect(() => {
    if (!selectedDate) return;

    const fetchPatients = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/patients?date=${selectedDate}`);
        const patients = await res.json();

        const patientsWithResearches = await Promise.all(
          patients.map(async (p) => {
            const resR = await fetch(`${API_BASE}/api/patient/${p.id}/researches`);
            let researches = await resR.json();
            return { ...p, researches };
          })
        );

        setPatientsOnDate(patientsWithResearches);
      } catch (err) {
        console.error('Ошибка при загрузке пациентов и исследований:', err);
      }
    };

    fetchPatients();
  }, [selectedDate, setPatientsOnDate]);

  return (
    <div className="mb-8 w-full bg-gray-800 p-4 rounded shadow overflow-x-auto border border-yellow-500">
      {patientsOnDate.length === 0 ? (
        <p className="text-yellow-300">Пациенты не найдены</p>
      ) : (
        <div className="flex flex-col gap-2">
          {patientsOnDate.map((p, index) => (
            <div
              key={p.id}
              className="relative border border-yellow-500 rounded-md px-4 py-2 bg-gray-700 shadow-sm hover:shadow-yellow-500/30 transition-all"
              onClick={() => setFocusedPatientId(focusedPatientId === p.id ? null : p.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFocusedPatientId(focusedPatientId === p.id ? null : p.id);
                }
              }}
            >
              <div className="flex flex-col">
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2 items-start">
                    <div className="text-base font-semibold text-yellow-300">{index + 1}.</div>
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-2 text-base font-semibold text-yellow-300">
                        <span>{p.full_name}</span>
                        <span className="text-yellow-200 text-sm">{formatBirthDate(p.birth_date)}</span>
                      </div>
                      <div className="text-sm text-gray-300">Адрес: {p.adress}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(p.id); }}
                      className="px-2 py-0.5 rounded border border-yellow-500 text-yellow-400 hover:text-yellow-300 hover:border-yellow-300 text-xs self-start transition-colors"
                    >
                      Добавить исследование
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                      className="text-yellow-400 hover:text-yellow-200 ml-2 self-center"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deletePatient(p.id); }}
                      className="text-red-500 hover:text-red-400 ml-2 self-center"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {focusedPatientId === p.id && p.researches?.length > 0 && (
                  <PatientResearchList
                    patientId={p.id}
                    researches={p.researches}
                    onDelete={handleDeleteResearch}
                    onEdit={onEditResearch}
                    onIssue={handleIssueResearch}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
