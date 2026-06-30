import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { getTechChipClass } from '../utils/getTechChipClass';
import { sortTechChipsByColor } from '../utils/sortTechChipsByColor';

const DEFAULT_SKILL_LEVEL = 'Intermedio';
const MAX_LEVEL_SCORE = 3;

function getSkillData(skill) {
  if (typeof skill === 'string') {
    return { name: skill, level: DEFAULT_SKILL_LEVEL, score: 2 };
  }

  if (skill && typeof skill === 'object') {
    const rawScore = Number(skill.score);

    return {
      name: String(skill.name ?? skill.label ?? '').trim(),
      level: String(skill.level ?? DEFAULT_SKILL_LEVEL).trim(),
      score: Number.isFinite(rawScore) ? rawScore : null,
    };
  }

  return { name: '', level: DEFAULT_SKILL_LEVEL, score: 2 };
}

function normalizeLevel(level = '') {
  return level
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getLevelDotClass(level = '') {
  const normalizedLevel = normalizeLevel(level);

  if (/experto|avanzado|alto|senior/.test(normalizedLevel)) {
    return 'skill-level-dot-high';
  }

  if (/intermedio|medio/.test(normalizedLevel)) {
    return 'skill-level-dot-medium';
  }

  if (/basico|bajo|junior|inicial/.test(normalizedLevel)) {
    return 'skill-level-dot-low';
  }

  return 'skill-level-dot-unknown';
}

function getScoreFromLevel(level = '') {
  const normalizedLevel = normalizeLevel(level);

  if (/experto|avanzado|alto|senior/.test(normalizedLevel)) {
    return 3;
  }

  if (/intermedio|medio/.test(normalizedLevel)) {
    return 2;
  }

  if (/basico|bajo|junior|inicial/.test(normalizedLevel)) {
    return 1;
  }

  return 2;
}

function clampScore(score) {
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) {
    return 2;
  }

  return Math.max(1, Math.min(MAX_LEVEL_SCORE, Math.round(numericScore)));
}

function getDotClassFromScore(score) {
  if (score >= 3) {
    return 'skill-level-dot-high';
  }

  if (score >= 2) {
    return 'skill-level-dot-medium';
  }

  return 'skill-level-dot-low';
}

export default function Skills({ skills = [] }) {
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.5,
      },
    }),
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.section
      className="profile-skills-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Tecnologías</h2>
      <motion.div
        className="skills-group-grid"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skills.map(({ category, items }, i) => (
          <Fragment key={category}>
            <motion.article
              className="skills-group-card"
              custom={i}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="skills-group-title">{category}:</h3>
              <motion.div
                className="skills-group-chips"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {sortTechChipsByColor(items).map((skill, j) => {
                  const { name, level, score } = getSkillData(skill);
                  const finalScore = clampScore(score ?? getScoreFromLevel(level));
                  const dotClass = getDotClassFromScore(finalScore);

                  return (
                    <motion.span
                      key={`${name}-${j}`}
                      className={`experience-tech-chip ${getTechChipClass(name)}`}
                      data-tooltip-id="skills-level-tooltip"
                      data-level={String(finalScore)}
                      data-level-label={level}
                      data-level-dot-class={dotClass}
                      custom={j}
                      variants={chipVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {name}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.article>
          </Fragment>
        ))}
        <Tooltip
          id="skills-level-tooltip"
          className="skills-level-tooltip"
          place="top"
          render={({ activeAnchor }) => {
            const score = clampScore(activeAnchor?.getAttribute('data-level'));
            const levelLabel = activeAnchor?.getAttribute('data-level-label') ?? DEFAULT_SKILL_LEVEL;
            const dotClass = activeAnchor?.getAttribute('data-level-dot-class') ?? getLevelDotClass(levelLabel);

            return (
              <span className="skill-level-tooltip-content">
                <span className={`skill-level-dot ${dotClass}`} />
                <span>{`Nivel ${score}/${MAX_LEVEL_SCORE} (${levelLabel})`}</span>
              </span>
            );
          }}
        />
      </motion.div>
    </motion.section>
  );
}
