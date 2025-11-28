// Frontend/src/components/ResearchTypeModal.jsx
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import BaseModal from "./common/BaseModal";
import researchData from "./ResearchData";

export default function ResearchTypeModal({ 
  isOpen, 
  onClose, 
  onResearchSelect, 
  onInsertText 
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Определяем, открыта ли модалка
  const modalIsOpen = isOpen !== undefined ? isOpen : true;

  // Если модалка не должна быть открыта, не рендерим ничего
  if (!modalIsOpen) return null;

  const researchCategories = researchData.researchCategories;

  const toggleItem = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // НОВОЕ: обработчик для "Общее"
  const handleGeneralClick = () => {
    if (onInsertText) {
      onInsertText("", "Общее");
    }
    if (onClose) {
      onClose();
    }
  };

  // НОВОЕ: обработчик для "Костный возраст"
  const handleBoneAgeClick = () => {
    if (onInsertText) {
      onInsertText("Рентгенография кистей в прямой проекции с захватом луче-запястных суставов\n", "Костный возраст");
    }
    if (onClose) {
      onClose();
    }
  };

  const handleResearchClick = (researchName, projection) => {
    const fullResearch = researchCategories?.[1]?.items?.find(item => item.name === researchName);

    let textToInsert = "";
    let selectedResearchName = researchName;

    if (projection) {
      if (researchName === "Рентгенография стоп" && projection === "плоскостопие") {
        selectedResearchName = "Рентгенография стоп (плоскостопие)";
      }

      if (researchName === "Рентгенография грудной клетки") {
        if (projection === "правой половины" || projection === "левой половины") {
          textToInsert = `Рентгенография ${projection} грудной клетки в прямой проекции.\n`;
        } else {
          textToInsert = `${researchName} ${projection}\n`;
        }
      } else {
        const cleanName = researchName.replace(/\s*\(плоскостопие\)/i, "");
        textToInsert = `${cleanName} ${projection}\n`;
      }
    } else if (fullResearch) {
      const cleanName = fullResearch.name.replace(/\s*\(плоскостопие\)/i, "");
      textToInsert = `${cleanName}\n`;
    }

    if (textToInsert && onInsertText) {
      onInsertText(textToInsert, selectedResearchName);
    }
    if (onClose) {
      onClose();
    }
  };

  const modalContent = (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск исследования..."
          className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-800
                    focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-gray-300 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Две колонки */}
      <div className="grid grid-cols-2 gap-4 items-start">
        {/* НОВАЯ ПЛАШКА "Общее" */}
        <div className="relative self-start">
          <div
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            onClick={handleGeneralClick}
          >
            <div className="flex justify-between items-center p-3">
              <span className="text-sm text-gray-800">Общее</span>
            </div>
          </div>
        </div>

        {/* НОВАЯ ПЛАШКА "Костный возраст" */}
        <div className="relative self-start">
          <div
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            onClick={handleBoneAgeClick}
          >
            <div className="flex justify-between items-center p-3">
              <span className="text-sm text-gray-800">Костный возраст</span>
            </div>
          </div>
        </div>

        {/* Список исследований */}
        {researchCategories?.[1]?.items
          ?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item, index) => {
            const isExpanded = expandedItems[item.name] || false;

            return (
              <div key={index} className="relative self-start">
                <div
                  className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => {
                    if (item.subItems?.length > 0) {
                      toggleItem(item.name);
                    } else {
                      handleResearchClick(item.name);
                    }
                  }}
                >
                  <div className="flex justify-between items-center p-3">
                    <span className="text-sm text-gray-800">{item.name}</span>
                    {item.subItems?.length > 0 && (
                      isExpanded ? 
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        :
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && item.subItems && (
                  <div className="mt-1 ml-2 space-y-1 z-10">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="cursor-pointer bg-white border border-gray-200 rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                        onClick={() => handleResearchClick(item.name, subItem)}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );

  return (
    <BaseModal
      isOpen={modalIsOpen}
      onClose={onClose}
      title="Выбор вида исследования"
      size="custom"
      contentClassName="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      bodyClassName="p-6 pt-4"
    >
      {modalContent}
    </BaseModal>
  );
}