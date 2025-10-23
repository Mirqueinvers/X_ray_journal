export const generateDescriptionUniversalCombined = ({
  jointMap,
  selectedOptions,
  type = "foot",
  mode = "gaps", // "gaps" — суставные щели, "surfaces" — суставные поверхности
}) => {
  const namesGenitive = { right: "правой", left: "левой" };
  const names = { right: "правой", left: "левой" };

  const jointGroups =
    type === "hand"
      ? {
          Mcp: { plural: "пястно-фаланговых суставах", single: "пястно-фаланговом суставе" },
          Pip: { plural: "проксимальных межфаланговых суставах", single: "проксимальном межфаланговом суставе" },
          Dip: { plural: "дистальных межфаланговых суставах", single: "дистальном межфаланговом суставе" },
          Cmc: { plural: "пястно-запястных суставах", single: "пястно-запястном суставе" },
          Wrist: { plural: "лучезапястных суставах", single: "лучезапястном суставе" },
          Ip: { plural: "межфаланговых суставах I пальца", single: "межфаланговом суставе I пальца" },
        }
      : {
          Mtp: { plural: "плюснефаланговых суставах", single: "плюснефаланговом суставе" },
          PIP: { plural: "проксимальных межфаланговых суставах", single: "проксимальном межфаланговом суставе" },
          DIP: { plural: "дистальных межфаланговых суставах", single: "дистальном межфаланговом суставе" },
          Tmt: { plural: "предплюсне-плюсневых суставах", single: "предплюсне-плюсневом суставе" },
          IP: { plural: "межфаланговых суставах I пальца", single: "межфаланговом суставе I пальца" },
          Ankle: { plural: "голеностопных суставах", single: "голеностопном суставе" },
        };

  const romanToNum = { I: 1, II: 2, III: 3, IV: 4, V: 5 };
  const numToRoman = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };

  const compressFingers = (labels) => {
    const nums = labels.map((l) => romanToNum[l]).filter(Boolean).sort((a, b) => a - b);
    if (!nums.length) return "";
    const ranges = [];
    let start = nums[0],
      end = nums[0];
    for (let i = 1; i <= nums.length; i++) {
      if (nums[i] === end + 1) end = nums[i];
      else {
        ranges.push(start === end ? numToRoman[start] : `${numToRoman[start]}–${numToRoman[end]}`);
        start = nums[i];
        end = nums[i];
      }
    }
    return ranges.join(", ");
  };

  const degreeGroups = {};
  ["right", "left"].forEach((side) => {
    jointMap
      .filter((j) => j.key.startsWith(side))
      .forEach((j) => {
        const joint = selectedOptions[j.key];
        if (!joint) return;

        const typeKey = Object.keys(jointGroups).find((t) => j.key.includes(t));
        if (!typeKey) return;

        const label = j.label;
        Object.entries(joint).forEach(([degree, checked]) => {
          if (!checked) return;
          const deg = degree.toLowerCase();
          degreeGroups[deg] = degreeGroups[deg] || {};
          degreeGroups[deg][side] = degreeGroups[deg][side] || {};
          degreeGroups[deg][side][typeKey] = degreeGroups[deg][side][typeKey] || [];
          degreeGroups[deg][side][typeKey].push(label);
        });
      });
  });

  const specialJoint = type === "hand" ? "Wrist" : "Ankle";
  const specialParts = [];
  const degreeOrder = ["незначительно", "умеренно", "выраженно"];

  degreeOrder.forEach((deg) => {
    const sides = degreeGroups[deg];
    if (!sides) return;
    Object.entries(sides).forEach(([side, types]) => {
      if (types[specialJoint]) {
        specialParts.push(
          mode === "gaps"
            ? `суставная щель ${namesGenitive[side]} ${specialJoint === "Wrist" ? "лучезапястного" : "голеностопного"} сустава ${deg} сужена`
            : `суставные поверхности ${namesGenitive[side]} ${specialJoint === "Wrist" ? "лучезапястного" : "голеностопного"} сустава ${deg} склерозированы`
        );
        delete types[specialJoint];
      }
    });
  });

  const degreeParts = [];

  // ✅ Новый блок — проверка симметрии (всегда во множественном числе)
  degreeOrder.forEach((deg) => {
    const sides = degreeGroups[deg];
    if (!sides || !sides.right || !sides.left) return;

    const rightTypes = sides.right;
    const leftTypes = sides.left;

    Object.keys(rightTypes).forEach((typeKey) => {
      const rightLabels = (rightTypes[typeKey] || []).sort();
      const leftLabels = (leftTypes[typeKey] || []).sort();

      if (JSON.stringify(rightLabels) === JSON.stringify(leftLabels) && rightLabels.length) {
        // ✅ Симметричные суставы
        const jointName = jointGroups[typeKey].plural; // всегда множественное
        const limbSuffix = type === "hand" ? "кистей" : "стоп";

        const fingers = compressFingers(rightLabels);
        const fingerText =
          rightLabels.length === 1
            ? `${rightLabels[0]} пальцев `
            : `${fingers} пальцев `;

        const actionText =
          mode === "gaps"
            ? `${deg} сужены в`
            : `${deg} склерозированы в`;

        degreeParts.push(`${actionText} ${jointName} ${fingerText}${limbSuffix}`.trim());

        // удаляем, чтобы не дублировалось в обычной логике
        delete sides.right[typeKey];
        delete sides.left[typeKey];
      }
    });
  });

  // ⚙️ Прежняя логика (без изменений)
  degreeOrder.forEach((deg) => {
    const sides = degreeGroups[deg];
    if (!sides) return;

    Object.entries(sides).forEach(([side, types]) => {
      Object.entries(types).forEach(([typeKey, labels]) => {
        if (!labels.length) return;

        const jointName = labels.length > 1 ? jointGroups[typeKey].plural : jointGroups[typeKey].single;
        const sideName = names[side];
        const limbSuffix = type === "hand" ? "кисти" : "стопы";

        let fingerText = "";
        if (labels.length === 1) {
          if (typeKey === "Ip" || typeKey === "IP" || typeKey === specialJoint) {
            fingerText = "";
          } else {
            fingerText = `${labels[0]} пальца `;
          }
        } else {
          const fingers = compressFingers(labels);
          fingerText = `${fingers} пальцев `;
        }

        const actionText =
          mode === "gaps"
            ? `${deg} сужены в`
            : `${deg} склерозированы в`;

        degreeParts.push(`${actionText} ${jointName} ${fingerText}${sideName} ${limbSuffix}`.trim());
      });
    });
  });

  const parts = [];
  if (specialParts.length)
    parts.push(
      specialParts.map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s)).join(", ") + "."
    );
  if (degreeParts.length)
    parts.push(
      mode === "gaps"
        ? "Суставные щели " + degreeParts.join("; ") + "."
        : "Суставные поверхности " + degreeParts.join("; ") + "."
    );

  if (!parts.length)
    return mode === "gaps"
      ? type === "hand"
        ? "Суставные щели кистей рук равномерной высоты."
        : "Суставные щели стоп равномерной высоты."
      : type === "hand"
      ? "Суставные поверхности кистей рук ровные, без деформации."
      : "Суставные поверхности стоп ровные, без деформации.";

  return parts.join(" ");
};
