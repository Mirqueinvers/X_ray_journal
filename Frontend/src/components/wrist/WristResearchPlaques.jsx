import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import WristCongruencySection from "../general/CongruencySection";
import WristIntegritySection from "../general/IntegritySection";
import WristParaarticularTissuesSection from "../general/ParaarticularTissuesSection";
import WristJoinSpaceModal from "./WristJoinSpaceModal";
import WristJointSurfaceModal from "./WristJointSurfaceModal";
import WristOsteophytesModal from "./WristOsteophytesModal";

export default function AnkleResearchPlaques({
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
  setIsWristJointSpaceModalOpen,
  setIsWristJointSurfaceModalOpen,
  setIsWristOsteophytesModalOpen,
  textareaRef,
}) {
  const ankleJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
  ];

  const insertNormalText = () => {
    if (!textareaRef?.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end);
    const normalText = `Суставные щели луче-запястных суставов сохранены, равномерные.
Суставные поверхности ровные, чёткие, без признаков деформации.
Конгруэнтность суставных поверхностей не нарушена.
Костно-травматических и костно-деструктивных изменений не выявлено.
Параартикулярные ткани не имеют рентгено-позитивных признаков изменений.`;
    textarea.value = textBefore + normalText + textAfter;
    const cursorPos = start + normalText.length;
    textarea.selectionStart = textarea.selectionEnd = cursorPos;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div className="mt-4 space-y-2">
      {ankleJointPlaques.map((plaque, index) => {
        if (plaque === "Суставные щели") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWristJointSpaceModalOpen(true);
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
                  setIsWristJointSurfaceModalOpen(true);
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
                  setIsWristOsteophytesModalOpen(true);
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
                <WristCongruencySection
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
                <WristIntegritySection
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
                <WristParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        return null;
      })}

      {/* Плашка "Норма" внизу с отступом */}
      <div className="h-20"></div>
      <div
        className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
        onClick={insertNormalText}
      >
        <span>Норма</span>
      </div>
    </div>
  );
}