import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from '../api';

export default function Form30({ startDate, endDate }) {
  const headersTop = [
    "Органы / исследование",
    "Общее количество исследований",
    "Общее количество процедур",
    "Амбулаторно",
    "Стационар дневной",
    "Стационар круглосуточный",
  ];

  const headersVertical = [
    "Органы грудной клетки",
    "Костно-мышечная система",
    "Конечности",
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

  const boneMuscleParts = [
    "Верхние конечности",
    "Нижние конечности",
    "Шейный отдел позвоночника",
    "Грудной отдел позвоночника",
    "Поясничный отдел позвоночника",
    "Тазобедренные суставы",
  ];

  const limbsParts = ["Верхние конечности", "Нижние конечности"];

  const [data, setData] = useState({});
  const [summary, setSummary] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res1 = await axios.get(`${API_BASE}/api/research`, {
          params: { startDate, endDate },
        });
        const json1 = res1.data;

        const grouped = {};
        json1.forEach(({ research_region, numb_of_proc }) => {
          if (!grouped[research_region]) {
            grouped[research_region] = { researchCount: 0, procCount: 0 };
          }
          grouped[research_region].researchCount += 1;
          grouped[research_region].procCount += Number(numb_of_proc) || 0;
        });
        setData(grouped);

        const res2 = await axios.get(`${API_BASE}/research-summary`, {
          params: { startDate, endDate },
        });
        setSummary(res2.data || {});
      } catch (err) {
        console.error("Ошибка получения данных:", err);
      }
    }

    fetchData();
  }, [startDate, endDate]);

  const sumOldCategory = (parts) =>
    parts.reduce(
      (acc, part) => {
        const entry = data[part] || { researchCount: 0, procCount: 0 };
        acc.researchCount += entry.researchCount;
        acc.procCount += entry.procCount;
        return acc;
      },
      { researchCount: 0, procCount: 0 }
    );

  const boneMuscleOld = sumOldCategory(boneMuscleParts);
  const limbsOld = sumOldCategory(limbsParts);

  let totalResearch = 0;
  let totalProcedures = 0;
  Object.entries(data).forEach(([region, { researchCount, procCount }]) => {
    if (region === "Костно-мышечная система" || region === "Конечности") return;
    totalResearch += researchCount;
    totalProcedures += procCount;
  });

  const sumNewCategory = (parts) => {
    const sum = {
      "Амбулаторно": { researchCount: 0 },
      "Стационар дневной": { researchCount: 0 },
      "Стационар круглосуточный": { researchCount: 0 },
    };
    parts.forEach((part) => {
      const row = summary[part] || {
        "Амбулаторно": { researchCount: 0 },
        "Стационар дневной": { researchCount: 0 },
        "Стационар круглосуточный": { researchCount: 0 },
      };
      Object.keys(sum).forEach((cat) => {
        sum[cat].researchCount += row[cat]?.researchCount || 0;
      });
    });
    return sum;
  };

  const boneMuscleNew = sumNewCategory(boneMuscleParts);
  const limbsNew = sumNewCategory(limbsParts);

  const totalNew = sumNewCategory(
    headersVertical.filter(
      (r) => r !== "Всего" && r !== "Костно-мышечная система" && r !== "Конечности"
    )
  );

  const getNewRow = (region) => {
    if (region === "Костно-мышечная система") return boneMuscleNew;
    if (region === "Конечности") return limbsNew;
    if (region === "Всего") return totalNew;
    return summary[region] || {
      "Амбулаторно": { researchCount: 0 },
      "Стационар дневной": { researchCount: 0 },
      "Стационар круглосуточный": { researchCount: 0 },
    };
  };

  return (
    <div className="overflow-x-auto p-4 mx-12">
      <div className="mb-3 font-semibold text-gray-800 text-lg">Форма 30</div>
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
            if (["Верхние конечности", "Нижние конечности"].includes(label)) return null;

            const isTotal = label === "Всего";

            const oldRow =
              label === "Костно-мышечная система"
                ? boneMuscleOld
                : label === "Конечности"
                ? limbsOld
                : label === "Всего"
                ? { researchCount: totalResearch, procCount: totalProcedures }
                : data[label] || { researchCount: 0, procCount: 0 };

            const newRow = getNewRow(label);

            return (
              <tr
                key={idx}
                className={`${
                  isTotal
                    ? "font-semibold bg-gray-200"
                    : idx % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="border border-gray-300 p-2">{label}</td>
                <td className="border border-gray-300 p-2 text-center">{oldRow.researchCount}</td>
                <td className="border border-gray-300 p-2 text-center">{oldRow.procCount}</td>
                <td className="border border-gray-300 p-2 text-center">{newRow["Амбулаторно"]?.researchCount || 0}</td>
                <td className="border border-gray-300 p-2 text-center">{newRow["Стационар дневной"]?.researchCount || 0}</td>
                <td className="border border-gray-300 p-2 text-center">{newRow["Стационар круглосуточный"]?.researchCount || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
