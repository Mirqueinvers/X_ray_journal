import { useState } from "react";

export default function FlatfootModal({ isOpen, onClose, textareaRef }) {
  if (!isOpen) return null;

  const [values, setValues] = useState({
    right: { angle: "", height: "" },
    left: { angle: "", height: "" },
  });

  const insertTextToTextarea = (text) => {
    if (textareaRef?.current) {
      const current = textareaRef.current.value;
      textareaRef.current.value = current ? current + "\n" + text : text;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  // Функция определения степени по углу
  const getDegreeByAngle = (angle) => {
    const a = parseFloat(angle);
    if (isNaN(a)) return 0;
    if (a <= 130) return 0; // норма
    if (a >= 131 && a <= 140) return 1;
    if (a >= 141 && a <= 155) return 2;
    if (a > 155) return 3;
    return 0;
  };

  // Функция определения степени по высоте
  const getDegreeByHeight = (height) => {
    const h = parseFloat(height);
    if (isNaN(h)) return 0;
    if (h >= 36) return 0; // норма
    if (h >= 25 && h <= 35) return 1;
    if (h >= 17 && h <= 24) return 2;
    if (h < 17) return 3;
    return 0;
  };

  // Функция для отображения текста степени
  const degreeText = (deg) => {
    switch (deg) {
      case 0:
        return "норме (признаков плоскостопия не выявлено)";
      case 1:
        return "I степени плоскостопия";
      case 2:
        return "II степени плоскостопия";
      case 3:
        return "III степени плоскостопия";
      default:
        return "";
    }
  };

  // Генерация текста для вставки
  const generateDescription = () => {
    const baseText =
      "Структура костей сохранена, контуры их ровные, чёткие, без признаков костно-деструктивной или костно-травматической патологии.";

    const lines = [baseText];

    ["left", "right"].forEach((side) => {
      const { angle, height } = values[side];
      if (angle || height) {
        const angleDeg = getDegreeByAngle(angle);
        const heightDeg = getDegreeByHeight(height);
        const finalDeg = Math.max(angleDeg, heightDeg); // наиболее выраженный показатель

        lines.push(
          `${side === "left" ? "Левая" : "Правая"} стопа: угол свода – ${
            angle || "—"
          }°, высота свода – ${height || "—"} мм (соответствует ${degreeText(
            finalDeg
          )}).`
        );
      }
    });

    if (lines.length === 1) {
      lines.push("Признаков плоскостопия не выявлено.");
    }

    return lines.join("\n");
  };

  const handleChange = (side, field, value) => {
    setValues((prev) => ({
      ...prev,
      [side]: { ...prev[side], [field]: value },
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[350mm] h-[148.5mm] relative p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-yellow-400 mb-6">
          Оценка плоскостопия
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {["right", "left"].map((side) => (
            <div
              key={side}
              className="p-4 border border-yellow-500 rounded-lg bg-gray-700"
            >
              <h3 className="text-lg font-semibold text-yellow-300 mb-4 text-center">
                {side === "left" ? "Левая стопа" : "Правая стопа"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-yellow-200 mb-1">
                    Угол свода (°)
                  </label>
                  <input
                    type="number"
                    value={values[side].angle}
                    onChange={(e) => handleChange(side, "angle", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-yellow-200 mb-1">
                    Высота свода (мм)
                  </label>
                  <input
                    type="number"
                    value={values[side].height}
                    onChange={(e) => handleChange(side, "height", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {values[side].angle && values[side].height && (
                  <p className="text-sm text-yellow-300 mt-2 text-center">
                    {degreeText(
                      Math.max(
                        getDegreeByAngle(values[side].angle),
                        getDegreeByHeight(values[side].height)
                      )
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-yellow-200 text-sm">
        <h4 className="font-semibold mb-2">Нормативные значения:</h4>
        <table className="w-full border border-yellow-600 text-center text-xs">
            <thead className="bg-gray-700">
            <tr>
                <th className="border border-yellow-600 p-1">Степень</th>
                <th className="border border-yellow-600 p-1">Угол свода</th>
                <th className="border border-yellow-600 p-1">Высота свода</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border border-yellow-600 p-1">Норма</td>
                <td className="border border-yellow-600 p-1">≤130°</td>
                <td className="border border-yellow-600 p-1">≥36 мм</td>
            </tr>
            <tr>
                <td className="border border-yellow-600 p-1">I ст.</td>
                <td className="border border-yellow-600 p-1">131–140°</td>
                <td className="border border-yellow-600 p-1">35–25 мм</td>
            </tr>
            <tr>
                <td className="border border-yellow-600 p-1">II ст.</td>
                <td className="border border-yellow-600 p-1">141–155°</td>
                <td className="border border-yellow-600 p-1">24–17 мм</td>
            </tr>
            <tr>
                <td className="border border-yellow-600 p-1">III ст.</td>
                <td className="border border-yellow-600 p-1">&gt;155°</td>
                <td className="border border-yellow-600 p-1">&lt;17 мм</td>
            </tr>
            </tbody>
        </table>
        </div>


        {/* Добавить */}
        <div className="absolute bottom-4 left-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
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
