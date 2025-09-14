import { useState } from "react";
import Doz3doses from "./Doz3doses";
import Doz3research from "./Doz3research";
import Form30 from "./Form30";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
<div className="p-4 space-y-4">
  {/* Панель выбора периода */}
  <div className="flex space-x-2 items-center justify-center">
  {/* Начальная дата */}
  <div className="inline-flex items-center">
    <label className="font-semibold text-yellow-200 mr-1">Статистика за период с </label>
    <DatePicker
      selected={startDate ? new Date(startDate) : null}
      onChange={(date) => setStartDate(date ? date.toISOString().split("T")[0] : "")}
      className="border border-yellow-500 bg-gray-800 text-yellow-200 px-3 py-1 rounded text-center"
      calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
      dateFormat="dd.MM.yyyy"
      locale="ru"
      placeholderText="Выберите дату"
    />
  </div>

  {/* Конечная дата */}
  <div className="inline-flex items-center">
    <label className="font-semibold text-yellow-200 mr-1">по </label>
    <DatePicker
      selected={endDate ? new Date(endDate) : null}
      onChange={(date) => setEndDate(date ? date.toISOString().split("T")[0] : "")}
      className="border border-yellow-500 bg-gray-800 text-yellow-200 px-3 py-1 rounded text-center"
      calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
      dateFormat="dd.MM.yyyy"
      locale="ru"
      placeholderText="Выберите дату"
    />
  </div>
</div>


  {/* Передаем даты в компоненты для фильтрации */}
  <Doz3doses startDate={startDate} endDate={endDate} />
  <Doz3research startDate={startDate} endDate={endDate} />
  <Form30 startDate={startDate} endDate={endDate} />
</div>



  );
}
