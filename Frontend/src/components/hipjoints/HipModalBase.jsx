// Frontend/src/components/hipjoints/HipModalBase.jsx
import React from "react";
import BaseModal from "../common/BaseModal.jsx";

export function useHipModalState(initialState = {}) {
  const [selectedOptions, setSelectedOptions] = React.useState(initialState);
  const [expandedZone, setExpandedZone] = React.useState(null);

  const handleZoneClick = (zoneKey) => {
    setExpandedZone(expandedZone === zoneKey ? null : zoneKey);
  };

  const closeExpandedZone = () => {
    setExpandedZone(null);
  };

  return {
    selectedOptions,
    setSelectedOptions,
    expandedZone,
    handleZoneClick,
    closeExpandedZone,
  };
}

export default function HipModalBase({
  isOpen,
  onClose,
  title,
  children,
  backgroundImage = "/images/hip.png",
}) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="custom"
      contentClassName="w-[350mm] h-[148.5mm] bg-gray-800 p-0 overflow-hidden"
    >
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </BaseModal>
  );
}

// Общие константы
export const HIP_ZONES = [
  { key: "right", name: "Правый тазобедренный сустав", position: { top: "50%", left: "30%" } },
  { key: "left", name: "Левый тазобедренный сустав", position: { top: "50%", left: "60%" } },
];

export const DEGREE_OPTIONS = ["незначительно", "умеренно", "выраженно", "резко"];
export const UNIFORMITY_OPTIONS = ["равномерно", "неравномерно"];
export const SURFACE_OPTIONS = [
  "не изменены",
  "незначительно склерозированы", 
  "умеренно склерозированы",
  "выраженно склерозированы",
];

// Компонент для раскрывающихся панелей
export function ExpandablePanel({ zone, expanded, children, onClose }) {
  if (!expanded) return null;

  return (
    <div
      className="absolute bg-gray-700 p-3 rounded-lg shadow-lg z-20 w-[180px]"
      style={{
        top: zone.position.top,
        left: zone.position.left,
      }}
    >
      <div className="text-right mb-2">
        <button
          onClick={onClose}
          className="text-yellow-300 hover:text-yellow-100 text-xs"
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  );
}