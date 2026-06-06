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
  const { name, title, location, email, linkedin, infojobs, skills, studies, certificates, experience, avatarLabel, about } = profile;

  return (
    <div className="page">
      <motion.div className="panel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="title">Character Menu</div>

        <div className="layout">
          <div className="content-area">
            <div className="profile-experience-grid">
              <section className="card profile-card">
                <Avatar avatarLabel={avatarLabel} />
                <ProfileHeader name={name} title={title} />
                <ContactList location={location} email={email} linkedin={linkedin} infojobs={infojobs} />
                <About about={about} />
                <Skills skills={skills} />
                <Studies studies={studies} certificates={certificates} />
              </section>

              <Experience experience={experience} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
