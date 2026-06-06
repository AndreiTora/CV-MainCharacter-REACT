import { getTechChipClass } from '../utils/getTechChipClass';

export default function Skills({ skills }) {
  return (
    <section className="profile-skills-section">
      <h2>Habilidades</h2>
      <div className="experience-tech-grid">
        {skills.map(({ name }) => (
          <span key={name} className={`experience-tech-chip ${getTechChipClass(name)}`}>{name}</span>
        ))}
      </div>
    </section>
  );
}
