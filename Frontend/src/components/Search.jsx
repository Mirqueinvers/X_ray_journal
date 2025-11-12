import React, { useState } from "react";
import PatientCard from "./PatientCard";
import API_BASE from "./api";

export default function Search() {
  const [fio, setFio] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [focusedPatientId, setFocusedPatientId] = useState(null);
  const [researchesByPatientId, setResearchesByPatientId] = useState({});

  const fetchPatients = async (searchFio) => {
    if (!searchFio.trim()) {
      setPatients([]);
      setResearchesByPatientId({});
      setSearched(false);
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true);
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

  // Функция форматирования даты исследования
  const formatResearchDate = (dateString) => {
    if (!dateString) return "Без даты";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Функция группировки исследований по дате
  const groupResearchesByDate = (researches) => {
    const grouped = {};
    (researches || []).forEach((r) => {
      // Используем visit_date или research_date или date
      const dateField = r.visit_date || r.research_date || r.date;
      const date = formatResearchDate(dateField);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(r);
    });
    return grouped;
  };

  return (
    <div className="mb-8 w-full">
      {/* Белая подложка под весь блок (как в DayResult) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mx-4 lg:mx-[5%]">
        {/* 🔍 Блок поиска */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="text"
              placeholder="Введите ФИО"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              className="w-full border border-blue-300 bg-blue-50 text-gray-800 placeholder-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => fetchPatients(fio)}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-400 transition-all"
            >
              Поиск
            </button>
          </div>
        </div>

        {loading && <div className="text-blue-500 text-center">Загрузка...</div>}
        {error && <div className="text-red-500 text-center">Ошибка: {error}</div>}

        {/* 📋 Результаты поиска */}
        {!loading && !error && (
          <>
            {patients.length === 0 && searched && fio.trim() !== "" ? (
              <div className="text-blue-600 text-center py-6">
                Пациенты не найдены
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {patients.map((p) => {
                  const researches = researchesByPatientId[p.id] || [];
                  const groupedResearches = groupResearchesByDate(researches);
                  
                  return (
                    <PatientCard
                      key={p.id}
                      patient={p}
                      researches={researches}
                      researchesByDate={groupedResearches}
                      formatBirthDate={formatBirthDate}
                      focused={focusedPatientId === p.id}
                      onClick={() => handlePatientClick(p.id)}
                      showActions={false}
                      groupByDate={true}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
