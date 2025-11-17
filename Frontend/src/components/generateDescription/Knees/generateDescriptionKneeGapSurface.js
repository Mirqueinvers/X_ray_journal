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
      single: "Суставные поверхности",
      plural: "Суставные поверхности",
    },
    uniformText: "Суставные поверхности ровные, без деформации",
  },
};

export const generateDescriptionKneeGapSurface = ({ 
  selectedOptions, 
  mode = "gaps",
  hasEndoprosthesis = false 
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

  // Если ничего не выбрано
  if (totalSelected === 0) return modeMaps[mode].uniformText + ".";

  // Проверка "равномерной высоты" или "поверхность гладкая"
  const allUniform = Object.values(selectedOptions).every(
    (options) =>
      options.length === 1 &&
      (options[0] === "равномерной высоты" || options[0] === "поверхность гладкая")
  );
  if (allUniform) return modeMaps[mode].uniformText + ".";

  const descriptions = [];
  const usedParts = new Set();

  // НОВОЕ: Отдельная логика для эндопротеза
  if (hasEndoprosthesis) {
    if (mode === "gaps") {
      // Логика для суставных щелей с эндопротезом
      const singleMap = modeMaps.gaps.single;

      ["медиальном", "латеральном"].forEach((part) => {
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left === right) {
          const partText = part === "медиальном" ? "медиальных" : "латеральных";
          descriptions.push(`${singleMap[left]} в ${partText} отделах`);
          usedParts.add(part);
        }
      });

      ["медиальном", "латеральном"].forEach((part) => {
        if (usedParts.has(part)) return;
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left !== right) {
          descriptions.push(
            `${singleMap[right]} в ${part} отделе, ${singleMap[left]} в ${part} отделе`
          );
          usedParts.add(part);
        }
      });

      ["left", "right"].forEach((knee) => {
        const kneeParts = perKnee[knee];
        Object.keys(kneeParts)
          .filter((part) => !usedParts.has(part))
          .forEach((part) => {
            descriptions.push(`${singleMap[kneeParts[part]]} в ${part} отделе`);
          });
      });

      return `${modeMaps.gaps.firstPhrase.single} ${descriptions.join(", ")}.`;
    }

    if (mode === "surfaces") {
      // Логика для суставных поверхностей с эндопротезом
      const pluralMap = modeMaps.surfaces.plural;

      ["медиальном", "латеральном"].forEach((part) => {
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left === right) {
          const partText = part === "медиальном" ? "медиальных" : "латеральных";
          descriptions.push(`${pluralMap[left]} в ${partText} отделах`);
          usedParts.add(part);
        }
      });

      ["медиальном", "латеральном"].forEach((part) => {
        if (usedParts.has(part)) return;
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left !== right) {
          descriptions.push(
            `${pluralMap[right]} в ${part} отделе, ${pluralMap[left]} в ${part} отделе`
          );
          usedParts.add(part);
        }
      });

      ["left", "right"].forEach((knee) => {
        const kneeParts = perKnee[knee];
        Object.keys(kneeParts)
          .filter((part) => !usedParts.has(part))
          .forEach((part) => {
            descriptions.push(`${pluralMap[kneeParts[part]]} в ${part} отделе`);
          });
      });

      return `${modeMaps.surfaces.firstPhrase.plural} ${descriptions.join(", ")}.`;
    }
  }

  // СУЩЕСТВУЮЩАЯ ЛОГИКА БЕЗ ИЗМЕНЕНИЙ
  if (mode === "gaps") {
    // ===============================
    // Суставные щели — старая логика
    // ===============================
    const singleMap = modeMaps.gaps.single;
    const pluralMap = modeMaps.gaps.plural;
    let usePlural = false;

    ["медиальном", "латеральном"].forEach((part) => {
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left === right) {
        const partText = part === "медиальном" ? "медиальных" : "латеральных";
        descriptions.push(`коленных суставов ${pluralMap[singleMap[left]]} в ${partText} отделах`);
        usedParts.add(part);
        usePlural = true;
      }
    });

    ["медиальном", "латеральном"].forEach((part) => {
      if (usedParts.has(part)) return;
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left !== right) {
        descriptions.push(
          `правого коленного сустава ${singleMap[right]} в ${part} отделе, левого коленного сустава ${singleMap[left]} в ${part} отделе`
        );
        usedParts.add(part);
      }
    });

    ["left", "right"].forEach((knee) => {
      const kneeParts = perKnee[knee];
      const sideName = knee === "left" ? "левого" : "правого";
      Object.keys(kneeParts)
        .filter((part) => !usedParts.has(part))
        .forEach((part) => {
          descriptions.push(`${sideName} коленного сустава ${singleMap[kneeParts[part]]} в ${part} отделе`);
        });
    });

    const firstPhrase = usePlural ? modeMaps.gaps.firstPhrase.plural : modeMaps.gaps.firstPhrase.single;
    return `${firstPhrase} ${descriptions.join(", ")}.`;
  }

  if (mode === "surfaces") {
    // ===============================
    // Суставные поверхности — новая логика
    // ===============================
    const pluralMap = modeMaps.surfaces.plural;

    ["медиальном", "латеральном"].forEach((part) => {
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left === right) {
        const partText = part === "медиальном" ? "медиальных" : "латеральных";
        descriptions.push(`коленных суставов ${pluralMap[left]} в ${partText} отделах`);
        usedParts.add(part);
      }
    });

    ["медиальном", "латеральном"].forEach((part) => {
      if (usedParts.has(part)) return;
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left !== right) {
        descriptions.push(
          `правого коленного сустава ${pluralMap[right]} в ${part} отделе, левого коленного сустава ${pluralMap[left]} в ${part} отделе`
        );
        usedParts.add(part);
      }
    });

    ["left", "right"].forEach((knee) => {
      const kneeParts = perKnee[knee];
      const sideName = knee === "left" ? "левого" : "правого";
      Object.keys(kneeParts)
        .filter((part) => !usedParts.has(part))
        .forEach((part) => {
          descriptions.push(`${sideName} коленного сустава ${pluralMap[kneeParts[part]]} в ${part} отделе`);
        });
    });

    return `${modeMaps.surfaces.firstPhrase.plural} ${descriptions.join(", ")}.`;
  }
};
