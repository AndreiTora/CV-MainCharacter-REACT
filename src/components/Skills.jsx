import { motion } from 'framer-motion';
import { getTechChipClass } from '../utils/getTechChipClass';
import { sortTechChipsByColor } from '../utils/sortTechChipsByColor';

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
          <motion.article
            key={category}
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
              {sortTechChipsByColor(items).map((name, j) => (
                <motion.span
                  key={name}
                  className={`experience-tech-chip ${getTechChipClass(name)}`}
                  custom={j}
                  variants={chipVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
