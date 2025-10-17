
// Frontend/src/components/KneeResearchPlaques.jsx
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import BumpsSection from "./BumpsSection";
import CongruencySection from "../general/CongruencySection";
import IntegritySection from "../general/IntegritySection";
import ParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import EndoprosthesisSection from "./EndoprosthesisSection";

export default function KneeResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  selectedSubItem,
  setSelectedSubItem,
  selectedShapeLevel,
  setSelectedShapeLevel,
  textareaRef,
  setOpenModal,
  insertTextToTextarea,
}) {
  const kneeJointPlaques = [
    "Эндопротезирование",
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Бугорки",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
    "Норма",
  ];

  return (
    <div className="mt-4 space-y-2">
      {kneeJointPlaques.map((plaque, index) => {

        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(
                    
                    [
                      "",
                      "Суставные щели голеностопных суставов сохранены, равномерные.",
                      "Суставные поверхности ровные, чёткие, без признаков деформации.",
                      "Бугорки межмыщелковых возвышений не изменены.",
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
                  setOpenModal("OsteophytesModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Бугорки") {
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
                <BumpsSection
                  textareaRef={textareaRef}
                  selectedSubItem={selectedSubItem}
                  setSelectedSubItem={setSelectedSubItem}
                  selectedShapeLevel={selectedShapeLevel}
                  setSelectedShapeLevel={setSelectedShapeLevel}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
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
                <CongruencySection
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
                <IntegritySection
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
                <ParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Эндопротезирование") {
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
                {expandedPlaque === plaque ? (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <EndoprosthesisSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        // Для "Суставные щели" теперь используем модальное окно
        if (plaque === "Суставные щели") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("JointSpaceSection");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        // Для "Суставные поверхности" теперь используем модальное окно
        if (plaque === "Суставные поверхности") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("JointSurfaceModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

      })}
    </div>
  );
}