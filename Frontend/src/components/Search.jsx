import React, { useState } from "react";
import PatientCard from "./PatientCard";
import API_BASE from "./api";

export default function Search() {
  const [fio, setFio] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedPatientId, setFocusedPatientId] = useState(null);
  const [researchesByPatientId, setResearchesByPatientId] = useState({});

  const fetchPatients = async (searchFio) => {
    if (!searchFio.trim()) {
      setPatients([]);
      setResearchesByPatientId({});
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/patients`);
      const data = await res.json();

      const filtered = data.filter((p) =>
        p.full_name.toLowerCase().includes(searchFio.toLowerCase())
      );
      setPatients(filtered);

      // сразу загружаем исследования
      const researchesData = {};
      await Promise.all(
        filtered.map(async (p) => {
          try {
            const resR = await fetch(`${API_BASE}/api/patient/${p.id}/researches`);
            const rData = await resR.json();
            researchesData[p.id] = rData;
          } catch {
            researchesData[p.id] = [];
          }
        })
      );
      setResearchesByPatientId(researchesData);
    } catch (err) {
      setError(err.message);
      setPatients([]);
      setResearchesByPatientId({});
    } finally {
      setLoading(false);
    }
  };

  const handlePatientClick = (patientId) => {
    setFocusedPatientId(focusedPatientId === patientId ? null : patientId);
  };

  function formatBirthDate(dateString) {
    if (!dateString) return "";
    const [y, m, d] = dateString.split("-");
    return `${d}.${m}.${y}`;
  }

  return (
    <div className="mb-8 w-full">
      {/* Белая подложка под весь блок (как в DayResult) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mx-4 lg:mx-[5%]">
        {/* 🔍 Блок поиска */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Введите ФИО"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
            className="flex-1 border border-blue-300 bg-blue-50 text-gray-800 placeholder-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => fetchPatients(fio)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-400 transition-all"
          >
            Поиск
          </button>
        </div>

        {loading && <div className="text-blue-500 text-center">Загрузка...</div>}
        {error && <div className="text-red-500 text-center">Ошибка: {error}</div>}

        {/* 📋 Результаты поиска */}
        {!loading && !error && (
          <>
            {patients.length === 0 && fio.trim() !== "" ? (
              <div className="text-blue-600 text-center py-6">
                Пациенты не найдены
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {patients.map((p) => (
                  <PatientCard
                    key={p.id}
                    patient={p}
                    researches={researchesByPatientId[p.id] || []}
                    formatBirthDate={formatBirthDate}
                    focused={focusedPatientId === p.id}
                    onClick={() => handlePatientClick(p.id)}
                    showActions={false}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
