/**
 * Объединяет список позвонков в диапазоны: ["C1","C2","C3"] -> "C1-C3"
 * Позвонки должны идти в одном порядке (например, общий список vertebrae).
 */
export function buildSegments(vertebraeList, allOrdered) {
  if (!Array.isArray(vertebraeList) || vertebraeList.length === 0) return [];
  const orderIndex = new Map(allOrdered.map((v, i) => [v, i]));

  const sorted = vertebraeList
    .slice()
    .sort((a, b) => (orderIndex.get(a) ?? 0) - (orderIndex.get(b) ?? 0));

  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const curr = sorted[i];
    const prevIdx = orderIndex.get(prev) ?? 0;
    const currIdx = orderIndex.get(curr) ?? 0;
    if (currIdx === prevIdx + 1) {
      prev = curr;
    } else {
      ranges.push(start === prev ? start : `${start}-${prev}`);
      start = curr;
      prev = curr;
    }
  }
  ranges.push(start === prev ? start : `${start}-${prev}`);
  return ranges;
}

/** Соединяет массив строк через запятую и "и" */
export function joinWithAnd(arr) {
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(", ") + " и " + arr[arr.length - 1];
}