import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import profileEs from "./data/profile.json";
import profileEn from "./data/profile.en.json";

import Avatar from './components/Avatar';
import ProfileHeader from './components/ProfileHeader';
import ContactList from './components/ContactList';
import About from './components/About';
import Skills from './components/Skills';
import Studies from './components/Studies';
import Experience from './components/Experience';

export default function App() {
  const [isReadableFont, setIsReadableFont] = useState(false);
  const [language, setLanguage] = useState('es');

  const uiCopy = {
    es: {
      panelTitle: 'Character Menu',
      switchLanguage: 'English',
      switchLanguageTitle: 'Cambiar idioma a ingles',
      fontToggleTitle: 'Cambiar fuente para mejor legibilidad',
      readableFontLabel: 'Fuente accesible',
      originalFontLabel: 'Fuente original',
      about: {
        title: 'Sobre mi',
        strengths: 'Fortalezas',
        softSkills: 'Soft skills',
      },
      skills: {
        title: 'Tecnologias',
        level: 'Nivel',
        defaultLevel: 'Intermedio',
      },
      studies: {
        title: 'Estudios y certificados',
        certificates: 'Certificados / Cursos',
      },
      experience: {
        title: 'Experiencia laboral',
        projects: 'Proyectos destacados:',
        responsibilities: 'Responsabilidades clave:',
        leadership: 'Liderazgo y gestion:',
        level: 'Nivel',
        defaultLevel: 'Intermedio',
      },
      avatar: {
        hairAriaLabel: 'Cambiar color del pelo',
        hairTitle: 'Cambiar color del pelo',
        shirtTitle: 'Cambiar color de la camiseta',
        bubbleHair: 'Toca mi pelo!',
        bubbleShirt: 'O mi camiseta!',
      },
    },
    en: {
      panelTitle: 'Character Menu',
      switchLanguage: 'Espanol',
      switchLanguageTitle: 'Switch language to Spanish',
      fontToggleTitle: 'Switch to a more readable font',
      readableFontLabel: 'Readable font',
      originalFontLabel: 'Original font',
      about: {
        title: 'About me',
        strengths: 'Strengths',
        softSkills: 'Soft skills',
      },
      skills: {
        title: 'Technologies',
        level: 'Level',
        defaultLevel: 'Intermediate',
      },
      studies: {
        title: 'Education and certificates',
        certificates: 'Certificates / Courses',
      },
      experience: {
        title: 'Work experience',
        projects: 'Featured projects:',
        responsibilities: 'Key responsibilities:',
        leadership: 'Leadership and management:',
        level: 'Level',
        defaultLevel: 'Intermediate',
      },
      avatar: {
        hairAriaLabel: 'Change hair color',
        hairTitle: 'Change hair color',
        shirtTitle: 'Change shirt color',
        bubbleHair: 'Tap my hair!',
        bubbleShirt: 'Or my shirt!',
      },
    },
  };

  const profile = language === 'en' ? profileEn : profileEs;
  const uiText = uiCopy[language];
  const { name, title, location, email, linkedin, github, skills, studies, certificates, experience, avatarLabel, about, strengths, softSkills } = profile;

  useEffect(() => {
    const savedPreference = localStorage.getItem('readable-font-enabled') === 'true';
    setIsReadableFont(savedPreference);
    const savedLanguage = localStorage.getItem('cv-language');

    if (savedLanguage === 'es' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('readable-font-enabled', isReadableFont);
    localStorage.setItem('readable-font-enabled', String(isReadableFont));
  }, [isReadableFont]);

  useEffect(() => {
    localStorage.setItem('cv-language', language);
  }, [language]);

  return (
    <div className="page">
      <div className="top-controls">
        <button
          type="button"
          className={`font-toggle ${isReadableFont ? 'font-toggle-preview-original' : 'font-toggle-preview-readable'}`}
          onClick={() => setIsReadableFont((current) => !current)}
          aria-pressed={isReadableFont}
          title={uiText.fontToggleTitle}
        >
          {isReadableFont ? uiText.originalFontLabel : uiText.readableFontLabel}
        </button>
        <button
          type="button"
          className="language-toggle"
          onClick={() => setLanguage((currentLanguage) => (currentLanguage === 'es' ? 'en' : 'es'))}
          title={uiText.switchLanguageTitle}
          aria-label={uiText.switchLanguageTitle}
        >
          {uiText.switchLanguage}
        </button>
      </div>
      <motion.div className="panel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="title">{uiText.panelTitle}</div>

        <div className="layout">
          <div className="content-area">
            <div className="profile-experience-grid">
              <section className="card profile-card">
                <Avatar avatarLabel={avatarLabel} labels={uiText.avatar} />
                <ProfileHeader name={name} title={title} />
                <ContactList location={location} email={email} linkedin={linkedin} github={github} />
                <About about={about} strengths={strengths} softSkills={softSkills} labels={uiText.about} />
                <Skills skills={skills} labels={uiText.skills} />
                <Studies studies={studies} certificates={certificates} labels={uiText.studies} />
              </section>

              <Experience experience={experience} skills={skills} labels={uiText.experience} language={language} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
