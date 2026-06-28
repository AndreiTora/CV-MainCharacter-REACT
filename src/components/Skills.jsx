import { getTechChipClass } from '../utils/getTechChipClass';

export default function Skills({ skills = [] }) {
  return (
    <section className="profile-skills-section">
      <h2>Tecnologías</h2>
      <div className="skills-group-grid">
        {skills.map(({ category, items }) => (
          <article key={category} className="skills-group-card">
            <h3 className="skills-group-title">{category}:</h3>
            <div className="skills-group-chips">
              {items.map((name) => (
                <span key={name} className={`experience-tech-chip ${getTechChipClass(name)}`}>
                  {name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
