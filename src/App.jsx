import { motion } from "framer-motion";
import profile from "./data/profile.json";

export default function App() {
  const { name, title, location, email, linkedin, infojobs, skills, studies, certificates, experience, avatarLabel, about } = profile;
  const getTechChipClass = (name) => {
    const tech = name.toLowerCase();
    if (/java|spring|hibernate|struts|soap|microservicios|apIs rest|rest|liferay/.test(tech)) return 'tech-chip-backend';
    if (/react|typescript|javascript|jquery|bootstrap|jstl|sass|ajax/.test(tech)) return 'tech-chip-frontend';
    if (/oracle|microsoft sql server|mysql|postgresql|database/.test(tech)) return 'tech-chip-db';
    if (/maven|jenkins|gitlab|git/.test(tech)) return 'tech-chip-devops';
    if (/liferay|jboss|apache tomcat|oracle weblogic/.test(tech)) return 'tech-chip-platform';
    return 'tech-chip-default';
  };
  return (
    <div className="page">
      <motion.div className="panel"
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}>
        <div className="title">Character Menu</div>

        <div className="layout">
          <div className="content-area">
            <div className="profile-experience-grid">
              <section className="card profile-card">
                <motion.div animate={{y:[0,-4,0]}} transition={{repeat:Infinity,duration:2}}>
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
                <div className="profile-header">
                  <h1>{name}</h1>
                  <p className="profile-title">{title}</p>
                </div>
                <div className="profile-contact">
                  <div className="contact-item contact-location">📍 {location}</div>
                  <div className="contact-item contact-email">📧 <a href={`mailto:${email}`}>{email}</a></div>
                  <div className="contact-item contact-link">
                    <svg className="contact-icon" width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
                      <rect width="8" height="8" fill="#0A66C2"/>
                      <rect x="1" y="1" width="2" height="2" fill="#fff"/>
                      <rect x="1" y="4" width="2" height="3" fill="#fff"/>
                      <rect x="4" y="1" width="3" height="3" fill="#fff"/>
                    </svg>
                    <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  </div>
                  <div className="contact-item contact-infojobs">
                    <svg className="contact-icon" width="20" height="20" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
                      <rect width="8" height="8" fill="#f39c12"/>
                      <rect x="1" y="2" width="6" height="3" fill="#fff"/>
                      <rect x="2" y="1" width="4" height="1" fill="#f39c12"/>
                    </svg>
                    <a href={infojobs} target="_blank" rel="noreferrer">InfoJobs</a>
                  </div>
                </div>
                <section className="about">
                  <h2>Sobre mí</h2>
                  <p>{about}</p>
                </section>
                <section className="profile-skills-section">
                  <h2>Habilidades</h2>
                  <div className="experience-tech-grid">
                    {skills.map(({name}) => (
                      <span key={name} className={`experience-tech-chip ${getTechChipClass(name)}`}>{name}</span>
                    ))}
                  </div>
                </section>
                <section className="profile-study-section">
                  <h2>Estudios y certificados</h2>
                  {studies.map(({degree,institution}) => (
                    <div key={degree} className="study-item">
                      <strong>{degree}</strong>
                      <p>{institution}</p>
                    </div>
                  ))}
                  <div className="certificates-section">
                    <h3>Certificados / Cursos</h3>
                    <ul className="certificates-list">
                      {certificates.map(({name}) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              </section>

              <section className="card experience-card">
                <h2>Experiencia laboral</h2>
            {experience.map(({title, company, duration, period, summary, responsibilities, leadership, projects, technologies}) => (
              <div key={`${title}-${company}-${period}`} className="experience-item">
                <div className="experience-header">
                  <strong className="experience-title">{title}</strong>
                  <span className="experience-company">{company}</span>
                </div>
                <p className="experience-meta">{duration} · {period}</p>
                <p>{summary}</p>
                {projects && (
                  <div className="experience-subsection">
                    <strong>Proyectos destacados:</strong>
                    <ul>
                      {projects.map(project => <li key={project}>{project}</li>)}
                    </ul>
                  </div>
                )}
                {responsibilities && (
                  <div className="experience-subsection">
                    <strong>Responsabilidades clave:</strong>
                    <ul>
                      {responsibilities.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {leadership && (
                  <div className="experience-subsection">
                    <strong>Liderazgo y gestión:</strong>
                    <ul>
                      {leadership.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {technologies && (
                  <div className="experience-tech-section">
                    <div className="experience-tech-grid">
                      {technologies.split('·').map(item => item.trim()).filter(Boolean).map(name => (
                        <span key={name} className={`experience-tech-chip ${getTechChipClass(name)}`}>{name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
