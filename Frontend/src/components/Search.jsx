import React, { useState } from "react";
import PatientResearchList from "./PatientResearchList";
import API_BASE from './api';

export default function Search() {
  const [fio, setFio] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [focusedPatientId, setFocusedPatientId] = useState(null);
  const [loadingResearches, setLoadingResearches] = useState(false);
  const [errorResearches, setErrorResearches] = useState(null);

  const [researchesByPatientId, setResearchesByPatientId] = useState({});

  // 🔍 Получение пациентов
  const fetchPatients = async (searchFio) => {
    if (!searchFio.trim()) {
      setPatients([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/patients`);
      if (!response.ok) throw new Error("Ошибка при загрузке пациентов");

      const data = await response.json();

      // теперь фильтруем только по ФИО, дубликатов уже не будет
      const filtered = data.filter((p) =>
        p.full_name.toLowerCase().includes(searchFio.toLowerCase())
      );

      setPatients(filtered);
    } catch (err) {
      setError(err.message);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Получение исследований пациента
  const fetchResearches = async (patientId) => {
    setLoadingResearches(true);
    setErrorResearches(null);

    try {
      const response = await fetch(
        `${API_BASE}/api/patient/${patientId}/researches`
      );
      if (!response.ok) throw new Error("Ошибка при загрузке исследований");

      const data = await response.json();

      setResearchesByPatientId((prev) => ({ ...prev, [patientId]: data }));
    } catch (err) {
      setErrorResearches(err.message);
      setResearchesByPatientId((prev) => ({ ...prev, [patientId]: [] }));
    } finally {
      setLoadingResearches(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFio(value);
    fetchPatients(value);
    setFocusedPatientId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPatients(fio);
  };

  const handlePatientClick = (patientId) => {
    if (focusedPatientId === patientId) {
      setFocusedPatientId(null);
    } else {
      setFocusedPatientId(patientId);
      if (!researchesByPatientId[patientId]) {
        fetchResearches(patientId);
      }
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center pt-10 px-4">
        <form onSubmit={handleSubmit} className="ml-20 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Введите ФИО"
            value={fio}
            onChange={handleInputChange}
            className="border border-yellow-500 bg-gray-800 text-yellow-200 placeholder-yellow-300/60 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg border border-yellow-400 shadow-md hover:bg-yellow-400 hover:shadow-yellow-500/40 transition-all"
          >
            Поиск
          </button>
        </form>
      </div>

      <div id="search_result" className="mt-4 mb-10 mx-20 space-y-2">
        {loading && <div className="text-yellow-300">Загрузка...</div>}
        {error && <div className="text-red-400">Ошибка: {error}</div>}

        {!loading && !error && patients.length === 0 && fio.trim() !== "" && (
          <div className="text-yellow-300">Пациенты не найдены</div>
        )}

        {!loading &&
          !error &&
          patients.map((p, index) => (
            <div
              key={p.id}
              className="relative border border-yellow-500 rounded-md px-4 py-2 bg-gray-700 shadow-sm"
            >
             <div
                className="cursor-pointer hover:shadow-yellow-500/30 focus:outline-none"
                onClick={() => handlePatientClick(p.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePatientClick(p.id);
                  }
                }}
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-2 text-base font-semibold text-yellow-300">
                      <span>{index + 1}.</span>
                      <span>{p.full_name}</span>
                    </div>
                    <div className="text-sm text-yellow-200">
                      Дата рождения: {formatDate(p.birth_date)}
                    </div>
                    <div className="text-sm text-gray-300">
                      Адрес: {p.adress}
                    </div>
                  </div>
                </div>
              </div>

              {focusedPatientId === p.id && (
                <div className="mt-2 pl-4 border-t border-yellow-500 pt-2">
                  {loadingResearches && (
                    <div className="text-yellow-300">
                      Загрузка исследований...
                    </div>
                  )}
                  {errorResearches && (
                    <div className="text-red-400">
                      Ошибка: {errorResearches}
                    </div>
                  )}
                  {!loadingResearches &&
                    !errorResearches &&
                    researchesByPatientId[p.id] && (
                      <div className="space-y-3">
                        {Object.entries(
                          researchesByPatientId[p.id].reduce((acc, r) => {
                            const date = formatDate(r.visit_date); // ✅ заменил на visit_date
                            if (!acc[date]) acc[date] = [];
                            acc[date].push(r);
                            return acc;
                          }, {})
                        ).map(([date, researches]) => (
                          <div
                            key={date}
                            className="border border-yellow-400 rounded-md p-2"
                          >
                            <div className="text-yellow-300 font-semibold mb-1">
                              {date}
                            </div>
                            <PatientResearchList researches={researches} showIcons={false} />

                          </div>
                        ))}

                      </div>
                    )}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
