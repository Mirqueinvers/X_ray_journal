// Frontend/src/components/lungs/LungResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LungPatternModal from "./LungPatternModal";
import VesselsSection from "./VesselsSection";
import HilaSection from "./HilaSection";
import SinusSection from "./SinusSection";
import PleuraSection from "./PleuraSection";
import MediastinumSection from "./MediastinumSection";
import HeartSection from "./HeartSection";
import ChestCageSection from "./ChestCageSection";

export default function LungResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  selectedSubItem,
  setSelectedSubItem,
  selectedNarrowingLevel,
  setSelectedNarrowingLevel,
  selectedChangeLevel,
  setSelectedChangeLevel,
  selectedShapeLevel,
  setSelectedShapeLevel,
  showOsteophytesModal,
  setShowOsteophytesModal,
  textareaRef,
}) {
  const [showPatternModal, setShowPatternModal] = useState(false); // состояние модалки патологических теней
  const [showRibsModal, setShowRibsModal] = useState(false); // состояние модалки для ребер
  const lungJointPlaques = [
    "Норма",
    "Без патологических теней",
    "Патологические тени",
    "Сосудистый рисунок",
    "Корни легких",
    "Синусы",
    "Плевра",
    "Средостение",
    "Сердце",
    "Грудная клетка",
  ];

  const insertTextToTextarea = (text, plaque) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      const needsNewLine = !(plaque === "Норма" || plaque === "Без патологических теней");

      textareaRef.current.value = current
        ? current + (needsNewLine ? "\n" : "") + text
        : text;
    }
  };

  const handleOsteophytesClick = (e) => {
    e.stopPropagation();
    setShowOsteophytesModal(true);
  };

  return (
    <div className="mt-4 h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
      {lungJointPlaques.map((plaque, index) => {
        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(
                    [
                      "Легкие без инфильтративных и очаговых теней.",
                      "Сосудистый рисунок не изменен.",
                      "Корни легких не расширены, структурны.",
                      "Синусы плевры свободны.",
                      "Диафрагма куполообразной формы, расположена обычно.",
                      "Тень средостения не расширена.",
                      "Сердце в пределах возрастной нормы.",
                      "Целостность костей грудной клетки не нарушена."
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


        if (plaque === "Без патологических теней") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(
                    "Легочная ткань без инфильтративных и очаговых теней.",
                    plaque
                  );
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Патологические тени") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPatternModal(true); // открываем модалку
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Сосудистый рисунок") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <VesselsSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }
       
        if (plaque === "Корни легких") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <HilaSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Синусы") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <SinusSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Плевра") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <PleuraSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Средостение") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <MediastinumSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Сердце") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <HeartSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Грудная клетка") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <ChestCageSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        return null;
      })}

      {/* Модалка для патологических теней */}
      {showPatternModal && (
        <LungPatternModal
          onClose={() => setShowPatternModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {/* Модалка для ребер */}
      {showRibsModal && (
        <RibsModal
          onClose={() => setShowRibsModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </div>
  );
}