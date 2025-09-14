import React, { useState } from "react";
import Header from "./components/Header";
import Stat from "./components/Stat";
import Search from "./components/Search";
import AddPatient from "./components/Add_patient";
import ExpButton from "./components/ExpButton";


function App() {
  const [activeTab, setActiveTab] = useState("journal"); // по умолчанию журнал открыт

return (
  <div className="bg-gray-500 min-h-screen">
    <Header />
    <ExpButton />

    <div className="flex space-x-4 m-4 ml-20">
      <button
        className={`px-4 py-2 rounded-lg border font-bold transition-all duration-200 shadow-md
          ${
            activeTab === "journal"
              ? "bg-yellow-500 text-black border-yellow-400 shadow-yellow-500/50"
              : "bg-gray-500 text-yellow-300 border-yellow-500 hover:bg-gray-800"
          }`}
        onClick={() => setActiveTab("journal")}
      >
        Журнал
      </button>

      <button
        className={`px-4 py-2 rounded-lg border font-bold transition-all duration-200 shadow-md
          ${
            activeTab === "search"
              ? "bg-yellow-500 text-black border-yellow-400 shadow-yellow-500/50"
              : "bg-gray-500 text-yellow-300 border-yellow-500 hover:bg-gray-800"
          }`}
        onClick={() => setActiveTab("search")}
      >
        Поиск пациента
      </button>

      <button
        className={`px-4 py-2 rounded-lg border font-bold transition-all duration-200 shadow-md
          ${
            activeTab === "stat"
              ? "bg-yellow-500 text-black border-yellow-400 shadow-yellow-500/50"
              : "bg-gray-500 text-yellow-300 border-yellow-500 hover:bg-gray-800"
          }`}
        onClick={() => setActiveTab("stat")}
      >
        Статистика
      </button>
    </div>

    <div>
      {activeTab === "journal" && <AddPatient />}
      {activeTab === "search" && <Search />}
      {activeTab === "stat" && <Stat />}
    </div>
  </div>
);

}

export default App;




