import { motion } from 'framer-motion';

export default function ProfileHeader({ name, title, resumeUrl, downloadCvLabel = 'Download CV' }) {
  return (
    <motion.div
      className="profile-header"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {name}
      </motion.h1>
      <motion.p
        className="profile-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {title}
      </motion.p>
      {resumeUrl && (
        <motion.a
          className="profile-download-cv"
          href={resumeUrl}
          download
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          {downloadCvLabel}
        </motion.a>
      )}
    </motion.div>
  );
}
