import React from "react";
import { Radiation } from "lucide-react";

const Header = () => {
  return (
<header className="relative bg-gradient-to-r from-gray-500 via-black to-gray-500 text-yellow-300 py-4 px-6 mx-20 mb-10 rounded-lg flex items-center justify-center gap-3 overflow-hidden">
  <Radiation className="w-8 h-8 text-yellow-400 animate-pulse drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
  <h1 className="text-2xl font-bold drop-shadow-lg relative z-10 select-none">
    Журнал рентгенологических исследований
  </h1>

  {/* Нижний градиент */}
  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-500 to-transparent pointer-events-none"></div>
</header>

  );
};

export default Header;
