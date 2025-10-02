// Frontend/src/components/spine/CervicalResearchPlaques.jsx
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LumbarIntegritySection from "./IntegritySection";
import LumbarParaarticularTissuesSection from "./ParaarticularTissuesSection";
import SpineModal from "./SpineModal";
import SpineCurvatureModal from "./SpineCurvatureModal";
import LumbarLordosisSection from "./LordosisSection";
import IntervertebralDiscsModal from "./IntervertebralDiscsModal";
import EndplatesModal from "./EndplatesModal";
import OsteophytesModal from "./OsteophytesModal";
import InstabilityModal from "./InstabilityModal";

export default function CervicalResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
}) {
  const [showSpineModal, setShowSpineModal] = useState(false);
  const [showCurvatureModal, setShowCurvatureModal] = useState(false);
  const [showDiscsModal, setShowDiscsModal] = useState(false);
  const [showEndplatesModal, setShowEndplatesModal] = useState(false);
  const [showOsteophytesModal, setShowOsteophytesModal] = useState(false);
  const [showInstabilityModal, setShowInstabilityModal] = useState(false);

  const cervicalJointPlaques = [
    "Позвоночный столб",
    "Лордоз",
    "Межпозвонковые диски",
    "Замыкательные пластинки",
    "Остеофиты",
    "Нестабильность",
    "Целостность",
    "Параартикулярные ткани",
  ];

  return (
    <div className="mt-4 space-y-2">
      {cervicalJointPlaques.map((plaque, index) => {
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

        
        if (plaque === "Нестабильность") { // Обработка плашки Нестабильность
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInstabilityModal(true);
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

      {showOsteophytesModal && (
        <OsteophytesModal
          onClose={() => setShowOsteophytesModal(false)}
          textareaRef={textareaRef}
        />
      )}

      {/* Модалка Нестабильности */}
      {showInstabilityModal && (
        <InstabilityModal
          onClose={() => setShowInstabilityModal(false)}
          textareaRef={textareaRef}
        />
      )}
    </div>
  );
}