import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import API_BASE from './api';

export default function ExpButton() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const Export = async () => {
    try {
      const response = await fetch(`${API_BASE}/export`);
      if (!response.ok) throw new Error("Ошибка при экспорте");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Ошибка при экспорте");
    }
  };

  const Import = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const response = await fetch(`${API_BASE}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!response.ok) throw new Error("Ошибка при импорте");
      alert("Импорт завершён успешно!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при импорте");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Import(file);
    e.target.value = ""; // очищаем input
  };

  // Закрытие меню при клике вне кнопки/меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={menuRef} className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="group p-2 border border-gray-500 rounded-full bg-transparent transition"
        >
          <Settings className="w-6 h-6 text-gray-700 group-hover:text-yellow-500 transition-colors" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-yellow-500 rounded shadow-lg overflow-hidden text-yellow-200">
            <button
              onClick={Export}
              className="block w-full text-left px-4 py-2 hover:bg-yellow-500 hover:text-gray-900 transition"
            >
              Экспорт
            </button>

            {/* Кнопка импорта */}
            <label
              className="block w-full text-left px-4 py-2 hover:bg-yellow-500 hover:text-gray-900 transition cursor-pointer"
            >
              Импорт
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </>
  );
}
