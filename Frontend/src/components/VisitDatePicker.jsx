import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

export default function VisitDatePicker({ visitDate, setVisitDate, patientsOnDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [stats, setStats] = useState({ patients: 0, researches: 0 });

  useEffect(() => {
    if (!visitDate) {
      const today = new Date();
      setSelectedDate(today);
      setVisitDate(today.toISOString().split("T")[0]);
    } else {
      setSelectedDate(new Date(visitDate));
    }
  }, [visitDate, setVisitDate]);

  // 🔁 Автоматическое обновление статистики при изменении patientsOnDate
  useEffect(() => {
    if (!patientsOnDate) return;
    const patientsCount = patientsOnDate.length;
    const researchCount = patientsOnDate.reduce(
      (sum, p) => sum + (p.researches?.length || 0),
      0
    );
    setStats({ patients: patientsCount, researches: researchCount });
  }, [patientsOnDate]);

  const handleChange = (date) => {
    setSelectedDate(date);
    setVisitDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl py-4 mb-6 flex items-center justify-between px-6">
      {/* Левая часть — статистика */}
      <div className="text-gray-700 text-lg font-medium flex flex-col text-left">
        <span>Пациентов: {stats.patients}</span>
        <span>Исследований: {stats.researches}</span>
      </div>

      {/* Центр — календарь */}
      <div className="flex-1 flex justify-center">
        <div className="w-64">
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            className="bg-gray-50 text-black text-3xl px-3 py-1 rounded w-full text-center shadow-sm border border-gray-300 cursor-pointer"
            calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
            dayClassName={(date) =>
              date.toDateString() === selectedDate?.toDateString()
                ? "bg-yellow-500 text-gray-900 rounded-full"
                : "text-yellow-200"
            }
            popperClassName="z-[9999] pointer-events-auto"
            popperContainer={({ children }) => (
              <div className="relative z-[9999]">{children}</div>
            )}
            dateFormat="dd.MM.yyyy"
            locale="ru"
          />
        </div>
      </div>

      {/* Пустое место справа для симметрии */}
      <div className="w-32" />
    </div>
  );
}
