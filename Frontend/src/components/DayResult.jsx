import { useEffect, useState } from 'react';
import PatientCard from './PatientCard';
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

  // 🧹 Удаление исследования
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

  // 📄 Выдача / отмена выдачи исследования
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

  // 📅 Загрузка пациентов с исследованиями
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

  // 📋 Копирование ФИО+дата рождения
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {patientsOnDate.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl py-16 px-6 text-gray-500">
            <p className="text-gray-700 font-medium">Нет пациентов на выбранную дату</p>
            <p className="text-gray-500 text-sm mt-1">
              Нажмите <span className="text-gray-500">"Добавить пациента"</span> чтобы начать
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {patientsOnDate.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                researches={p.researches || []}
                formatBirthDate={formatBirthDate}
                copiedId={copiedId}
                focused={focusedPatientId === p.id}
                onClick={() => setFocusedPatientId(focusedPatientId === p.id ? null : p.id)}
                onCopy={(e) => handleCopy(e, p)}
                openModal={openModal}
                openEditModal={openEditModal}
                deletePatient={deletePatient}
                onDeleteResearch={handleDeleteResearch}
                onEditResearch={onEditResearch}
                onIssueResearch={handleIssueResearch}
                groupByDate={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
