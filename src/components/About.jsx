import { motion } from 'framer-motion';

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08 + 0.3,
      duration: 0.4,
    },
  }),
};

export default function About({ about, strengths = [], softSkills = [], labels = {} }) {
  const {
    title = 'Sobre mi',
    strengthsTitle = 'Fortalezas',
    softSkillsTitle = 'Soft skills',
  } = {
    title: labels.title,
    strengthsTitle: labels.strengths,
    softSkillsTitle: labels.softSkills,
  };

  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{title}</h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {about}
      </motion.p>
      {(strengths.length > 0 || softSkills.length > 0) && (
        <motion.div
          className="highlights-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {strengths.length > 0 && (
            <motion.div
              className="strengths-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h3>{strengthsTitle}</h3>
              <motion.ul
                className="strengths-list"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.3,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {strengths.map((strength, i) => (
                  <motion.li
                    key={strength}
                    custom={i}
                    variants={listItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {strength}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
          {softSkills.length > 0 && (
            <motion.div
              className="strengths-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h3>{softSkillsTitle}</h3>
              <motion.ul
                className="strengths-list"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.4,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {softSkills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    custom={i}
                    variants={listItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
}
