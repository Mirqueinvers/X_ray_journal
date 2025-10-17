// Frontend/src/components/foot/FootResearchPlaques.jsx

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FootIntegritySection from "../general/IntegritySection";
import FootParaarticularTissuesSection from "../general/ParaarticularTissuesSection";


export default function FeetResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
  insertTextToTextarea,
}) {
  
  const feetJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
    "Норма",
  ];

  return (
    <div className="mt-4 space-y-2">
      {feetJointPlaques.map((plaque, index) => {

        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(                    
                    [
                      "Суставные щели мелких суставов стоп сохранены, равномерные.",
                      "Суставные поверхности ровные, чёткие, без признаков деформации.",
                      "Конгруэнтность суставных поверхностей не нарушена.",
                      "Костно-травматических и костно-деструктивных изменений не выявлено.",
                      "Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.",
                    ].join("\n"),
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
                  setOpenModal("FootOsteophytesModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Суставные щели") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("FootJointSpaceModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        if (plaque === "Суставные поверхности") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("FootJointSurfaceModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        if (plaque === "Конгруэнтность") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("FootCongruencyModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        if (plaque === "Целостность") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  if (expandedPlaque === plaque) {
                    setExpandedPlaque(null);
                  } else {
                    setExpandedPlaque(plaque);
                  }
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <FootIntegritySection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Параартикулярные ткани") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  if (expandedPlaque === plaque) {
                    setExpandedPlaque(null);
                  } else {
                    setExpandedPlaque(plaque);
                  }
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <FootParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }
      })}
    </div>
  );
}