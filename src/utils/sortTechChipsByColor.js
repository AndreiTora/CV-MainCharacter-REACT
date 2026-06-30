import { getTechChipClass } from './getTechChipClass';

const colorPriority = {
  'tech-chip-backend': 1,
  'tech-chip-frontend': 2,
  'tech-chip-db': 3,
  'tech-chip-devops': 4,
  'tech-chip-platform': 5,
  'tech-chip-default': 6,
};

function getSkillName(skill) {
  if (typeof skill === 'string') {
    return skill;
  }

  if (skill && typeof skill === 'object') {
    return String(skill.name ?? skill.label ?? '').trim();
  }

  return '';
}

export function sortTechChipsByColor(names = []) {
  return [...names].sort((a, b) => {
    const nameA = getSkillName(a);
    const nameB = getSkillName(b);
    const classA = getTechChipClass(nameA);
    const classB = getTechChipClass(nameB);
    const orderA = colorPriority[classA] ?? Number.MAX_SAFE_INTEGER;
    const orderB = colorPriority[classB] ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
  });
}