// src/components/generateDescription/generateDescriptionUniversalSurfaces.js

export const generateDescriptionUniversalSurfaces = ({ jointMap, selectedOptions, type = "foot" }) => {
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

  // Склеиваем пальцы в диапазоны (II–IV)
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

  // Особое описание для голеностопного / лучезапястного сустава
  degreeOrder.forEach((deg) => {
    const sides = degreeGroups[deg];
    if (!sides) return;
    Object.entries(sides).forEach(([side, types]) => {
      if (types[specialJoint]) {
        specialParts.push(
          `суставные поверхности ${namesGenitive[side]} ${specialJoint === "Wrist" ? "лучезапястного" : "голеностопного"} сустава ${deg} склерозированы`
        );
        delete types[specialJoint];
      }
    });
  });

  const degreeParts = [];

  degreeOrder.forEach((deg) => {
    const sides = degreeGroups[deg];
    if (!sides) return;

    Object.entries(sides).forEach(([side, types]) => {
      Object.entries(types).forEach(([typeKey, labels]) => {
        if (!labels.length) return;
        const fingers = compressFingers(labels);
        const jointName = labels.length > 1 ? jointGroups[typeKey].plural : jointGroups[typeKey].single;
        const sideName = names[side];
        const limbSuffix = type === "hand" ? "кисти" : "стопы";

        degreeParts.push(`${deg} склерозированы в ${fingers} ${jointName} ${sideName} ${limbSuffix}`.trim());
      });
    });
  });

  const parts = [];
  if (specialParts.length)
    parts.push(specialParts.map((s, i) => (i === 0 ? s[0].toUpperCase() + s.slice(1) : s)).join(", ") + ".");
  if (degreeParts.length) parts.push("Суставные поверхности " + degreeParts.join("; ") + ".");

  if (!parts.length)
    return type === "hand"
      ? "Суставные поверхности кистей рук ровные, без деформации."
      : "Суставные поверхности стоп ровные, без деформации.";

  return parts.join(" ");
};
