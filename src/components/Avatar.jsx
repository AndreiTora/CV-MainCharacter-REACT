import { motion } from 'framer-motion';

export default function Avatar({ avatarLabel }) {
  return (
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
      <div className="avatar">
        <svg viewBox="0 0 16 16" className="pixel-avatar" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={avatarLabel}>
          <rect width="16" height="16" fill="transparent" />
          <rect x="3" y="0" width="10" height="2" fill="#6b4226" />
          <rect x="2" y="2" width="12" height="2" fill="#6b4226" />
          <rect x="1" y="4" width="14" height="3" fill="#6b4226" />
          <rect x="0" y="7" width="2" height="6" fill="#6b4226" />
          <rect x="14" y="7" width="2" height="6" fill="#6b4226" />
          <rect x="2" y="9" width="12" height="4" fill="#6b4226" />
          <rect x="4" y="4" width="8" height="5" fill="#f6c59f" />
          <rect x="5" y="6" width="1" height="1" fill="#000" />
          <rect x="10" y="6" width="1" height="1" fill="#000" />
          <rect x="5" y="7" width="1" height="1" fill="#e6b49a" />
          <rect x="10" y="7" width="1" height="1" fill="#e6b49a" />
          <rect x="7" y="8" width="2" height="1" fill="#d7a07c" />
          <rect x="3" y="11" width="10" height="5" fill="#4b8a6a" />
          <rect x="4" y="10" width="8" height="1" fill="#3a6f58" />
          <rect x="2" y="4" width="1" height="5" fill="#6b4226" />
          <rect x="13" y="4" width="1" height="5" fill="#6b4226" />
        </svg>
      </div>
    </motion.div>
  );
}
