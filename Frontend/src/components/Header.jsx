import { Radiation } from "lucide-react";

const Header = () => {
  return (
    <header className="relative bg-gray-50 text-gray-900 py-4 px-6 mx-20 mb-10 rounded-lg flex items-center justify-center gap-3 overflow-hidden">
      <Radiation className="w-8 h-8 text-gray-900 animate-pulse" />
      <h1 className="text-2xl font-bold drop-shadow-sm relative z-10 select-none">
        Журнал рентгенологических исследований
      </h1>
    </header>
  );
};

export default Header;
