import { getTechChipClass } from './getTechChipClass';

const colorPriority = {
  'tech-chip-backend': 1,
  'tech-chip-frontend': 2,
  'tech-chip-db': 3,
  'tech-chip-devops': 4,
  'tech-chip-platform': 5,
  'tech-chip-default': 6,
};

export function sortTechChipsByColor(names = []) {
  return [...names].sort((a, b) => {
    const classA = getTechChipClass(a);
    const classB = getTechChipClass(b);
    const orderA = colorPriority[classA] ?? Number.MAX_SAFE_INTEGER;
    const orderB = colorPriority[classB] ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return String(a).localeCompare(String(b), 'es', { sensitivity: 'base' });
  });
}