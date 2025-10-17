
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ElbowCongruencySection from "../general/CongruencySection";
import ElbowIntegritySection from "../general/IntegritySection";
import ElbowParaarticularTissuesSection from "../general/ParaarticularTissuesSection";

export default function ElbowResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
  insertTextToTextarea,
}) {

  const elbowJointPlaques = [
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
      {elbowJointPlaques.map((plaque, index) => {

        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(                    
                    [
                      "Суставные щели локтевых суставов сохранены, равномерные.",
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

        if (plaque === "Суставные щели") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("ElbowJoinSpaceModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
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
                  setOpenModal("ElbowJointSurfaceModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
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
                  setOpenModal("ElbowOsteophytesModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
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
                <ElbowCongruencySection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
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
                <ElbowIntegritySection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Параартикулярные ткани") {
          return (
            <div key="index" onClick={(e) => e.stopPropagation()}>
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
                <ElbowParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}