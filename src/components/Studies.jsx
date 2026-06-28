import { motion } from 'framer-motion';

const itemVariants = {
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

export default function Studies({ studies = [], certificates = [] }) {
  return (
    <motion.section
      className="profile-study-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Estudios y certificados</h2>
      {studies.map(({ degree, institution }, i) => (
        <motion.div
          key={`${degree}-${institution}`}
          className="study-item"
          custom={i}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <strong>{degree}</strong>
          <p>{institution}</p>
        </motion.div>
      ))}
      <motion.div
        className="certificates-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3>Certificados / Cursos</h3>
        <motion.ul
          className="certificates-list"
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
          {certificates.map(({ name }, i) => (
            <motion.li
              key={name}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
              }}
            >
              {name}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.section>
  );
}
