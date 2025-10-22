export const generateDescriptionUniversalCongruence = ({ jointMap, selectedOptions, type = "foot", isNormal = false }) => {
  if (isNormal)
    return "Конгруэнтность суставных поверхностей не нарушена.";

  const sideNames = { right: "правой", left: "левой" };

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
        };

  const limbSuffix = type === "hand" ? "кисти" : "стопы";

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

  const grouped = {};

  // Группируем по стороне и типу
  Object.entries(selectedOptions).forEach(([key, joint]) => {
    if (!joint || !joint["конгруэнтность"]) return;

    const side = key.startsWith("right") ? "right" : key.startsWith("left") ? "left" : null;
    if (!side) return;

    const typeKey = Object.keys(jointGroups).find((t) => key.includes(t));
    if (!typeKey) return;

    const jointInfo = jointMap.find((j) => j.key === key);
    if (!jointInfo) return;

    grouped[side] = grouped[side] || {};
    grouped[side][typeKey] = grouped[side][typeKey] || [];
    grouped[side][typeKey].push(jointInfo.label); // теперь берем номер пальца
  });

  const parts = [];

  Object.entries(grouped).forEach(([side, types]) => {
    const typeParts = [];
    Object.entries(types).forEach(([typeKey, labels]) => {
      const joint = jointGroups[typeKey];

      if (labels.length === 1 || typeKey === "Ip" || typeKey === "IP") {
        const finger = labels[0];
        // Для одного сустава вставляем номер пальца
        typeParts.push(`${joint.single} ${finger} пальца ${sideNames[side]} ${limbSuffix}`);
      } else {
        // Для нескольких суставов — диапазоны
        const fingers = compressFingers(labels);
        typeParts.push(`${fingers} ${joint.plural} ${sideNames[side]} ${limbSuffix}`);
      }
    });
    if (typeParts.length) parts.push(typeParts.join(", "));
  });

  if (!parts.length) return "Нарушение конгруэнтности суставов не выявлено.";

  return `Нарушена конгруэнтность в ${parts.join("; ")}.`;
};
