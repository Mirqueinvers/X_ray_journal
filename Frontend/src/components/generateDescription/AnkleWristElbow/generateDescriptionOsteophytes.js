export const generateDescriptionOsteophytes = ({
  type = "ankle", // "ankle" | "elbow" | "wrist"
  selectedAreas, // { rightLateral, rightMedial, leftLateral, leftMedial }
}) => {
  const { rightLateral, rightMedial, leftLateral, leftMedial } = selectedAreas;

  // Названия суставов
  const jointNames = {
    ankle: { singular: "голеностопного сустава", plural: "голеностопных суставов" },
    elbow: { singular: "локтевого сустава", plural: "локтевых суставов" },
    wrist: { singular: "луче-запястного сустава", plural: "луче-запястных суставов" },
  }[type];

  // 1️⃣ Если ничего не выбрано
  if (!rightLateral && !rightMedial && !leftLateral && !leftMedial) {
    return "Краевые костные разрастания не выявлены.";
  }

  // 2️⃣ Проверяем объединённые поверхности на обоих суставах
  const combinedParts = [];
  if (rightLateral && leftLateral) combinedParts.push(`на латеральных поверхностях ${jointNames.plural}`);
  if (rightMedial && leftMedial) combinedParts.push(`на медиальных поверхностях ${jointNames.plural}`);

  // 3️⃣ Отдельные поверхности, которые не объединены
  const separateParts = [];
  if (rightLateral && !leftLateral) separateParts.push(`на латеральной поверхности правого ${jointNames.singular}`);
  if (!rightLateral && leftLateral) separateParts.push(`на латеральной поверхности левого ${jointNames.singular}`);
  if (rightMedial && !leftMedial) separateParts.push(`на медиальной поверхности правого ${jointNames.singular}`);
  if (!rightMedial && leftMedial) separateParts.push(`на медиальной поверхности левого ${jointNames.singular}`);

  // 4️⃣ Объединяем всё в одно предложение
  const allParts = [...combinedParts, ...separateParts];

  if (allParts.length === 1) return `Определяются краевые костные разрастания ${allParts[0]}.`;

  const last = allParts.pop();
  return `Определяются краевые костные разрастания ${allParts.join(" и ")} и ${last}.`;
};
