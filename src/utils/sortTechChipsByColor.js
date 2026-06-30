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

function getSkillScore(skill, resolveScore) {
  if (typeof resolveScore === 'function') {
    const resolvedScore = Number(resolveScore(skill));

    if (Number.isFinite(resolvedScore)) {
      return resolvedScore;
    }
  }

  if (skill && typeof skill === 'object') {
    const rawScore = Number(skill.score);

    if (Number.isFinite(rawScore)) {
      return rawScore;
    }
  }

  return null;
}

export function sortTechChipsByColor(names = [], resolveScore) {
  return [...names].sort((a, b) => {
    const nameA = getSkillName(a);
    const nameB = getSkillName(b);
    const scoreA = getSkillScore(a, resolveScore);
    const scoreB = getSkillScore(b, resolveScore);
    const classA = getTechChipClass(nameA);
    const classB = getTechChipClass(nameB);
    const orderA = colorPriority[classA] ?? Number.MAX_SAFE_INTEGER;
    const orderB = colorPriority[classB] ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    if (scoreA !== scoreB) {
      if (scoreA === null) return 1;
      if (scoreB === null) return -1;

      return scoreB - scoreA;
    }

    return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
  });
}