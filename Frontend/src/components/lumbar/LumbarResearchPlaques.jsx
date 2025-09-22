// Frontend/src/components/lumbar/LumbarResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LumbarJointSpaceSection from "./JointSpaceSection";
import LumbarJointSurfaceSection from "./JointSurfaceSection";
import LumbarOsteophytesModal from "./OsteophytesModal";
import LumbarIntegritySection from "./IntegritySection";
import LumbarParaarticularTissuesSection from "./ParaarticularTissuesSection";
import SpineModal from "./SpineModal"; // ✅ модалка позвоночного столба
import SpineCurvatureModal from "./SpineCurvatureModal"; // ✅ модалка искривления позвоночника

export default function LumbarResearchPlaques({
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
  const [showSpineModal, setShowSpineModal] = useState(false);
  const [showCurvatureModal, setShowCurvatureModal] = useState(false); // ✅ стейт для модалки искривления

  const lumbarJointPlaques = [
    "Позвоночный столб",
    "Искривление позвоночника", // ✅ новая плашка
    "Суставные щели",
    "Суставные поверхности",
    "Остеофиты",
    "Целостность",
    "Параартикулярные ткани",
  ];

  return (
    <div className="mt-4 space-y-2">
      {lumbarJointPlaques.map((plaque, index) => {
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

        if (plaque === "Позвоночный столб") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpineModal(true);
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
                  setShowCurvatureModal(true); // ✅ открываем модалку искривления
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
                <LumbarParaarticularTissuesSection
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
              <LumbarJointSpaceSection
                textareaRef={textareaRef}
                selectedSubItem={selectedSubItem}
                setSelectedSubItem={setSelectedSubItem}
                selectedNarrowingLevel={selectedNarrowingLevel}
                setSelectedNarrowingLevel={setSelectedNarrowingLevel}
                setExpandedPlaque={setExpandedPlaque}
              />
            )}

            {isExpanded && plaque === "Суставные поверхности" && (
              <LumbarJointSurfaceSection
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

 {/* модалки */}
      {showOsteophytesModal && (
        <LumbarOsteophytesModal
          onClose={() => setShowOsteophytesModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {showSpineModal && (
        <SpineModal
          onClose={() => setShowSpineModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {showCurvatureModal && (
        <SpineCurvatureModal
          onClose={() => setShowCurvatureModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </div>
  );
}
