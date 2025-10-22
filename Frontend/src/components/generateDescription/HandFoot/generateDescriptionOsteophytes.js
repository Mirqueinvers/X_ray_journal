// src/components/generateDescription/generateDescriptionOsteophytes.js

export const generateDescriptionUniversalOsteophytes = ({ jointMap, selectedOptions, type = "foot" }) => {
  const names = { right: "правой", left: "левой" };

  // добавляем формы для родительного падежа (сустава)
  const jointGroups =
    type === "hand"
      ? {
          Mcp: { plural: "пястно-фаланговых суставов", single: "пястно-фаланговом суставе", single_gen: "пястно-фалангового сустава" },
          Pip: { plural: "проксимальных межфаланговых суставов", single: "проксимальном межфаланговом суставе", single_gen: "проксимального межфалангового сустава" },
          Dip: { plural: "дистальных межфаланговых суставов", single: "дистальном межфаланговом суставе", single_gen: "дистального межфалангового сустава" },
          Cmc: { plural: "пястно-запястных суставов", single: "пястно-запястном суставе", single_gen: "пястно-запястного сустава" },
          Wrist: { plural: "лучезапястных суставов", single: "лучезапястном суставе", single_gen: "лучезапястного сустава" },
          Ip: { plural: "межфаланговых суставов I пальца", single: "межфаланговом суставе I пальца", single_gen: "межфалангового сустава I пальца" },
        }
      : {
          Mtp: { plural: "плюснефаланговых суставов", single: "плюснефаланговом суставе", single_gen: "плюснефалангового сустава" },
          PIP: { plural: "проксимальных межфаланговых суставов", single: "проксимальном межфаланговом суставе", single_gen: "проксимального межфалангового сустава" },
          DIP: { plural: "дистальных межфаланговых суставов", single: "дистальном межфаланговом суставе", single_gen: "дистального межфалангового сустава" },
          Tmt: { plural: "предплюсне-плюсневых суставов", single: "предплюсне-плюсневом суставе", single_gen: "предплюсне-плюсневого сустава" },
          IP: { plural: "межфаланговых суставов I пальца", single: "межфаланговом суставе I пальца", single_gen: "межфалангового сустава I пальца" },
          Ankle: { plural: "голеностопных суставов", single: "голеностопном суставе", single_gen: "голеностопного сустава" },
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

  const jointGroupsBySide = {};

  Object.entries(selectedOptions).forEach(([key, joint]) => {
    if (!joint || !joint.остеофиты) return;

    const side = key.startsWith('right') ? 'right' : key.startsWith('left') ? 'left' : null;
    if (!side) return;

    const typeKey = Object.keys(jointGroups).find(t => key.includes(t));
    if (!typeKey) return;

    const jointInfo = jointMap.find(j => j.key === key);
    if (!jointInfo) return;

    jointGroupsBySide[side] = jointGroupsBySide[side] || {};
    jointGroupsBySide[side][typeKey] = jointGroupsBySide[side][typeKey] || [];
    jointGroupsBySide[side][typeKey].push(jointInfo.label);
  });

  const sideParts = [];

  Object.entries(jointGroupsBySide).forEach(([side, types]) => {
    const typeParts = [];

    Object.entries(types).forEach(([typeKey, labels]) => {
      const joint = jointGroups[typeKey];
      const fingers = compressFingers(labels);
      const limbSuffix = type === "hand" ? "кисти" : "стопы";

      if (labels.length === 1 || typeKey === "Ip" || typeKey === "IP") {
        // ✅ используем форму в родительном падеже (single_gen)
        if (typeKey === "Wrist" || typeKey === "Ankle") {
          typeParts.push(`${joint.single_gen} ${names[side]} ${limbSuffix}`);
        } else if (typeKey === "Ip" || typeKey === "IP") {
          // Для межфаланговых суставов I пальца не добавляем номер
          typeParts.push(`${joint.single_gen} ${names[side]} ${limbSuffix}`);
        } else {
          // Для остальных одиночных суставов добавляем номер пальца
          typeParts.push(`${joint.single_gen} ${labels[0]} пальца ${names[side]} ${limbSuffix}`);
        }
      } else {
        // Для нескольких суставов
        typeParts.push(`${fingers} ${joint.plural} ${names[side]} ${limbSuffix}`);
      }
    });

    if (typeParts.length) sideParts.push(typeParts.join(", "));
  });


  if (!sideParts.length)
    return "Краевые костные разрастания не выявлены.";

  return `Определяются краевые костные разрастания по боковым поверхностям ${sideParts.join("; ")}.`;
};
