import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import profile from "./data/profile.json";

import Avatar from './components/Avatar';
import ProfileHeader from './components/ProfileHeader';
import ContactList from './components/ContactList';
import About from './components/About';
import Skills from './components/Skills';
import Studies from './components/Studies';
import Experience from './components/Experience';

export default function App() {
  const [isReadableFont, setIsReadableFont] = useState(false);
  const { name, title, location, email, linkedin, github, skills, studies, certificates, experience, avatarLabel, about, strengths, softSkills } = profile;

  useEffect(() => {
    const savedPreference = localStorage.getItem('readable-font-enabled') === 'true';
    setIsReadableFont(savedPreference);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('readable-font-enabled', isReadableFont);
    localStorage.setItem('readable-font-enabled', String(isReadableFont));
  }, [isReadableFont]);

  return (
    <div className="page">
      <button
        type="button"
        className={`font-toggle ${isReadableFont ? 'font-toggle-preview-original' : 'font-toggle-preview-readable'}`}
        onClick={() => setIsReadableFont((current) => !current)}
        aria-pressed={isReadableFont}
        title="Cambiar fuente para mejor legibilidad"
      >
        {isReadableFont ? 'Fuente original' : 'Fuente accesible'}
      </button>
      <motion.div className="panel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="title">Character Menu</div>

        <div className="layout">
          <div className="content-area">
            <div className="profile-experience-grid">
              <section className="card profile-card">
                <Avatar avatarLabel={avatarLabel} />
                <ProfileHeader name={name} title={title} />
                <ContactList location={location} email={email} linkedin={linkedin} github={github} />
                <About about={about} strengths={strengths} softSkills={softSkills} />
                <Skills skills={skills} />
                <Studies studies={studies} certificates={certificates} />
              </section>

              <Experience experience={experience} skills={skills} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
