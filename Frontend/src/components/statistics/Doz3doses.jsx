import React, { useEffect, useState } from "react";
import API_BASE from '../api';

export default function Doz3doses({ startDate, endDate }) {
  const headersTop = [
    "Органы / исследование",
    "Рентгенограммы (взрослые), мЗв",
    "Рентгенограммы (дети), мЗв",
    "Суммарная коллективная доза, чел.-мЗв",
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

  const [doseData, setDoseData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`${API_BASE}/api/research_doses?${params}`);
      const data = await res.json();
      setDoseData(data);
    }

    fetchData();
  }, [startDate, endDate]);

  let totalAdultDose = 0;
  let totalChildDose = 0;

  Object.values(doseData).forEach(({ adult = 0, child = 0 }) => {
    totalAdultDose += adult;
    totalChildDose += child;
  });

  const totalDose = totalAdultDose + totalChildDose;

  return (
    <div className="overflow-x-auto p-4 mx-12">
      <div className="mb-3 font-semibold text-gray-800 text-lg">ДОЗ-3 (дозы)</div>
      <table className="min-w-full border border-gray-300 text-sm text-gray-800">
        <thead className="bg-gray-100 text-center text-gray-700">
          <tr>
            {headersTop.map((header, index) => (
              <th
                key={index}
                className={`border border-gray-300 p-2 ${index === 0 ? "text-left" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headersVertical.map((label, rowIndex) => {
            let adultValue = "";
            let childValue = "";
            let totalValue = "";

            if (label === "Всего") {
              adultValue = totalAdultDose.toFixed(3);
              childValue = totalChildDose.toFixed(3);
              totalValue = totalDose.toFixed(3);
            } else if (doseData[label]) {
              adultValue = (doseData[label].adult ?? 0).toFixed(3);
              childValue = (doseData[label].child ?? 0).toFixed(3);
              totalValue = ((doseData[label].adult ?? 0) + (doseData[label].child ?? 0)).toFixed(3);
            }

            return (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-200 transition-colors`}
              >
                <td className="border border-gray-300 p-2">{label}</td>
                <td className="border border-gray-300 p-2 text-center">{adultValue}</td>
                <td className="border border-gray-300 p-2 text-center">{childValue}</td>
                <td className="border border-gray-300 p-2 text-center">{totalValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
