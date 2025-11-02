import { useEffect, useState } from 'react';
import {
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
  TrashIcon,
  PencilIcon,
  ClipboardIcon,
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
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

  const handleDeleteResearch = async (researchId) => {
    if (!confirm('Удалить исследование?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/research/${researchId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPatientsOnDate((prev) =>
          prev.map((p) => ({
            ...p,
            researches: p.researches.filter((r) => r.id !== researchId),
          }))
        );
      } else {
        alert(data.error || 'Ошибка при удалении');
      }
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      alert('Ошибка сервера');
    }
  };

  const handleIssueResearch = async (researchId, isCancel) => {
    try {
      const res = await fetch(`${API_BASE}/api/research/${researchId}/issue`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issued_on_hands: !isCancel }),
      });

      const data = await res.json();
      if (data.success) {
        setPatientsOnDate((prev) =>
          prev.map((patient) => ({
            ...patient,
            researches: patient.researches.map((r) =>
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

  const handleCopy = (e, patient) => {
    e.stopPropagation();
    const parts = patient.full_name.trim().split(' ');
    const initials =
      parts.length >= 3
        ? `${parts[0][0]}${parts[1][0]}${parts[2][0]}`.toLowerCase()
        : parts.map((w) => w[0].toLowerCase()).join('');
    const formattedBirth = patient.birth_date
      ? patient.birth_date.split('-').reverse().join('').replaceAll('.', '')
      : '';
    const result = `${initials}${formattedBirth}`;
    navigator.clipboard.writeText(result);
    setCopiedId(patient.id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  return (
    <div className="mb-8 w-full">
      {/* Белая подкладка под весь блок */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {patientsOnDate.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl py-16 px-6 text-gray-500">
            <UserIcon className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-gray-700 font-medium">Нет пациентов на выбранную дату</p>
            <p className="text-gray-500 text-sm mt-1">
              Нажмите <span className="text-gray-500">"Добавить пациента"</span> чтобы начать
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {patientsOnDate.map((p) => (
              <div
                key={p.id}
                className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md overflow-hidden cursor-pointer"
                onClick={() => setFocusedPatientId(focusedPatientId === p.id ? null : p.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setFocusedPatientId(focusedPatientId === p.id ? null : p.id);
                  }
                }}
              >
                {/* Левая синяя полоса */}
                <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl border-l-4 border-blue-500"></div>


                <div className="p-4 flex flex-col relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1 flex-wrap">
                      <UserIcon className="h-6 w-6 text-blue-500 mt-1" />
                      <span className="text-gray-800 font-semibold mt-1">{p.full_name}</span>
                      <span className="text-gray-500 text-sm mt-1">
                        {formatBirthDate(p.birth_date)}
                      </span>

                      <button
                        onClick={(e) => handleCopy(e, p)}
                        className="relative w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform ml-1 mt-1"
                        title="Скопировать ФИО и ДР"
                      >
                        <ClipboardIcon
                          className={`h-5 w-5 absolute transition-all duration-300 transform ${
                            copiedId === p.id ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                          }`}
                        />
                        <CheckIcon
                          className={`h-5 w-5 absolute text-green-500 transition-all duration-300 transform ${
                            copiedId === p.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(p.id);
                        }}
                        className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-400 font-medium"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Добавить исследование
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(p);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePatient(p.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span>{p.adress}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-gray-500 font-medium">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    <span>Исследования: {p.researches?.length || 0}</span>
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
    </div>
  );
}
