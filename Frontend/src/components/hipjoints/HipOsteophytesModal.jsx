// Frontend/src/components/hipjoints/HipOsteophytesModal.jsx
// Остеофиты тазобедренных суставов (без выпадающих плашек)
import React, { useState } from "react";

export default function HipOsteophytesModal({ isOpen, onClose, textareaRef }) {
  const [selectedZones, setSelectedZones] = useState([]);

  // Зоны для остеофитов
  const zones = [
    { key: "rightLateral", name: "Правый латеральный", label: "латеральной поверхности крыши вертлужной впадины правого тазобедренного сустава", position: { top: "52%", left: "32%" } },
    { key: "rightMedial", name: "Правый медиальный", label: "медиальной поверхности вертлужной впадины правого тазобедренного сустава", position: { top: "67%", left: "36%" } },
    { key: "leftMedial", name: "Левый медиальный", label: "медиальной поверхности вертлужной впадины левого тазобедренного сустава", position: { top: "67%", left: "60%" } },
    { key: "leftLateral", name: "Левый латеральный", label: "латеральной поверхности крыши вертлужной впадины левого тазобедренного сустава", position: { top: "52%", left: "64%" } },
    { key: "rightGreaterTrochanter", name: "Правый большой вертел", label: "краю большого вертела правой бедренной кости", position: { top: "330px", left: "27%" } },
    { key: "leftGreaterTrochanter", name: "Левый большой вертел", label: "краю большого вертела левой бедренной кости", position: { top: "330px", left: "69%" } },
  ];

  const toggleZone = (zoneKey) => {
    setSelectedZones((prev) =>
      prev.includes(zoneKey) ? prev.filter((z) => z !== zoneKey) : [...prev, zoneKey]
    );
  };

  // Вставка в textarea
  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  // Генерация описания
const generateDescription = () => {
  if (!selectedZones || selectedZones.length === 0) {
    return "Остеофитов в тазобедренных суставах не выявлено.";
  }

  const hips = {
    left: { lat: false, med: false, gt: false },
    right: { lat: false, med: false, gt: false },
  };

  selectedZones.forEach((key) => {
    switch (key) {
      case "leftLateral": hips.left.lat = true; break;
      case "leftMedial": hips.left.med = true; break;
      case "leftGreaterTrochanter": hips.left.gt = true; break;
      case "rightLateral": hips.right.lat = true; break;
      case "rightMedial": hips.right.med = true; break;
      case "rightGreaterTrochanter": hips.right.gt = true; break;
      default: break;
    }
  });

  const surfaces = ["lat", "med"];
  const surfaceNames = { lat: "латеральн", med: "медиальн" }; // корни для правильного окончания
  const hipSides = { left: "левого", right: "правого" };

  const parts = [];

  // Объединяем одинаковые поверхности на обоих суставах
  surfaces.forEach((surf) => {
    if (hips.left[surf] && hips.right[surf]) {
      parts.push(`${surfaceNames[surf]}ых поверхностях вертлужных впадин тазобедренных суставов`);
      hips.left[surf] = hips.right[surf] = false; // помечаем как использованные
    }
  });

  // Отдельно описываем поверхности на одном суставе
  Object.keys(hips).forEach((side) => {
    const activeSurfaces = [];
    surfaces.forEach((surf) => {
      if (hips[side][surf]) activeSurfaces.push(surfaceNames[surf] + "ой");
    });
    if (activeSurfaces.length) {
      const text = activeSurfaces.length > 1
        ? `${activeSurfaces.join(" и ")} поверхности вертлужной впадины ${hipSides[side]} тазобедренного сустава`
        : `${activeSurfaces[0]} поверхности вертлужной впадины ${hipSides[side]} тазобедренного сустава`;
      parts.push(text);
    }
  });

  // Обработка больших вертелов
  const gtParts = [];
  if (hips.left.gt && hips.right.gt) {
    gtParts.push("краям больших вертелов бедренных костей");
  } else if (hips.left.gt) {
    gtParts.push("краю большого вертела левой бедренной кости");
  } else if (hips.right.gt) {
    gtParts.push("краю большого вертела правой бедренной кости");
  }

  const allParts = [...parts, ...gtParts];

  let description = "Определяются краевые костные разрастания";

  if (allParts.length === 1 && gtParts.length === 0) {
    description += ` по ${allParts[0]}.`;
  } else if (allParts.length) {
    description += ` со стороны ${allParts.join(" и ")}.`;
  } else {
    description += ".";
  }

  return description;
};




  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
          title="Закрыть"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Фон */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(/images/hip.png)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Основные плашки */}
          {zones.map((zone) => (
            <div
              key={zone.key}
              className={`absolute w-[50px] h-[50px] border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
                selectedZones.includes(zone.key)
                  ? "bg-yellow-200/30 border-yellow-400 text-yellow-300"
                  : "border-yellow-500 bg-transparent text-white"
              }`}
              style={zone.position}
              onClick={() => toggleZone(zone.key)}
            >
              <span className="text-xs font-medium text-center">{zone.name}</span>
            </div>
          ))}
        </div>

        {/* Кнопки */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 disabled:opacity-50"
            onClick={() => {
              insertTextToTextarea(generateDescription());
              onClose();
            }}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
