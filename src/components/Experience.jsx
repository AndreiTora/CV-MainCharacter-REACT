import { getTechChipClass } from '../utils/getTechChipClass';
import { getDurationFromPeriod } from '../utils/getDurationFromPeriod';

export default function Experience({ experience = [] }) {
  return (
    <section className="card experience-card">
      <h2>Experiencia laboral</h2>
      {experience.map(({ title, company, period, summary, responsibilities, leadership, projects, technologies }) => {
        const duration = getDurationFromPeriod(period);

        return (
        <div key={`${title}-${company}-${period}`} className="experience-item">
          <div className="experience-header">
            <strong className="experience-title">{title}</strong>
            <span className="experience-company"> · {company}</span>
          </div>
          <p className="experience-meta">{duration ? `${duration} · ` : ''}{period}</p>
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
      )})}
    </section>
  );
}
