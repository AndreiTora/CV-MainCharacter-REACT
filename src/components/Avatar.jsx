import { useState } from 'react';
import { motion } from 'framer-motion';

const hairColors = [
  '#6b4226',
  '#8b5e34',
  '#4b2f1a',
  '#a86f44',
  '#5a3a22',
  '#7f4b2a',
  '#c08a5a',
  '#3e2818',
];

function getRandomHairColor(currentColor) {
  const availableColors = hairColors.filter((color) => color !== currentColor);
  const nextColors = availableColors.length > 0 ? availableColors : hairColors;
  return nextColors[Math.floor(Math.random() * nextColors.length)];
}

export default function Avatar({ avatarLabel }) {
  const [hairColor, setHairColor] = useState('#6b4226');

  function handleAvatarClick() {
    setHairColor((currentColor) => getRandomHairColor(currentColor));
  }

  return (
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
      <div className="avatar-wrap">
        <button
          type="button"
          className="avatar-button"
          onClick={handleAvatarClick}
          aria-label="Cambiar color del pelo"
          title="Cambiar color del pelo"
        >
          <div className="avatar">
            <svg viewBox="0 0 16 16" className="pixel-avatar" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={avatarLabel}>
              <rect width="16" height="16" fill="transparent" />
              <rect x="3" y="0" width="10" height="2" fill={hairColor} />
              <rect x="2" y="2" width="12" height="2" fill={hairColor} />
              <rect x="1" y="4" width="14" height="3" fill={hairColor} />
              <rect x="0" y="7" width="2" height="6" fill={hairColor} />
              <rect x="14" y="7" width="2" height="6" fill={hairColor} />
              <rect x="2" y="9" width="12" height="4" fill={hairColor} />
              <rect x="4" y="4" width="8" height="5" fill="#f6c59f" />
              <rect x="5" y="6" width="1" height="1" fill="#000" />
              <rect x="10" y="6" width="1" height="1" fill="#000" />
              <rect x="5" y="7" width="1" height="1" fill="#e6b49a" />
              <rect x="10" y="7" width="1" height="1" fill="#e6b49a" />
              <rect x="7" y="8" width="2" height="1" fill="#d7a07c" />
              <rect x="3" y="11" width="10" height="5" fill="#4b8a6a" />
              <rect x="4" y="10" width="8" height="1" fill="#3a6f58" />
              <rect x="2" y="4" width="1" height="5" fill={hairColor} />
              <rect x="13" y="4" width="1" height="5" fill={hairColor} />
            </svg>
          </div>
        </button>
        <div className="avatar-bubble" aria-hidden="true">
          <span className="avatar-bubble-text">¡toca mi pelo!</span>
        </div>
      </div>
    </motion.div>
  );
}
