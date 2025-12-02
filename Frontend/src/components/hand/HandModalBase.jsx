// Frontend/src/components/hand/HandModalBase.jsx
import React, { useState } from "react";
import BaseModal from "../common/BaseModal.jsx";
import { createHandJointMap, HAND_DEGREES_FULL, HAND_DEGREES_SURFACES, HAND_INITIAL_STATE } from "./handConstants.js";

export function useHandModalState(degrees = HAND_DEGREES_FULL) {
  const [selectedOptions, setSelectedOptions] = useState(HAND_INITIAL_STATE());
  const [activeDegree, setActiveDegree] = useState(degrees[0]);
  const [mode, setMode] = useState("Не нарушена"); // для конгруэнтности

  const jointMap = createHandJointMap();

  const toggleJoint = (key, property = "selected") => {
    setSelectedOptions(prev => {
      const joint = prev[key] || {};
      const newJoint = { ...joint };
      
      if (property === "конгруэнтность") {
        newJoint.конгруэнтность = !joint.конгруэнтность;
        if (mode === "Не нарушена") setMode("Нарушена");
      } else if (property === "остеофиты") {
        newJoint.остеофиты = !joint.остеофиты;
      } else {
        // Для степеней
        if (newJoint[activeDegree]) {
          delete newJoint[activeDegree];
        } else {
          newJoint[activeDegree] = true;
        }
      }
      
      return { ...prev, [key]: newJoint };
    });
  };

  const resetToNormal = () => {
    setSelectedOptions(HAND_INITIAL_STATE());
    setActiveDegree(degrees[0]);
    setMode("Не нарушена");
  };

  const setNormalMode = () => {
    setMode("Не нарушена");
    const cleared = {};
    Object.keys(HAND_INITIAL_STATE()).forEach(k => cleared[k] = {});
    setSelectedOptions(cleared);
  };

  return {
    selectedOptions,
    activeDegree,
    setActiveDegree,
    mode,
    setMode,
    jointMap,
    toggleJoint,
    resetToNormal,
    setNormalMode,
    degrees,
  };
}

export default function HandModalBase({
  isOpen,
  onClose,
  title,
  insertTextToTextarea,
  generatorFunction,
  type,
  mode: modalMode,
  showDegreeSelector = false,
  customProperty = "selected",
  degrees = HAND_DEGREES_FULL,
  showCongruencyMode = false,
}) {
  const {
    selectedOptions,
    activeDegree,
    setActiveDegree,
    mode,
    setMode,
    jointMap,
    toggleJoint,
    resetToNormal,
    setNormalMode,
  } = useHandModalState(degrees);

  const handleAdd = () => {
    let insertText = "";

    if (showCongruencyMode && mode === "Не нарушена") {
      insertText = "Конгруэнтность суставов кистей не нарушена.";
    } else if (showDegreeSelector && activeDegree === "Не изменены") {
      if (modalMode === "gaps") {
        insertText = "Суставные щели мелких суставов кистей сохранены, равномерные.";
      } else if (modalMode === "surfaces") {
        insertText = "Суставные поверхности мелких суставов кистей без изменений.";
      }
    } else {
      insertText = generatorFunction({
        jointMap,
        selectedOptions,
        type,
        mode: modalMode,
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
        {degrees.map(degree => (
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

  const CongruencyModeSelector = () => (
    showCongruencyMode && (
      <div className="absolute top-4 left-4 z-20">
        <button
          className={`px-4 py-2 rounded font-medium transition-colors ${
            mode === "Не нарушена"
              ? "bg-yellow-500 text-gray-900"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
          onClick={() => {
            if (mode === "Не нарушена") return;
            setNormalMode();
          }}
        >
          Не нарушена
        </button>
      </div>
    )
  );

  const getJointSize = (key) => {
    if (key.includes("Wrist")) return "w-[150px] h-[50px]";
    if (key.includes("Cmc")) return "w-[35px] h-[35px]";
    return "w-[50px] h-[50px]";
  };

  const getTextSize = (key) => {
    if (key.includes("Wrist")) return "text-[10px]";
    if (key.includes("Cmc")) return "text-[8px]";
    return "text-xs";
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="custom"
      contentClassName="w-[350mm] h-[148.5mm] bg-gray-800 p-0 overflow-hidden"
    >
      <div className="w-full h-full relative p-6">
        {showDegreeSelector ? <DegreeSelector /> : <CongruencyModeSelector />}

        {/* Фон с руками */}
        <div 
          className="w-full h-full relative" 
          style={{
            backgroundImage: `url(/images/hand-left.png), url(/images/hand-right.png)`,
            backgroundPosition: "15% center, 85% center",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "contain, contain",
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
                className={`absolute flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200 z-10 ${getJointSize(j.key)} ${
                  isSelected ? "bg-yellow-200/30 border-yellow-400" : "bg-transparent border-yellow-500"
                }`}
                style={{ top: j.top, left: j.left, transform: "translate(-50%, -50%)" }}
                onClick={() => toggleJoint(j.key, customProperty)}
              >
                <span className={`${getTextSize(j.key)} font-medium text-black`}>
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