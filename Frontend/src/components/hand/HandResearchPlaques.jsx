// Frontend/src/components/hand/HandResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import HandJointSpaceSection from "./JointSpaceSection";
import HandJointSurfaceSection from "./JointSurfaceSection";
import HandOsteophytesModal from "./OsteophytesModal";
import HandCongruencySection from "./CongruencySection";
import HandIntegritySection from "./IntegritySection";
import HandParaarticularTissuesSection from "./ParaarticularTissuesSection";

export default function HandResearchPlaques({
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
  const handJointPlaques = [
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
      {handJointPlaques.map((plaque, index) => {
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
                <HandBumpsSection
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
                <HandCongruencySection
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
                <HandIntegritySection
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
                <HandParaarticularTissuesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

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

            {isExpanded && plaque === "Суставные щели" && (
              <HandJointSpaceSection
                textareaRef={textareaRef}
                selectedSubItem={selectedSubItem}
                setSelectedSubItem={setSelectedSubItem}
                selectedNarrowingLevel={selectedNarrowingLevel}
                setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Суставные поверхности" && (
              <HandJointSurfaceSection
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