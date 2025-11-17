// Frontend/src/components/generateDescription/Knees/generateDescriptionKneeGapSurface.js
const zones = [
  { key: "leftMedial", side: "левого", part: "медиальном" },
  { key: "leftLateral", side: "левого", part: "латеральном" },
  { key: "rightMedial", side: "правого", part: "медиальном" },
  { key: "rightLateral", side: "правого", part: "латеральном" },
];

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
  hasEndoprosthesis = false,
  predominantlyByZone = {},
}) => {
  const perKnee = { left: {}, right: {} };
  let totalSelected = 0;

  zones.forEach(({ key, side, part }) => {
    const degree = selectedOptions[key]?.[0];
    if (!degree) return;
    const kneeKey = side === "левого" ? "left" : "right";
    perKnee[kneeKey][part] = { degree, predominantly: predominantlyByZone[key] || false };
    totalSelected++;
  });

  if (totalSelected === 0) return modeMaps[mode].uniformText + ".";

  const allUniform = Object.values(selectedOptions).every(
    opts =>
      opts.length === 1 &&
      (opts[0] === "равномерной высоты" || opts[0] === "поверхность гладкая")
  );
  if (allUniform) return modeMaps[mode].uniformText + ".";

  const descriptions = [];
  const usedParts = new Set();

  // ------------------- Эндопротез -------------------
  if (hasEndoprosthesis) {
    if (mode === "gaps") {
      const singleMap = modeMaps.gaps.single;
      ["медиальном", "латеральном"].forEach(part => {
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left.degree === right.degree) {
          const partText = part === "медиальном" ? "медиальных" : "латеральных";
          const predominantlyText = left.predominantly ? ", преимущественно" : "";
          descriptions.push(`${singleMap[left.degree]}${predominantlyText} в ${partText} отделах`);
          usedParts.add(part);
        }
      });
      ["медиальном", "латеральном"].forEach(part => {
        if (usedParts.has(part)) return;
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left.degree !== right.degree) {
          const predominantlyLeft = left.predominantly ? ", преимущественно" : "";
          const predominantlyRight = right.predominantly ? ", преимущественно" : "";
          descriptions.push(
            `${singleMap[right.degree]}${predominantlyRight} в ${part} отделе, ${singleMap[left.degree]}${predominantlyLeft} в ${part} отделе`
          );
          usedParts.add(part);
        }
      });
      ["left", "right"].forEach(knee => {
        const kneeParts = perKnee[knee];
        Object.keys(kneeParts)
          .filter(part => !usedParts.has(part))
          .forEach(part => {
            const predominantlyText = kneeParts[part].predominantly ? ", преимущественно" : "";
            descriptions.push(`${singleMap[kneeParts[part].degree]}${predominantlyText} в ${part} отделе`);
          });
      });
      return `${modeMaps.gaps.firstPhrase.single} ${descriptions.join(", ")}.`;
    }

    if (mode === "surfaces") {
      const pluralMap = modeMaps.surfaces.plural;
      ["медиальном", "латеральном"].forEach(part => {
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left.degree === right.degree) {
          const partText = part === "медиальном" ? "медиальных" : "латеральных";
          const predominantlyText = left.predominantly ? ", преимущественно" : "";
          descriptions.push(`${pluralMap[left.degree]}${predominantlyText} в ${partText} отделах`);
          usedParts.add(part);
        }
      });
      ["медиальном", "латеральном"].forEach(part => {
        if (usedParts.has(part)) return;
        const left = perKnee.left[part];
        const right = perKnee.right[part];
        if (left && right && left.degree !== right.degree) {
          const predominantlyLeft = left.predominantly ? ", преимущественно" : "";
          const predominantlyRight = right.predominantly ? ", преимущественно" : "";
          descriptions.push(
            `${pluralMap[right.degree]}${predominantlyRight} в ${part} отделе, ${pluralMap[left.degree]}${predominantlyLeft} в ${part} отделе`
          );
          usedParts.add(part);
        }
      });
      ["left", "right"].forEach(knee => {
        const kneeParts = perKnee[knee];
        Object.keys(kneeParts)
          .filter(part => !usedParts.has(part))
          .forEach(part => {
            const predominantlyText = kneeParts[part].predominantly ? ", преимущественно" : "";
            descriptions.push(`${pluralMap[kneeParts[part].degree]}${predominantlyText} в ${part} отделе`);
          });
      });
      return `${modeMaps.surfaces.firstPhrase.plural} ${descriptions.join(", ")}.`;
    }
  }

  // ------------------- Обычный случай -------------------
  if (mode === "gaps") {
    const singleMap = modeMaps.gaps.single;
    const pluralMap = modeMaps.gaps.plural;
    let usePlural = false;

    ["медиальном", "латеральном"].forEach(part => {
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left.degree === right.degree) {
        const partText = part === "медиальном" ? "медиальных" : "латеральных";
        const predominantlyText = left.predominantly ? ", преимущественно" : "";
        descriptions.push(`коленных суставов ${pluralMap[singleMap[left.degree]]}${predominantlyText} в ${partText} отделах`);
        usedParts.add(part);
        usePlural = true;
      }
    });
    ["медиальном", "латеральном"].forEach(part => {
      if (usedParts.has(part)) return;
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left.degree !== right.degree) {
        const predominantlyLeft = left.predominantly ? ", преимущественно" : "";
        const predominantlyRight = right.predominantly ? ", преимущественно" : "";
        descriptions.push(
          `правого коленного сустава ${singleMap[right.degree]}${predominantlyRight} в ${part} отделе, левого коленного сустава ${singleMap[left.degree]}${predominantlyLeft} в ${part} отделе`
        );
        usedParts.add(part);
      }
    });
    ["left", "right"].forEach(knee => {
      const kneeParts = perKnee[knee];
      const sideName = knee === "left" ? "левого" : "правого";
      Object.keys(kneeParts)
        .filter(part => !usedParts.has(part))
        .forEach(part => {
          const predominantlyText = kneeParts[part].predominantly ? ", преимущественно" : "";
          descriptions.push(`${sideName} коленного сустава ${singleMap[kneeParts[part].degree]}${predominantlyText} в ${part} отделе`);
        });
    });
    const firstPhrase = usePlural ? modeMaps.gaps.firstPhrase.plural : modeMaps.gaps.firstPhrase.single;
    return `${firstPhrase} ${descriptions.join(", ")}.`;
  }

  if (mode === "surfaces") {
    const pluralMap = modeMaps.surfaces.plural;

    ["медиальном", "латеральном"].forEach(part => {
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left.degree === right.degree) {
        const partText = part === "медиальном" ? "медиальных" : "латеральных";
        const predominantlyText = left.predominantly ? ", преимущественно" : "";
        descriptions.push(`коленных суставов ${pluralMap[left.degree]}${predominantlyText} в ${partText} отделах`);
        usedParts.add(part);
      }
    });
    ["медиальном", "латеральном"].forEach(part => {
      if (usedParts.has(part)) return;
      const left = perKnee.left[part];
      const right = perKnee.right[part];
      if (left && right && left.degree !== right.degree) {
        const predominantlyLeft = left.predominantly ? ", преимущественно" : "";
        const predominantlyRight = right.predominantly ? ", преимущественно" : "";
        descriptions.push(
          `правого коленного сустава ${pluralMap[right.degree]}${predominantlyRight} в ${part} отделе, левого коленного сустава ${pluralMap[left.degree]}${predominantlyLeft} в ${part} отделе`
        );
        usedParts.add(part);
      }
    });
    ["left", "right"].forEach(knee => {
      const kneeParts = perKnee[knee];
      const sideName = knee === "left" ? "левого" : "правого";
      Object.keys(kneeParts)
        .filter(part => !usedParts.has(part))
        .forEach(part => {
          const predominantlyText = kneeParts[part].predominantly ? ", преимущественно" : "";
          descriptions.push(`${sideName} коленного сустава ${pluralMap[kneeParts[part].degree]}${predominantlyText} в ${part} отделе`);
        });
    });
    return `${modeMaps.surfaces.firstPhrase.plural} ${descriptions.join(", ")}.`;
  }
};