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

const shirtColors = [
  { base: '#4b8a6a', shadow: '#3a6f58' },
  { base: '#4d79b8', shadow: '#3a5f92' },
  { base: '#b86c4d', shadow: '#91533a' },
  { base: '#8a62b8', shadow: '#6c4d92' },
  { base: '#b89a4d', shadow: '#927a3a' },
  { base: '#5f9e5b', shadow: '#4a7d47' },
];

function getRandomHairColor(currentColor) {
  const availableColors = hairColors.filter((color) => color !== currentColor);
  const nextColors = availableColors.length > 0 ? availableColors : hairColors;
  return nextColors[Math.floor(Math.random() * nextColors.length)];
}

function getRandomShirtColor(currentColor) {
  const availableColors = shirtColors.filter((color) => color.base !== currentColor.base || color.shadow !== currentColor.shadow);
  const nextColors = availableColors.length > 0 ? availableColors : shirtColors;
  return nextColors[Math.floor(Math.random() * nextColors.length)];
}

export default function Avatar({ avatarLabel }) {
  const [hairColor, setHairColor] = useState('#6b4226');
  const [shirtColor, setShirtColor] = useState(shirtColors[0]);

  function handleHairClick() {
    setHairColor((currentColor) => getRandomHairColor(currentColor));
  }

  function handleShirtClick() {
    setShirtColor((currentColor) => getRandomShirtColor(currentColor));
  }

  function handleShirtAreaClick(event) {
    event.stopPropagation();
    handleShirtClick();
  }

  return (
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
      <div className="avatar-wrap">
        <button
          type="button"
          className="avatar-button"
          onClick={handleHairClick}
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
              <g onClick={handleShirtAreaClick}>
                <title>Cambiar color de la camiseta</title>
                <rect x="3" y="11" width="10" height="5" fill={shirtColor.base} />
                <rect x="4" y="10" width="8" height="1" fill={shirtColor.shadow} />
              </g>
              <rect x="2" y="4" width="1" height="5" fill={hairColor} />
              <rect x="13" y="4" width="1" height="5" fill={hairColor} />
            </svg>
          </div>
        </button>
        <div className="avatar-bubble avatar-bubble-left" aria-hidden="true">
          <span className="avatar-bubble-text">¡Toca mi pelo!</span>
        </div>
        <div className="avatar-bubble avatar-bubble-right" aria-hidden="true">
          <span className="avatar-bubble-text">¡O mi camiseta!</span>
        </div>
      </div>
    </motion.div>
  );
}
