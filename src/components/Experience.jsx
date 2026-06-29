import { motion } from 'framer-motion';
import { getTechChipClass } from '../utils/getTechChipClass';
import { getDurationFromPeriod } from '../utils/getDurationFromPeriod';
import { sortTechChipsByColor } from '../utils/sortTechChipsByColor';

export default function Experience({ experience = [] }) {
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
      <h2>Experiencia laboral</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {experience.map(({ title, company, period, summary, responsibilities, leadership, projects, technologies }) => {
        const duration = getDurationFromPeriod(period);

        return (
        <motion.div
          key={`${title}-${company}-${period}`}
          className="experience-item"
          variants={itemVariants}
        >
          <div className="experience-header">
            <strong className="experience-title">{title}</strong>
            <span className="experience-company"> · {company}</span>
          </div>
          <p className="experience-meta">{duration ? `${duration} · ` : ''}{period}</p>
          <p>{summary}</p>
          {projects && (
            <div className="experience-subsection">
              <strong>Proyectos destacados:</strong>
              <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
              </ul>
            </div>
          )}
          {responsibilities && (
            <div className="experience-subsection">
              <strong>Responsabilidades clave:</strong>
              <ul>
                {responsibilities.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {leadership && (
            <div className="experience-subsection">
              <strong>Liderazgo y gestión:</strong>
              <ul>
                {leadership.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
          {technologies && (
            <div className="experience-tech-section">
              <div className="experience-tech-grid">
                {sortTechChipsByColor(technologies.split('·').map(item => item.trim()).filter(Boolean)).map(name => (
                  <span key={name} className={`experience-tech-chip ${getTechChipClass(name)}`}>{name}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        );
      })}
      </motion.div>
    </motion.section>
  );
}
