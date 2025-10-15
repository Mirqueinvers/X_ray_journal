
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FlatfootResearchPlaques({
  textareaRef,
  setOpenModal,
}) {
  const insertNormalText = () => {
    if (!textareaRef?.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end);
    const normalText = `Признаков плоскостопия не выявлено. Форма стоп нормальная, своды сохранены.`;
    textarea.value = textBefore + normalText + textAfter;
    const cursorPos = start + normalText.length;
    textarea.selectionStart = textarea.selectionEnd = cursorPos;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div className="mt-4 space-y-2">
      <div onClick={(e) => e.stopPropagation()}>
        <div
          className="w-full p-2 bg-gray-700 border border-yellow-500 rounded text-yellow-200 cursor-pointer hover:bg-gray-600 flex justify-between items-center"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal("FlatfootModal");
          }}
        >
          <span>Плоскостопие</span>
          <ChevronDownIcon className="h-4 w-4 text-yellow-400" />
        </div>
      </div>

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