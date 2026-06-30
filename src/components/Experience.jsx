import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { getTechChipClass } from '../utils/getTechChipClass';
import { getDurationFromPeriod } from '../utils/getDurationFromPeriod';
import { sortTechChipsByColor } from '../utils/sortTechChipsByColor';

const DEFAULT_SKILL_LEVEL = 'Intermedio';
const MAX_LEVEL_SCORE = 3;

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getScoreFromLevel(level = '') {
  const normalizedLevel = normalizeText(level);

  if (/experto|avanzado|alto|senior|expert|advanced|high/.test(normalizedLevel)) {
    return 3;
  }

  if (/intermedio|medio|intermediate|medium/.test(normalizedLevel)) {
    return 2;
  }

  if (/basico|bajo|junior|inicial|basic|entry/.test(normalizedLevel)) {
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

function getSkillName(skill) {
  if (typeof skill === 'string') {
    return skill;
  }

  if (skill && typeof skill === 'object') {
    return String(skill.name ?? skill.label ?? '').trim();
  }

  return '';
}

function buildSkillLevelMap(skills = [], defaultSkillLevel = DEFAULT_SKILL_LEVEL) {
  const levelMap = new Map();

  skills.forEach(({ items = [] }) => {
    items.forEach((skill) => {
      const name = getSkillName(skill);
      if (!name) return;

      const level = typeof skill === 'object' && skill !== null
        ? String(skill.level ?? defaultSkillLevel).trim()
        : defaultSkillLevel;
      const rawScore = typeof skill === 'object' && skill !== null ? Number(skill.score) : NaN;
      const score = Number.isFinite(rawScore) ? clampScore(rawScore) : clampScore(getScoreFromLevel(level));

      levelMap.set(normalizeText(name), { level, score });
    });
  });

  return levelMap;
}

export default function Experience({ experience = [], skills = [], labels = {}, language = 'es' }) {
  const defaultSkillLevel = labels.defaultLevel ?? DEFAULT_SKILL_LEVEL;
  const skillLevelMap = buildSkillLevelMap(skills, defaultSkillLevel);

  const resolveSkillLevel = (techName) => {
    return skillLevelMap.get(normalizeText(techName)) ?? { level: defaultSkillLevel, score: 2 };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="card experience-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{labels.title ?? 'Experiencia laboral'}</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experience.map(({ title, company, period, summary, responsibilities, leadership, projects, technologies }) => {
        const duration = getDurationFromPeriod(period, language);

        return (
        <motion.div
          key={`${title}-${company}-${period}`}
          className="experience-item"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="experience-header">
            <strong className="experience-title">{title}</strong>
            <span className="experience-company"> · {company}</span>
          </div>
          <p className="experience-meta">{duration ? `${duration} · ` : ''}{period}</p>
          <p>{summary}</p>
          {projects && (
            <div className="experience-subsection">
              <strong>{labels.projects ?? 'Proyectos destacados:'}</strong>
              <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
              </ul>
            </div>
          )}
          {responsibilities && (
            <div className="experience-subsection">
              <strong>{labels.responsibilities ?? 'Responsabilidades clave:'}</strong>
              <ul>
                {responsibilities.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {leadership && (
            <div className="experience-subsection">
              <strong>{labels.leadership ?? 'Liderazgo y gestion:'}</strong>
              <ul>
                {leadership.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {technologies && (
            <div className="experience-tech-section">
              <div className="experience-tech-grid">
                {sortTechChipsByColor(
                  technologies.split('·').map(item => item.trim()).filter(Boolean),
                  (name) => resolveSkillLevel(name).score,
                ).map(name => {
                  const { level, score } = resolveSkillLevel(name);
                  const dotClass = getDotClassFromScore(score);

                  return (
                    <span
                      key={name}
                      className={`experience-tech-chip ${getTechChipClass(name)}`}
                      data-tooltip-id="experience-level-tooltip"
                      data-level={String(score)}
                      data-level-label={level}
                      data-level-dot-class={dotClass}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
        );
      })}
      </motion.div>
      <Tooltip
        id="experience-level-tooltip"
        className="skills-level-tooltip"
        place="top"
        render={({ activeAnchor }) => {
          const score = clampScore(activeAnchor?.getAttribute('data-level'));
          const levelLabel = activeAnchor?.getAttribute('data-level-label') ?? defaultSkillLevel;
          const dotClass = activeAnchor?.getAttribute('data-level-dot-class') ?? getDotClassFromScore(score);
          const levelWord = labels.level ?? 'Nivel';

          return (
            <span className="skill-level-tooltip-content">
              <span className={`skill-level-dot ${dotClass}`} />
              <span>{`${levelWord} ${score}/${MAX_LEVEL_SCORE} (${levelLabel})`}</span>
            </span>
          );
        }}
      />
    </motion.section>
  );
}
