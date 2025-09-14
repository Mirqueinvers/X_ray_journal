import React, { useEffect, useState } from "react";
import API_BASE from './api';

export default function Doz3research({ startDate, endDate }) {
  const headersTop = [
    "Органы / исследование",
    "Общее количество исследований",
    "Общее количество процедур",
  ];

  const headersVertical = [
    "Органы грудной клетки",
    "Верхние конечности",
    "Нижние конечности",
    "Шейный отдел позвоночника",
    "Грудной отдел позвоночника",
    "Поясничный отдел позвоночника",
    "Тазобедренные суставы",
    "Ребра и грудина",
    "Органы брюшной полости",
    "Череп, гол. мозг, ЧЛО",
    "Почки, мочевыводящая система",
    "Всего",
  ];

  const [data, setData] = useState({}); // { region: { researchCount, procCount } }

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`${API_BASE}/api/research?${params}`);
      const json = await res.json();

      const grouped = {};
      json.forEach(({ research_region, numb_of_proc }) => {
        if (!grouped[research_region]) {
          grouped[research_region] = { researchCount: 0, procCount: 0 };
        }
        grouped[research_region].researchCount += 1;
        grouped[research_region].procCount += Number(numb_of_proc) || 0;
      });

      setData(grouped);
    }

    fetchData();
  }, [startDate, endDate]);

  let totalResearch = 0;
  let totalProcedures = 0;
  Object.values(data).forEach(({ researchCount, procCount }) => {
    totalResearch += researchCount;
    totalProcedures += procCount;
  });

  return (
    <div className="overflow-x-auto p-4 mx-12">
      <div className="mb-3 font-semibold text-yellow-400">ДОЗ-3 (исследования)</div>
      <table className="min-w-full border border-yellow-500 text-sm text-yellow-200">
        <thead className="bg-gray-800 text-center text-yellow-300">
          <tr>
            {headersTop.map((header, idx) => (
              <th
                key={idx}
                className={`border border-yellow-500 p-2 ${idx === 0 ? "text-left" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headersVertical.map((label, idx) => {
            if (label === "Всего") {
              return (
                <tr key={idx} className="font-bold bg-gray-900 hover:bg-yellow-950 transition-colors">
                  <td className="border border-yellow-500 p-2">{label}</td>
                  <td className="border border-yellow-500 p-2 text-center">{totalResearch}</td>
                  <td className="border border-yellow-500 p-2 text-center">{totalProcedures}</td>
                </tr>
              );
            }

            const entry = data[label] || { researchCount: 0, procCount: 0 };

            return (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-yellow-950 transition-colors`}
              >
                <td className="border border-yellow-500 p-2">{label}</td>
                <td className="border border-yellow-500 p-2 text-center">{entry.researchCount}</td>
                <td className="border border-yellow-500 p-2 text-center">{entry.procCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
