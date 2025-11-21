import { useState } from "react";
import Doz3doses from "./Doz3doses";
import Doz3research from "./Doz3research";
import Form30 from "./Form30";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReferralsChart from './ReferralsChart';
import ResearchRegionsChart from './ResearchRegionsChart';
import PatientsByMonthChart from './PatientsByMonthChart';

// Функция для корректного преобразования даты в строку YYYY-MM-DD
const formatDateToString = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Обработчик для начальной даты
  const handleStartDateChange = (date) => {
    setStartDate(formatDateToString(date));
  };

  // Обработчик для конечной даты
  const handleEndDateChange = (date) => {
    setEndDate(formatDateToString(date));
  };

  return (
<div className="p-4 space-y-4">
  {/* Панель выбора периода */}
  <div className="flex space-x-2 items-center justify-center">
  {/* Начальная дата */}
  <div className="inline-flex items-center">
    <label className="font-semibold text-gray-800 mr-1">Статистика за период с </label>
    <DatePicker
      selected={startDate ? new Date(startDate) : null}
      onChange={handleStartDateChange}
      className="border border-gray-400 bg-gray-50 text-gray-800 px-3 py-1 rounded text-center"
      calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
      dateFormat="dd.MM.yyyy"
      locale="ru"
      placeholderText="Выберите дату"
    />
  </div>

  {/* Конечная дата */}
  <div className="inline-flex items-center">
    <label className="font-semibold text-gray-800 mr-1">по </label>
    <DatePicker
      selected={endDate ? new Date(endDate) : null}
      onChange={handleEndDateChange}
      className="border border-gray-400 bg-gray-50 text-gray-800 px-3 py-1 rounded text-center"
      calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
      dateFormat="dd.MM.yyyy"
      locale="ru"
      placeholderText="Выберите дату"
    />
  </div>
</div>

  {/* Первый ряд: два графика */}
  <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-0">
      <ReferralsChart startDate={startDate} endDate={endDate} />
    </div>
    <div className="flex-1 min-w-0">
      <ResearchRegionsChart startDate={startDate} endDate={endDate} />
    </div>
  </div>

  {/* Второй ряд: новый компонент на полную ширину */}
  <div className="w-full">
    <PatientsByMonthChart startDate={startDate} endDate={endDate} />
  </div>

  <Doz3doses startDate={startDate} endDate={endDate} />
  <Doz3research startDate={startDate} endDate={endDate} />
  <Form30 startDate={startDate} endDate={endDate} />
</div>
  );
}