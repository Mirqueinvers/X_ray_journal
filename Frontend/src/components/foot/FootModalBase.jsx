// Frontend/src/components/foot/FootModalBase.jsx
import React, { useState } from "react";
import BaseModal from "../common/BaseModal.jsx";
import { createFootJointMap, FOOT_DEGREES, FOOT_INITIAL_STATE } from "./footConstants.js";

export function useFootModalState() {
  const [selectedOptions, setSelectedOptions] = useState(FOOT_INITIAL_STATE());
  const [activeDegree, setActiveDegree] = useState(FOOT_DEGREES[0]);
  const [isNormal, setIsNormal] = useState(true);

  const jointMap = createFootJointMap();

  const toggleJoint = (key, property = "selected") => {
    setSelectedOptions(prev => {
      const joint = prev[key] || {};
      const newJoint = { ...joint };
      
      if (property === "selected") {
        newJoint.selected = !joint.selected;
      } else if (property === "конгруэнтность") {
        newJoint.конгруэнтность = !joint.конгруэнтность;
      } else if (property === "остеофиты") {
        newJoint.остеофиты = !joint.остеофиты;
      } else {
        // Для степеней (незначительно, умеренно, etc.)
        if (newJoint[activeDegree]) {
          delete newJoint[activeDegree];
        } else {
          newJoint[activeDegree] = true;
        }
      }
      
      if (Object.keys(newJoint).length > 0) {
        setIsNormal(false);
      }
      
      return { ...prev, [key]: newJoint };
    });
  };

  const resetToNormal = () => {
    setIsNormal(true);
    setSelectedOptions(FOOT_INITIAL_STATE());
    setActiveDegree(FOOT_DEGREES[0]);
  };

  return {
    selectedOptions,
    activeDegree,
    setActiveDegree,
    isNormal,
    jointMap,
    toggleJoint,
    resetToNormal,
    FOOT_DEGREES,
  };
}

export default function FootModalBase({
  isOpen,
  onClose,
  title,
  insertTextToTextarea,
  generatorFunction,
  type,
  mode,
  showDegreeSelector = false,
  customProperty = "selected",
}) {
  const {
    selectedOptions,
    activeDegree,
    setActiveDegree,
    isNormal,
    jointMap,
    toggleJoint,
    resetToNormal,
    FOOT_DEGREES,
  } = useFootModalState();

  const handleAdd = () => {
    let insertText = "";

    if (showDegreeSelector && activeDegree === "Не изменены") {
      if (mode === "gaps") {
        insertText = "Суставные щели мелких суставов стоп сохранены, равномерные.";
      } else if (mode === "surfaces") {
        insertText = "Суставные поверхности мелких суставов стоп без изменений.";
      }
    } else {
      insertText = generatorFunction({
        jointMap,
        selectedOptions,
        type,
        mode,
        activeDegree,
      });
    }

    const finalText = `\n${insertText}`;
    insertTextToTextarea(finalText);
    onClose();
  };

  const DegreeSelector = () => (
    showDegreeSelector && (
      <div className="absolute left-4 top-4 flex flex-col gap-2 z-20">
        {FOOT_DEGREES.map(degree => (
          <button
            key={degree}
            onClick={() => setActiveDegree(degree)}
            className={`px-4 py-2 rounded font-medium ${
              activeDegree === degree 
                ? "bg-yellow-500 text-gray-900" 
                : "bg-gray-600 text-white"
            }`}
          >
            {degree}
          </button>
        ))}
      </div>
    )
  );

  const NormalButton = () => (
    <div className="absolute left-4 top-4 flex flex-col gap-2 z-20">
      <button
        onClick={resetToNormal}
        className={`px-4 py-2 rounded font-medium text-sm ${
          isNormal ? "bg-green-500 text-gray-900" : "bg-gray-600 text-white"
        }`}
      >
        Норма
      </button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="custom"
      contentClassName="w-[350mm] h-[148.5mm] bg-gray-800 p-0 overflow-hidden"
    >
      <div className="w-full h-full relative p-6">
        {showDegreeSelector ? <DegreeSelector /> : <NormalButton />}

        {/* Фон со стопами */}
        <div 
          className="w-full h-full relative" 
          style={{
            backgroundImage: `url(/images/foot-right1.png), url(/images/foot-left1.png)`,
            backgroundPosition: "30% 95%, 70% 95%",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "25% auto, 25% auto",
          }}
        >
          {jointMap.map(j => {
            const joint = selectedOptions[j.key];
            let isSelected = false;
            
            if (customProperty === "конгруэнтность") {
              isSelected = joint && joint.конгруэнтность;
            } else if (customProperty === "остеофиты") {
              isSelected = joint && joint.остеофиты;
            } else if (showDegreeSelector) {
              isSelected = joint && joint[activeDegree];
            } else {
              isSelected = joint && joint.selected;
            }

            return (
              <div
                key={j.key}
                className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200 w-[35px] h-[35px] ${
                  isSelected ? "bg-yellow-200/30 border-yellow-400" : "bg-transparent border-yellow-500"
                }`}
                style={{ top: j.top, left: j.left, transform: "translate(-50%, -50%)" }}
                onClick={() => toggleJoint(j.key, customProperty)}
              >
                <span className="text-[8px] font-medium text-black">
                  {j.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Кнопка добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={handleAdd}
          >
            Добавить
          </button>
        </div>
      </div>
    </BaseModal>
  );
}