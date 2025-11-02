import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";  // импортируем русскую локаль
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

registerLocale("ru", ru); // регистрируем локаль

export default function VisitDatePicker({ visitDate, setVisitDate }) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!visitDate) {
      const today = new Date();
      setSelectedDate(today);
      setVisitDate(today.toISOString().split("T")[0]);
    } else {
      setSelectedDate(new Date(visitDate));
    }
  }, [visitDate, setVisitDate]);

  const handleChange = (date) => {
    setSelectedDate(date);
    setVisitDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="mb-6">
      <label className="mr-2 font-semibold text-black">Дата:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          className=" bg-gray-50 text-black text-3xl px-3 py-1 rounded w-full text-center"
          calendarClassName="bg-gray-900 text-yellow-200 border border-yellow-500 rounded shadow-lg"
          dayClassName={(date) =>
            date.toDateString() === selectedDate?.toDateString()
              ? "bg-yellow-500 text-gray-900 rounded-full"
              : "text-yellow-200"
          }
          popperClassName="z-[9999] pointer-events-auto"
          popperContainer={({ children }) => <div className="relative z-[9999]">{children}</div>} // ✅ Важно!
          dateFormat="dd.MM.yyyy"
          locale="ru"
        />
    </div>
  );
}
