import React, { useState } from "react";
import Header from "./components/Header";
import Stat from "./components/statistics/Stat";
import Search from "./components/Search";
import AddPatient from "./components/Add_patient";
import ExpButton from "./components/ExpButton";

function App() {
  const [activeTab, setActiveTab] = useState("journal"); // по умолчанию — Пациенты

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <ExpButton />

      {/* Навигационные вкладки */}
      <div className="flex justify-start mt-6 ml-20">
        <div className="inline-flex items-center rounded-full bg-gray-100 p-1 border border-gray-300 shadow-sm">
          <button
            onClick={() => setActiveTab("journal")}
            className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200
              ${
                activeTab === "journal"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Пациенты
          </button>

          <button
            onClick={() => setActiveTab("stat")}
            className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200
              ${
                activeTab === "stat"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Статистика
          </button>

          <button
            onClick={() => setActiveTab("search")}
            className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200
              ${
                activeTab === "search"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Поиск
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="mt-6">
        {activeTab === "journal" && <AddPatient />}
        {activeTab === "stat" && <Stat />}
        {activeTab === "search" && <Search />}
      </div>
    </div>
  );
}

export default App;
