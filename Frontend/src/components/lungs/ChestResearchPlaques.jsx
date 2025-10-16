
import { ChevronDownIcon } from "@heroicons/react/24/outline";


export default function ChestResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
}) {

  const chestPlaques = [
    "Ребра",
  ];

  return (
    <div className="mt-4 h-[500px] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
      {chestPlaques.map((plaque, index) => {
        if (plaque === "Ребра") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("RibsModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}