
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import NasalPassagesSection from "./NasalPassagesSection";
import NasalSeptumSection from "./NasalSeptumSection";

export default function ParanasalResearchPlaques({
  expandedPlaque,
  setExpandedPlaque,
  textareaRef,
  setOpenModal,
}) {
  const paranasalPlaques = [
    "Пазухи",
    "Носовые ходы",
    "Носовая перегородка",
  ];

  const insertNormalText = () => {
    if (!textareaRef?.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end);
    const normalText = `Лобные и гайморовы пазухи прозрачные, их контуры четкие ровные, слизистая не утолщена, пневматизация не изменена, патологических теней в проекции пазух не визуализируется.
Носовые ходы свободны.
Носовая перегородка не искривлена.`;
    textarea.value = textBefore + normalText + textAfter;
    const cursorPos = start + normalText.length;
    textarea.selectionStart = textarea.selectionEnd = cursorPos;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div className="mt-4 space-y-2">
      {paranasalPlaques.map((plaque, index) => {
        if (plaque === "Пазухи") {
          return (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              <div
                className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal("SinusesModal");
                }}
              >
                <span>{plaque}</span>
                <ChevronRightIcon className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          );
        }

        if (plaque === "Носовые ходы") {
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
                <NasalPassagesSection
                  textareaRef={textareaRef}
                  setExpandedPlaque={setExpandedPlaque}
                />
              )}
            </div>
          );
        }

        if (plaque === "Носовая перегородка") {
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
                <NasalSeptumSection
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