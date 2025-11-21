import React, { useEffect, useState } from "react";
import API_BASE from '../api';

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
      <div className="mb-3 font-semibold text-gray-800 text-lg">ДОЗ-3 (исследования)</div>
      <table className="min-w-full border border-gray-300 text-sm text-gray-800">
        <thead className="bg-gray-100 text-center text-gray-700">
          <tr>
            {headersTop.map((header, idx) => (
              <th
                key={idx}
                className={`border border-gray-300 p-2 ${idx === 0 ? "text-left" : ""}`}
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
                <tr key={idx} className="font-semibold bg-gray-200 hover:bg-gray-300 transition-colors">
                  <td className="border border-gray-300 p-2">{label}</td>
                  <td className="border border-gray-300 p-2 text-center">{totalResearch}</td>
                  <td className="border border-gray-300 p-2 text-center">{totalProcedures}</td>
                </tr>
              );
            }

            const entry = data[label] || { researchCount: 0, procCount: 0 };

            return (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
              >
                <td className="border border-gray-300 p-2">{label}</td>
                <td className="border border-gray-300 p-2 text-center">{entry.researchCount}</td>
                <td className="border border-gray-300 p-2 text-center">{entry.procCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
