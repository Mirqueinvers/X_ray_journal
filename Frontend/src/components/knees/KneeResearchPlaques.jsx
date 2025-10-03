// Frontend/src/components/KneeResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import JointSpaceSection from "./JointSpaceModal"; // Это теперь наше модальное окно
import JointSurfaceSection from "./JointSurfaceSection";
import OsteophytesModal from "./OsteophytesModal";
import BumpsSection from "./BumpsSection";
import CongruencySection from "./CongruencySection";
import IntegritySection from "./IntegritySection";
import ParaarticularTissuesSection from "./ParaarticularTissuesSection";

export default function KneeResearchPlaques({
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
  setIsJointSpaceModalOpen, // Добавляем пропс для управления модальным окном
}) {
  const kneeJointPlaques = [
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Бугорки",
    "Конгруэнтность",
    "Целостность",
    "Параартикулярные ткани",
  ];

  return (
    <div className="mt-4 space-y-2">
      {kneeJointPlaques.map((plaque, index) => {
        if (plaque === "Остеофиты") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOsteophytesModal(true);
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

        // Для "Суставные щели" теперь используем модальное окно
        if (plaque === "Суставные щели") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsJointSpaceModalOpen(true);
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        // Остальные пункты (в данном случае "Суставные поверхности") оставляем без изменений
        const isExpanded = expandedPlaque === plaque;
        return (
          <div key={index} onClick={(e) => e.stopPropagation()}>
            <div
              className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer flex justify-between items-center"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedPlaque(isExpanded ? null : plaque);
              }}
            >
              <span>{plaque}</span>
              {isExpanded ? (
                <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              )}
            </div>

            {isExpanded && plaque === "Суставные поверхности" && (
              <JointSurfaceSection
                textareaRef={textareaRef}
                selectedSubItem={selectedSubItem}
                setSelectedSubItem={setSelectedSubItem}
                selectedChangeLevel={selectedChangeLevel}
                setSelectedChangeLevel={setSelectedChangeLevel}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}