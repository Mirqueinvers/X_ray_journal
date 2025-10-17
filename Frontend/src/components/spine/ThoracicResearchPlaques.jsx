// Frontend/src/components/spine/ThoracicResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LumbarIntegritySection from "../general/IntegritySection";
import LumbarParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import ThoracicKyphosisSection from "./KyphosisSection";

export default function ThoracicResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
  insertTextToTextarea,
}) {

  const thoracicJointPlaques = [
    "Позвоночный столб",
    "Искривление позвоночника",
    "Кифоз",
    "Межпозвонковые диски",
    "Замыкательные пластинки",
    "Остеофиты",
    "Нестабильность",
    "Целостность",
    "Параартикулярные ткани",
    "Норма",
  ];

  return (
    <div className="mt-4 space-y-2">
      {thoracicJointPlaques.map((plaque, index) => {

        if (plaque === "Норма") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  insertTextToTextarea(                    
                    [
                      "Высота пространств межпозвонковых дисков не изменена.",
                      "Замыкательные пластинки ровные, чёткие, склеротических и деструктивных изменений не выявлено.",
                      "Соотношение задних отделов тел позвонков не изменено.",
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

        if (plaque === "Позвоночный столб") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SpineModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Искривление позвоночника") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SpineCurvatureModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Межпозвонковые диски") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SpineIntervertebralDiscsModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Замыкательные пластинки") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SpineEndplatesModal");
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
                  setOpenModal("SpineOsteophytesModal");
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        
        if (plaque === "Нестабильность") { // Обработка плашки Нестабильность
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SpineInstabilityModal");
                }}
              >
                <span>{plaque}</span>
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
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <LumbarIntegritySection
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
                  setExpandedPlaque(expandedPlaque === plaque ? null : plaque);
                }}
              >
                <span>{plaque}</span>
                {expandedPlaque === plaque && (
                  <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
                )}
              </div>

              {expandedPlaque === plaque && (
                <LumbarParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Кифоз") {
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
                <ThoracicKyphosisSection
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