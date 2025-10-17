
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CalcaneusResearchPlaques({
  setOpenModal,
  textareaRef,
  insertTextToTextarea,
}) {

  const calcaneusPlaques = [
    "Остеофиты",
    "Норма",
  ];

  return (
    <div className="mt-4 space-y-2">
      {calcaneusPlaques.map((plaque, index) => {
        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(                    
                    [
                      "Остеофиты пяточных костей не выявлены.",
                      "Форма костей не изменена, структура однородная.",
                      "Костно-травматических и костно-деструктивных изменений не выявлено.",
                    ].join("\n"),
                    plaque
                  );
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Остеофиты") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("CalcaneusOsteophytesModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}