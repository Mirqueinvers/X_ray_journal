import { useState } from "react";

export default function CalcaneusOsteophytesModal({ isOpen, onClose, insertTextToTextarea }) {
  if (!isOpen) return null;

  const [selectedAreas, setSelectedAreas] = useState({
    rightPlantar: false,
    rightPosterior: false,
    leftPlantar: false,
    leftPosterior: false,
  });

  const toggleArea = (areaKey) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [areaKey]: !prev[areaKey],
    }));
  };

  const generateDescription = () => {
  const baseText =
    "Структура костей сохранена, контуры их ровные, чёткие, без признаков костно-деструктивной или костно-травматической патологии.";

  const areas = [
    { key: "rightPlantar", text: "На подошвенной поверхности правой пяточной кости, в области прикрепления плантарной связки, определяется остроконечный остеофит." },
    { key: "rightPosterior", text: "На задней поверхности правой пяточной кости, в области прикрепления ахиллова сухожилия, определяется остроконечный остеофит." },
    { key: "leftPlantar", text: "На подошвенной поверхности левой пяточной кости, в области прикрепления плантарной связки, определяется остроконечный остеофит." },
    { key: "leftPosterior", text: "На задней поверхности левой пяточной кости, в области прикрепления ахиллова сухожилия, определяется остроконечный остеофит." },
  ];

  const selected = areas.filter((a) => selectedAreas[a.key]);
  if (!selected.length)
    return `${baseText}\nОстеофиты пяточных костей не выявлены.`;

  const texts = [];

  const plantarBoth =
    selectedAreas.rightPlantar && selectedAreas.leftPlantar;
  const posteriorBoth =
    selectedAreas.rightPosterior && selectedAreas.leftPosterior;

  if (plantarBoth) {
    texts.push(
      "На подошвенной поверхности пяточных костей, в области прикрепления плантарной связки, определяются остроконечные остеофиты."
    );
  }
  if (posteriorBoth) {
    texts.push(
      "На задней поверхности пяточных костей, в области прикрепления ахиллова сухожилия, определяются остроконечные остеофиты."
    );
  }

  selected.forEach((area) => {
    if (
      (area.key === "rightPlantar" && plantarBoth) ||
      (area.key === "leftPlantar" && plantarBoth) ||
      (area.key === "rightPosterior" && posteriorBoth) ||
      (area.key === "leftPosterior" && posteriorBoth)
    )
      return; // уже добавлено
    texts.push(area.text);
  });

  return `${baseText}\n${texts.join("\n")}`;
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer">
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Крестик закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10 text-xl font-bold"
          title="Закрыть"
        >
          ✕
        </button>

        {/* Фон с изображениями */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(/images/calcaneus-right.png), url(/images/calcaneus-left.png)`,
            backgroundSize: "500px 400px, 500px 400px",
            backgroundPosition: "10% 15%, 90% 15%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#374151",
          }}
        >
          {/* Правая подошвенная */}
          <div
            className={`absolute top-[57%] left-[22%] w-40 h-32 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.rightPlantar ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleArea("rightPlantar"); }}
          />

          {/* Правая задняя */}
          <div
            className={`absolute top-[40%] left-[35%] w-40 h-32 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.rightPosterior ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleArea("rightPosterior"); }}
          />

          {/* Левая подошвенная */}
          <div
            className={`absolute top-[57%] left-[66%] w-40 h-32 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.leftPlantar ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleArea("leftPlantar"); }}
          />

          {/* Левая задняя */}
          <div
            className={`absolute top-[40%] left-[53%] w-40 h-32 border-2 rounded cursor-pointer transition-all duration-200 ${
              selectedAreas.leftPosterior ? "bg-yellow-200/30 border-yellow-400" : "border-yellow-500 bg-transparent"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleArea("leftPosterior"); }}
          />
        </div>

        {/* Кнопка Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
            onClick={() => {
              insertTextToTextarea("\n" + generateDescription());
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
