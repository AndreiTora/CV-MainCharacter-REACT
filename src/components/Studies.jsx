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

export default function Studies({ studies = [], certificates = [], labels = {} }) {
  const issuedLabel = labels.issued ?? 'Expedicion';
  const localeKey = labels.title ?? 'studies';

  return (
    <motion.section
      className="profile-study-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{labels.title ?? 'Estudios y certificados'}</h2>
      {studies.map(({ degree, institution, location, period }, i) => (
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
          <p>
            {institution}
            {(location || period) && (
              <span className="study-meta">
                {' | '}
                {location}
                {location && period ? ' ' : ''}
                {period ? `(${period})` : ''}
              </span>
            )}
          </p>
        </motion.div>
      ))}
      <motion.div
        className="certificates-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <h3>{labels.certificates ?? 'Certificados / Cursos'}</h3>
        <motion.ul
          className="certificates-list"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {certificates.map((certificate, i) => {
            const {
              name,
              provider,
              issued,
            } = certificate ?? {};

            if (!name) {
              return null;
            }

            const metaParts = [];
            if (provider) {
              metaParts.push(provider);
            }
            if (issued) {
              metaParts.push(`${issuedLabel}: ${issued}`);
            }

            return (
            <motion.li
              key={`${localeKey}-${name}-${i}`}
              className="certificate-item"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.24, delay: i * 0.05 }}
            >
              <strong className="certificate-name">{name}</strong>
              {metaParts.length > 0 && (
                <p className="certificate-meta">
                  {metaParts.join(' | ')}
                </p>
              )}
            </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </motion.section>
  );
}
