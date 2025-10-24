// generateDescriptionGapSurface.js
export const generateDescriptionGapSurface = ({
  type = "ankle", // "elbow" | "wrist" | "ankle"
  selectedOptions,
  selectedPositions,
  mode = "gaps", // "gaps" — суставные щели, "surfaces" — суставные поверхности
}) => {
  const jointMap = {
    elbow: { plural: "локтевых суставов", single: "локтевого сустава" },
    wrist: { plural: "лучезапястных суставов", single: "лучезапястного сустава" },
    ankle: { plural: "голеностопных суставов", single: "голеностопного сустава" },
  };

  const jointNames = jointMap[type] || jointMap["ankle"];
  const leftOpts = selectedOptions.left || [];
  const rightOpts = selectedOptions.right || [];
  const leftPos = selectedPositions.left || "";
  const rightPos = selectedPositions.right || "";
  const sides = { left: "левого", right: "правого" };

  const positionPhrase = (pos, plural = false) => {
    switch (pos) {
      case "медиально": return plural ? "медиальных" : "медиальном";
      case "латерально": return plural ? "латеральных" : "латеральном";
      case "равномерно": return "равномерно";
      default: return "";
    }
  };

  const addPosition = (pos, plural = false) => {
    if (!pos || pos === "равномерно") return "";
    return `, преимущественно в ${positionPhrase(pos, plural)} отдел${plural ? "ах" : "е"}`;
  };

  const normalText =
    mode === "gaps"
      ? `Суставные щели ${jointNames.plural} сохранены, равномерные.`
      : `Суставные поверхности ${jointNames.plural} ровные, без деформации.`;

  const actionText = (degree, plural = false) => {
    if (mode === "gaps") return `${degree} ${plural ? "сужены" : "сужена"}`;
    // Для surfaces всегда "склерозированы"
    return `${degree} склерозированы`;
  };

  // Норма
  if (!leftOpts.length && !rightOpts.length) return normalText;

  // Оба сустава выбраны
  if (leftOpts.length && rightOpts.length) {
    const sameDegree = leftOpts[0] === rightOpts[0];
    const samePos = leftPos === rightPos;

    if (sameDegree && samePos) {
      const plural = mode === "gaps"; // множественное число только для gaps
      if (!leftPos || leftPos === "равномерно") {
        return mode === "gaps"
          ? `Суставные щели ${jointNames.plural} ${actionText(leftOpts[0], plural)}.`
          : `Суставные поверхности ${jointNames.plural} ${actionText(leftOpts[0], plural)}.`;
      }
      return mode === "gaps"
        ? `Суставные щели ${jointNames.plural} ${actionText(leftOpts[0], plural)}${addPosition(leftPos, plural)}.`
        : `Суставные поверхности ${jointNames.plural} ${actionText(leftOpts[0], plural)}${addPosition(leftPos, true)}.`;
    }

    // Асимметричные изменения
    const rightPart = `${sides.right} ${jointNames.single} ${actionText(rightOpts[0])}${addPosition(rightPos)}`;
    const leftPart = `${sides.left} ${jointNames.single} ${actionText(leftOpts[0])}${addPosition(leftPos)}`;
    return `${mode === "gaps" ? "Суставная щель" : "Суставные поверхности"} ${rightPart}; ${leftPart}.`;
  }

  // Только левый
  if (leftOpts.length) {
    return `${mode === "gaps" ? "Суставная щель" : "Суставные поверхности"} ${sides.left} ${jointNames.single} ${actionText(leftOpts[0])}${addPosition(leftPos)}, правого ${mode === "gaps" ? "не изменена" : "склерозированы"}.`;
  }

  // Только правый
  if (rightOpts.length) {
    return `${mode === "gaps" ? "Суставная щель" : "Суставные поверхности"} ${sides.right} ${jointNames.single} ${actionText(rightOpts[0])}${addPosition(rightPos)}, левого ${mode === "gaps" ? "не изменена" : "склерозированы"}.`;
  }

  return "Изменений не выявлено.";
};
