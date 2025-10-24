const zones = [
  { key: "leftMedial", side: "левого", part: "медиальном" },
  { key: "leftLateral", side: "левого", part: "латеральном" },
  { key: "rightMedial", side: "правого", part: "медиальном" },
  { key: "rightLateral", side: "правого", part: "латеральном" },
];

// Карты для разных режимов
const modeMaps = {
  gaps: {
    single: {
      "незначительно сужены": "незначительно сужена",
      "умеренно сужены": "умеренно сужена",
      "выраженно сужены": "выраженно сужена",
      "резко сужены": "резко сужена",
    },
    plural: {
      "незначительно сужена": "незначительно сужены",
      "умеренно сужена": "умеренно сужены",
      "выраженно сужена": "выраженно сужены",
      "резко сужена": "резко сужены",
    },
    firstPhrase: {
      single: "Суставная щель",
      plural: "Суставные щели",
    },
    uniformText: "Суставные щели равномерной высоты",
  },
  surfaces: {
    single: {
      "поверхность гладкая": "поверхность гладкая",
      "незначительные изменения": "незначительно склерозирована",
      "умеренные изменения": "умеренно склерозирована",
      "выраженные изменения": "выраженно склерозирована",
      "резкие изменения": "резко склерозирована",
    },
    plural: {
      "поверхность гладкая": "поверхности гладкие",
      "незначительные изменения": "незначительно склерозированы",
      "умеренные изменения": "умеренно склерозированы",
      "выраженные изменения": "выраженно склерозированы",
      "резкие изменения": "резко склерозированы",
    },
    firstPhrase: {
      single: "Суставная поверхность",
      plural: "Суставные поверхности",
    },
    uniformText: "Суставные поверхности ровные, без деформации",
  },
};

export const generateDescriptionKneeGapSurface = ({
  selectedOptions,
  mode = "gaps",
}) => {
  const perKnee = { left: {}, right: {} };
  let totalSelected = 0;

  zones.forEach(({ key, side, part }) => {
    const degree = selectedOptions[key]?.[0];
    if (!degree) return;
    const kneeKey = side === "левого" ? "left" : "right";
    perKnee[kneeKey][part] = degree;
    totalSelected++;
  });

  const map = modeMaps[mode];
  const singleMap = map.single;
  const pluralMap = map.plural;

  // Если ничего не выбрано
  if (totalSelected === 0) return map.uniformText + ".";

  // Если выбраны только "равномерной высоты" или "поверхность гладкая"
  const allUniform = Object.values(selectedOptions).every(
    (options) =>
      options.length === 1 &&
      (options[0] === "равномерной высоты" || options[0] === "поверхность гладкая")
  );
  if (allUniform) return map.uniformText + ".";

  const descriptions = [];
  const usedParts = new Set();
  let usePlural = false;

  // 1. Объединяем одинаковые состояния на обоих коленях по отделам
  ["медиальном", "латеральном"].forEach((part) => {
    const leftDegree = perKnee.left[part];
    const rightDegree = perKnee.right[part];
    if (leftDegree && rightDegree && leftDegree === rightDegree) {
      const partText = part === "медиальном" ? "медиальных" : "латеральных";
      descriptions.push(
        `коленных суставов ${pluralMap[singleMap[leftDegree]]} в ${partText} отделах`
      );
      usedParts.add(part);
      usePlural = true;
    }
  });

  // 2. Асимметричные изменения
  ["медиальном", "латеральном"].forEach((part) => {
    if (usedParts.has(part)) return;
    const leftDegree = perKnee.left[part];
    const rightDegree = perKnee.right[part];
    if (leftDegree && rightDegree && leftDegree !== rightDegree) {
      descriptions.push(
        `правого коленного сустава ${singleMap[rightDegree]} в ${part} отделе, левого коленного сустава ${singleMap[leftDegree]} в ${part} отделе`
      );
      usedParts.add(part);
    }
  });

  // 3. Индивидуальные описания для колен
  ["left", "right"].forEach((knee) => {
    const kneeParts = perKnee[knee];
    const sideName = knee === "left" ? "левого" : "правого";
    const remainingParts = Object.keys(kneeParts).filter((part) => !usedParts.has(part));
    if (!remainingParts.length) return;

    if (remainingParts.length === 1) {
      const part = remainingParts[0];
      descriptions.push(`${sideName} коленного сустава ${singleMap[kneeParts[part]]} в ${part} отделе`);
    } else {
      const partDesc = remainingParts.map((part) => `${singleMap[kneeParts[part]]} в ${part} отделе`);
      descriptions.push(`${sideName} коленного сустава ${partDesc.join(", ")}`);
    }
  });

  if (!descriptions.length) return map.uniformText + ".";
  const firstPhrase = usePlural ? map.firstPhrase.plural : map.firstPhrase.single;
  return `${firstPhrase} ${descriptions.join(", ")}.`;
};
