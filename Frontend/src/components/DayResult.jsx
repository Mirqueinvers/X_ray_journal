import { useEffect, useState } from 'react';
import { TrashIcon, PencilIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
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
  const [copiedId, setCopiedId] = useState(null);

  // Удаление исследования
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

  // Выдача/отмена выдачи снимков
  const handleIssueResearch = async (researchId, isCancel) => {
    try {
      const res = await fetch(`${API_BASE}/api/research/${researchId}/issue`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issued_on_hands: !isCancel }),
      });

      const data = await res.json();
      if (data.success) {
        setPatientsOnDate(prev =>
          prev.map(patient => ({
            ...patient,
            researches: patient.researches.map(r =>
              r.id === researchId ? { ...r, issued_on_hands: !isCancel } : r
            ),
          }))
        );
      } else {
        alert(data.error || 'Ошибка при обновлении статуса');
      }
    } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
      alert('Ошибка сервера');
    }
  };

  // Загрузка пациентов
  useEffect(() => {
    if (!selectedDate) return;

    const fetchPatients = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/patients?date=${selectedDate}`);
        const patients = await res.json();

        const patientsWithResearches = await Promise.all(
          patients.map(async (p) => {
            const resR = await fetch(`${API_BASE}/api/patient/${p.id}/researches`);
            const researches = await resR.json();
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

  // Копирование ФИО и даты рождения в формат "кдю12101990"
  const handleCopy = (e, patient) => {
    e.stopPropagation();
    const parts = patient.full_name.trim().split(' ');
    const initials = parts.length >= 3
      ? `${parts[0][0]}${parts[1][0]}${parts[2][0]}`.toLowerCase()
      : parts.map(w => w[0].toLowerCase()).join('');

    const formattedBirth = patient.birth_date
      ? patient.birth_date.split('-').reverse().join('').replaceAll('.', '')
      : '';

    const result = `${initials}${formattedBirth}`;
    navigator.clipboard.writeText(result);

    setCopiedId(patient.id);
    setTimeout(() => setCopiedId(null), 1000);
  };

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

                  <div className="flex items-center space-x-2 relative">

                    {/* 📋 / ✅ Копировать */}
                    <button
                      onClick={(e) => handleCopy(e, p)}
                      className="relative ml-2 self-center w-5 h-5 flex items-center justify-center text-green-400 hover:text-green-300 transition-transform duration-300"
                      title="Скопировать ФИО и ДР"
                    >
                      {/* Иконка копирования */}
                      <ClipboardIcon
                        className={`h-5 w-5 absolute transition-all duration-300 transform ${
                          copiedId === p.id
                            ? 'opacity-0 scale-75'
                            : 'opacity-100 scale-100'
                        }`}
                      />

                      {/* Галочка после копирования */}
                      <CheckIcon
                        className={`h-5 w-5 absolute text-green-400 transition-all duration-300 transform ${
                          copiedId === p.id
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-75'
                        }`}
                      />
                    </button>

                    {/* ✏️ Редактировать */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                      className="text-yellow-400 hover:text-yellow-200 ml-2 self-center"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>

                    {/* 🗑️ Удалить */}
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
