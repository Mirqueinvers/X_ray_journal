// Frontend/src/components/lumbar/LumbarResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LumbarIntegritySection from "./IntegritySection";
import LumbarParaarticularTissuesSection from "./ParaarticularTissuesSection";
import SpineModal from "./SpineModal";
import SpineCurvatureModal from "./SpineCurvatureModal";
import LumbarLordosisSection from "./LumbarLordosisSection";
import IntervertebralDiscsModal from "./IntervertebralDiscsModal";
import EndplatesModal from "./EndplatesModal";
import OsteophytesModal from "./OsteophytesModal"; // ✅ импорт модалки остеофитов

export default function LumbarResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
}) {
  const [showSpineModal, setShowSpineModal] = useState(false);
  const [showCurvatureModal, setShowCurvatureModal] = useState(false);
  const [showDiscsModal, setShowDiscsModal] = useState(false);
  const [showEndplatesModal, setShowEndplatesModal] = useState(false);
  const [showOsteophytesModal, setShowOsteophytesModal] = useState(false); // ✅ стейт для остеофитов

  const lumbarJointPlaques = [
    "Позвоночный столб",
    "Искривление позвоночника",
    "Лордоз",
    "Межпозвонковые диски",
    "Замыкательные пластинки",
    "Остеофиты", // ✅ новая плашка
    "Целостность",
    "Параартикулярные ткани",
  ];

  return (
    <div className="mt-4 space-y-2">
      {lumbarJointPlaques.map((plaque, index) => {
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
                  setShowCurvatureModal(true);
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
                  setShowDiscsModal(true);
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
                  setShowEndplatesModal(true);
                }}
              >
                <span>{plaque}</span>
              </div>
            </div>
          );
        }

        if (plaque === "Остеофиты") { // ✅ обработка остеофитов
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

        if (plaque === "Лордоз") {
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
                <LumbarLordosisSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        return null;
      })}

      {/* модалки */}
      {showSpineModal && (
        <SpineModal onClose={() => setShowSpineModal(false)} textareaRef={textareaRef} />
      )}

      {showCurvatureModal && (
        <SpineCurvatureModal
          onClose={() => setShowCurvatureModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {showDiscsModal && (
        <IntervertebralDiscsModal
          onClose={() => setShowDiscsModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {showEndplatesModal && (
        <EndplatesModal
          onClose={() => setShowEndplatesModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {showOsteophytesModal && ( // ✅ рендер модалки остеофитов
        <OsteophytesModal
          onClose={() => setShowOsteophytesModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </div>
  );
}
