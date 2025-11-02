import React, { useState } from "react";

const jointSpaceMap = {
  "незначительно сужена": "незначительно сужена",
  "умеренно сужена": "умеренно сужена",
  "выраженно сужена": "выраженно сужена",
  "резко сужена": "резко сужена",
};

const surfaceMap = {
  "незначительно склерозированы": "незначительно склерозированы",
  "умеренно склерозированы": "умеренно склерозированы",
  "выраженно склерозированы": "выраженно склерозированы",
};

export default function ShoulderAcromioclavicularModal({
  isOpen,
  onClose,
  insertTextToTextarea,
}) {
  const [leftData, setLeftData] = useState({
    isNormal: true,
    jointSpace: "",
    jointSurface: "",
    osteophytes: [],
  });

  const [rightData, setRightData] = useState({
    isNormal: true,
    jointSpace: "",
    jointSurface: "",
    osteophytes: [],
  });

  const handleNormalToggle = (side) => {
    const resetState = {
      isNormal: true,
      jointSpace: "",
      jointSurface: "",
      osteophytes: [],
    };
    if (side === "left") setLeftData(resetState);
    else setRightData(resetState);
  };

  const handleJointSpaceChange = (side, value) => {
    if (side === "left") {
      setLeftData((prev) => ({
        ...prev,
        isNormal: false,
        jointSpace: value,
      }));
    } else {
      setRightData((prev) => ({
        ...prev,
        isNormal: false,
        jointSpace: value,
      }));
    }
  };

  const handleJointSurfaceChange = (side, value) => {
    if (side === "left") {
      setLeftData((prev) => ({
        ...prev,
        isNormal: false,
        jointSurface: value,
      }));
    } else {
      setRightData((prev) => ({
        ...prev,
        isNormal: false,
        jointSurface: value,
      }));
    }
  };

  const handleOsteophytesToggle = (side, location) => {
    if (side === "left") {
      setLeftData((prev) => ({
        ...prev,
        isNormal: false,
        osteophytes: prev.osteophytes.includes(location)
          ? prev.osteophytes.filter((item) => item !== location)
          : [...prev.osteophytes, location],
      }));
    } else {
      setRightData((prev) => ({
        ...prev,
        isNormal: false,
        osteophytes: prev.osteophytes.includes(location)
          ? prev.osteophytes.filter((item) => item !== location)
          : [...prev.osteophytes, location],
      }));
    }
  };

const generateDescription = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const makeDescParts = (data) => {
    const parts = {};
    if (data.jointSpace) parts.jointSpace = jointSpaceMap[data.jointSpace];
    if (data.jointSurface) parts.jointSurface = surfaceMap[data.jointSurface];
    if (data.osteophytes.length > 0) {
      if (
        data.osteophytes.includes("по верхнему краю") &&
        data.osteophytes.includes("по нижнему краю")
      ) {
        parts.osteophytes = "по верхнему и нижнему краям";
      } else {
        parts.osteophytes = data.osteophytes.join(" и ");
      }
    }
    return parts;
  };

  const leftParts = makeDescParts(leftData);
  const rightParts = makeDescParts(rightData);

  // 🔹 Оба нормальные
  if (leftData.isNormal && rightData.isNormal) {
    return "Ключично-акромиальные сочленения без особенностей.";
  }

  // 🔹 Одинаковые изменения суставной щели и поверхностей
  const sameJointSpace =
    leftData.jointSpace && leftData.jointSpace === rightData.jointSpace;
  const sameSurface =
    leftData.jointSurface && leftData.jointSurface === rightData.jointSurface;
  const leftHasOsteophytes = leftData.osteophytes.length > 0;
  const rightHasOsteophytes = rightData.osteophytes.length > 0;

  if (sameJointSpace && sameSurface) {
    const parts = [];
    parts.push(
      `Суставные щели ключично-акромиальных сочленений ${leftParts.jointSpace.replace(
        "сужена",
        "сужены"
      )}`
    );
    parts.push(
      `суставные поверхности ${leftParts.jointSurface.replace(
        "склерозирована",
        "склерозированы"
      )}`
    );

    // 🔸 Добавляем остеофиты (разные / одинаковые)
    if (leftHasOsteophytes && rightHasOsteophytes) {
      if (leftParts.osteophytes === rightParts.osteophytes) {
        parts.push(`определяются краевые костные разрастания ${leftParts.osteophytes}`);
      } else {
        parts.push(
          `определяются краевые костные разрастания ${leftParts.osteophytes} левого и ${rightParts.osteophytes} правого ключично-акромиальных сочленений`
        );
      }
    } else if (leftHasOsteophytes) {
      parts.push(
        `определяются краевые костные разрастания ${leftParts.osteophytes} левого ключично-акромиального сочленения`
      );
    } else if (rightHasOsteophytes) {
      parts.push(
        `определяются краевые костные разрастания ${rightParts.osteophytes} правого ключично-акромиального сочленения`
      );
    }

    return capitalize(parts.join(", ")) + ".";
  }

  // 🔹 Разные изменения — отдельные описания
  const makeSideDesc = (label, data, parts) => {
    if (data.isNormal)
      return `${label} ключично-акромиальное сочленение без особенностей`;

    const sideParts = [];
    if (parts.jointSpace)
      sideParts.push(`суставная щель ${parts.jointSpace}`);
    if (parts.jointSurface)
      sideParts.push(`суставные поверхности ${parts.jointSurface}`);
    if (parts.osteophytes)
      sideParts.push(`определяются краевые костные разрастания ${parts.osteophytes}`);

    return `${label} ключично-акромиальное сочленение: ${sideParts.join(", ")}`;
  };

  const result =
    makeSideDesc("Левое", leftData, leftParts) +
    ".\n" +
    makeSideDesc("Правое", rightData, rightParts) +
    ".";

  return capitalize(result);
};





  if (!isOpen) return null;

  const jointSpaceOptions = [
    "незначительно сужена",
    "умеренно сужена",
    "выраженно сужена",
    "резко сужена",
  ];
  const jointSurfaceOptions = [
    "незначительно склерозированы",
    "умеренно склерозированы",
    "выраженно склерозированы",
  ];
  const osteophytesOptions = ["по верхнему краю", "по нижнему краю"];

  const renderJoint = (side, data, setHandlerPrefix) => (
    <div className="flex-1 p-4 bg-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-300 mb-4 text-center">
        {side === "left" ? "Левое сочленение" : "Правое сочленение"}
      </h3>

      {/* Кнопка Норма */}
      <div className="mb-4 flex justify-center">
        <button
          className={`px-4 py-2 rounded ${
            data.isNormal
              ? "bg-yellow-500 text-gray-900"
              : "bg-gray-600 text-yellow-200 border border-yellow-500"
          }`}
          onClick={() => handleNormalToggle(side)}
        >
          Норма
        </button>
      </div>

      {/* Суставная щель */}
      <div className="mb-4">
        <h4 className="text-sm text-yellow-200 mb-2">Суставная щель:</h4>
        <div className="flex flex-wrap gap-2">
          {jointSpaceOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 text-xs rounded ${
                data.jointSpace === option
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-600 text-yellow-200 border border-yellow-500"
              }`}
              onClick={() => handleJointSpaceChange(side, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Суставные поверхности */}
      <div className="mb-4">
        <h4 className="text-sm text-yellow-200 mb-2">Суставные поверхности:</h4>
        <div className="flex flex-wrap gap-2">
          {jointSurfaceOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 text-xs rounded ${
                data.jointSurface === option
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-600 text-yellow-200 border border-yellow-500"
              }`}
              onClick={() => handleJointSurfaceChange(side, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Остеофиты */}
      <div>
        <h4 className="text-sm text-yellow-200 mb-2">Остеофиты:</h4>
        <div className="flex flex-wrap gap-2">
          {osteophytesOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 text-xs rounded ${
                data.osteophytes.includes(option)
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-600 text-yellow-200 border border-yellow-500"
              }`}
              onClick={() => handleOsteophytesToggle(side, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-[750px] max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 z-10"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-yellow-200 mb-6 text-center">
            Ключично-акромиальные сочленения
          </h2>

          <div className="flex gap-4">
            {renderJoint("left", leftData)}
            {renderJoint("right", rightData)}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400"
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
    </div>
  );
}
